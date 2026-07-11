const User = require("../models/User");

const login = async (req, res, next) => {
  try {
    const { username } = req.body;
    if (!username) {
      return res.status(400).json({ error: "Username is required" });
    }

    let user = await User.findOne({ username });
    if (!user) {
      user = new User({ username, isOnline: true });
    } else {
      user.isOnline = true;
      user.lastSeen = new Date();
    }
    
    await user.save();
    
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

module.exports = { login };
