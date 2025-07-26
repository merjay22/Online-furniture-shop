import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const ADMIN_CREDENTIALS = {
  mobileNumber: "9773123472",
  password: "Jay@2222",
};

const hashedAdminPassword = bcrypt.hashSync(ADMIN_CREDENTIALS.password, 10);

export const loginUser = async (req, res) => {
  const { name, mobileNumber, password } = req.body;

  const mobileNumberPattern = /^\d{10}$/;
  if (!mobileNumberPattern.test(mobileNumber)) {
    return res.status(400).json({
      success: false,
      message: "Invalid mobile number. It must be 10 digits.",
    });
  }

  if (password.length < 6) {
    return res.status(400).json({
      success: false,
      message: "Password must be at least 6 characters.",
    });
  }

  try {
    if (
      mobileNumber === ADMIN_CREDENTIALS.mobileNumber &&
      password === ADMIN_CREDENTIALS.password
    ) {
      const token = jwt.sign({ id: "admin" }, process.env.JWT_SECRET, {
        expiresIn: "5h",
      });

      return res.json({
        success: true,
        message: "Admin login successful",
        token,
        user: {
          id: "admin",
          mobileNumber,
        },
      });
    }

    let user = await User.findOne({ mobileNumber });

    if (!user) {
      const hashedPassword = await bcrypt.hash(password, 10);
      user = new User({
        name,
        mobileNumber,
        password: hashedPassword,
      });

      await user.save();

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "5h",
      });

      return res.json({
        success: true,
        message: "User created and login successful",
        token,
        user: {
          id: user._id,
          mobileNumber: user.mobileNumber,
          name: user.name,
        },
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid Password",
      });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "5h",
    });

    res.json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user._id,
        mobileNumber: user.mobileNumber,
        name: user.name,
      },
    });
  } catch (error) {
    console.error("Server error during login:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.body.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ user });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
