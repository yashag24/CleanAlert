const Staff = require('../models/Staff');

exports.getAllStaff = async (req, res) => {
  try {
    const staff = await Staff.find().sort({ createdAt: -1 });
    res.json(staff);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.createStaff = async (req, res) => {
  try {
    const { name, email, role, phone, assignedArea } = req.body;
    
    const staff = new Staff({
      name,
      email,
      role,
      phone,
      assignedArea
    });

    await staff.save();
    res.json(staff);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateStaff = async (req, res) => {
  try {
    const { name, email, role, phone, assignedArea } = req.body;
    
    const staff = await Staff.findByIdAndUpdate(
      req.params.id,
      { name, email, role, phone, assignedArea },
      { new: true, runValidators: true }
    );

    if (!staff) return res.status(404).json({ error: 'Staff not found' });
    res.json(staff);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteStaff = async (req, res) => {
  try {
    const staff = await Staff.findByIdAndDelete(req.params.id);
    if (!staff) return res.status(404).json({ error: 'Staff not found' });
    res.json({ message: 'Staff member removed' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};