const Message = require("../models/Message");

async function createMessage(req, res, next) {
  try {
    const { sender, content, status } = req.body;

    if (
      typeof sender !== "string" ||
      typeof content !== "string" ||
      !sender.trim() ||
      !content.trim()
    ) {
      const error = new Error("sender and content are required");
      error.statusCode = 400;
      throw error;
    }

    const message = await Message.create({
      sender,
      content,
      status
    });

    res.status(201).json({
      data: message
    });
  } catch (error) {
    next(error);
  }
}

async function getMessages(req, res, next) {
  try {
    const page = Math.max(Number.parseInt(req.query.page, 10) || 1, 1);
    const limit = Math.min(
      Math.max(Number.parseInt(req.query.limit, 10) || 20, 1),
      100
    );
    const skip = (page - 1) * limit;

    const [messages, total] = await Promise.all([
      Message.find()
        .sort({ timestamp: -1, _id: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Message.countDocuments()
    ]);

    res.json({
      data: messages.reverse(),
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  createMessage,
  getMessages
};
