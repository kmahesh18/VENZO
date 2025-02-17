const Admin = require("../models/adminModel");

const createAdmin = async (req, res) => {
  try {
    const newAdmin = req.body;
    
    // First check if this email belongs to existing admin
    const existingAdminUser = await Admin.findOne({ email: newAdmin.email });
    
    if (existingAdminUser) {
      // If this email is already registered as admin, allow login
      return res.status(200).send({ 
        message: "admin", 
        payload: existingAdminUser 
      });
    }

    // If this is a new email, check if any admin exists
    const adminExists = await Admin.findOne({ role: "admin" });
    if (adminExists) {
      return res.status(403).send({ 
        message: "An admin already exists in the system. Multiple admins are not allowed." 
      });
    }

    // If no admin exists, create new admin
    const newAdminObj = new Admin({
      ...newAdmin
    });

    // Save new admin
    const savedAdmin = await newAdminObj.save();
    
    // Send response
    res.status(201).send({ message: "admin", payload: savedAdmin });

  } catch (err) {
    res.status(500).send({ message: "Error in admin creation: " + err.message });
  }
};

module.exports = createAdmin;
