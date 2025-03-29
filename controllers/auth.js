import jwt from "jsonwebtoken";
import otpGenerator from "otp-generator";
import Otp from "../models/otp.js";
import User from "../models/user.js";

export const sendOTP = async (req, res) => {
  const { phoneNumber } = req.body;

  // Edge case: Phone number not received
  if (!phoneNumber) {
    return res.status(400).json({ message: "Phone number is required" });
  }

  // Edge case: Validate phone number format (+972********)
  const phoneRegex = /^\+972\d{9}$/;
  if (!phoneRegex.test(phoneNumber)) {
    return res.status(400).json({ message: "Invalid phone number format" });
  }

  // Generate a random 6-digit code
  const otp = otpGenerator.generate(6, {
    digits: true,
    upperCaseAlphabets: false,
    lowerCaseAlphabets: false,
    specialChars: false,
  });

  try {
    // Edge case: Check if an OTP already exists for the phone number
    await Otp.deleteOne({ phoneNumber });

    // Save the new OTP record in the database
    Otp.create({ otp, phoneNumber });

    // TODO: Send OTP via 3rd party service

    // Return status 200
    return res.status(200).json({ message: "OTP sent successfully" });
  } catch (err) {
    // Edge case: Saving OTP failed
    return res
      .status(500)
      .json({ message: "Failed to send OTP", error: err.message });
  }
};

// Verify OTP entered by the user and return a JWT token
export const verifyOTP = async (req, res) => {
  const { phoneNumber, otp } = req.body;

  // Find the OTP document for the phone number
  const otpRecord = await Otp.findOne({ phoneNumber });

  if (!otpRecord) {
    return res
      .status(400)
      .json({ message: "No OTP found for this phone number" });
  }

  // Verify the given OTP matches the stored OTP
  if (otpRecord.otp !== otp) {
    return res.status(400).json({ message: "Invalid OTP" });
  }

  // Delete the OTP document
  await Otp.deleteOne({ phoneNumber });

  // Create new user
  const newUser = await User.create({ phoneNumber });

  // Generate JWT token
  const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET_KEY);

  return res.status(200).json({ message: "OTP verified successfully", token });
};
