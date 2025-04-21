import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { verifyToken } from "../middleware/auth.js";
import xlsx from "xlsx"; // Import the xlsx library

const router = express.Router();

// Admin login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const admin = await User.findOne({ email, role: "admin" });
  if (!admin || !(await admin.comparePassword(password))) {
    return res.status(401).json({ msg: "Login failed" });
  }

  const token = jwt.sign({ id: admin._id, role: "admin" }, process.env.JWT_SECRET, { expiresIn: "1d" });
  res.json({ token });
});

// Add new user (admin only)
router.post("/add-user", verifyToken, async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    const user = new User({ name, email, password, role });
    await user.save();
    res.status(201).json({ msg: "User added" });
  } catch (err) {
    res.status(400).json({ msg: "User creation failed", error: err.message });
  }
});

// Get paginated users with search
router.get("/users", verifyToken, async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;
  const search = req.query.search || "";

  const query = {
    name: { $regex: search, $options: "i" }
  };

  const total = await User.countDocuments(query);
  const users = await User.find(query)
    .skip((page - 1) * limit)
    .limit(limit)
    .select("name email role");

  res.json({
    users,
    totalPages: Math.ceil(total / limit),
    currentPage: page,
  });
});

// Export Users to Excel
router.get("/export-users", verifyToken, async (req, res) => {
  try {
    // Fetch all users (or apply any filter here if needed)
    const users = await User.find().select("name email role");

    // Prepare data for Excel file
    const userData = users.map((user) => ({
      Name: user.name,
      Email: user.email,
      Role: user.role,
    }));

    // Create a new workbook and add data to it
    const wb = xlsx.utils.book_new();
    const ws = xlsx.utils.json_to_sheet(userData);
    xlsx.utils.book_append_sheet(wb, ws, "Users");

    // Write the Excel file to a buffer
    const excelBuffer = xlsx.write(wb, { bookType: "xlsx", type: "buffer" });

    // Set the response header for Excel file download
    res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
    res.setHeader("Content-Disposition", "attachment; filename=users.xlsx");

    // Send the file buffer as a response
    res.send(excelBuffer);

  } catch (err) {
    res.status(400).json({ msg: "Error exporting users", error: err.message });
  }
});

export default router;
