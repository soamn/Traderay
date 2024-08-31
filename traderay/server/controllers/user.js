const getUser = async (req, res, next) => {
  try {
    if (req.user) {
      return res
        .status(200)
        .json({ user: req.user.username, role: req.user.role });
    }
  } catch (error) {
    console.log(error);
  }
  next();
};

module.exports = getUser;
