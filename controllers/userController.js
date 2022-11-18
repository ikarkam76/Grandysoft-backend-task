const { User } = require('../userModel');

const getUsersController = async (req, res, next) => {
  const response = await User.find({});
  const sortedUsers = [...response].sort(
    (a, b) => a.number - b.number);
    res.render('index', {title: 'Users', records: sortedUsers});
};

const getUserByNumber = async (req, res, next) => {
  const { order_by, order_type } = req.query;
  const user = await User.find({ number: order_by });
  const users = await User.find({});
  const friends = [];
  for (const item of user[0].desc) {
    const friend = users.find((elem) => elem.number === item);
    if (friend.desc.includes(order_by)) {
      friends.push(friend);
    }
  }
  const sortedUsersByName = [...friends].sort((a, b) => a.first_name - b.first_name);
  const sortedUsersByNumber = [...friends].sort((a, b) => a.number - b.number);
  const sortedUsersByGender = [...friends].sort((a, b) => a.gender - b.gender);

  switch (order_type) {
    case "first_name":
      res.render("index", { title: "Friends sorted by first_name", records: sortedUsersByName });
      break;
    case "number":
      res.render("index", {
        title: "Friends sorted by number",
        records: sortedUsersByNumber,
      });
      break;
    case "gender":
      res.render("index", {
        title: "Friends sorted by gender",
        records: sortedUsersByGender,
      });
      break;
    default:
      res.render('index', {title: 'Not found this type', records: []});
  }
};

const getMaxFollowing = async (req, res, next) => {
    const response = await User.find({});
    const sortedUsers = [...response]
      .sort((a, b) => b.desc.length - a.desc.length)
      .slice(0, 5);
  res.render("index", { title: "Users", records: sortedUsers });
};

const getNotFollowing = async (req, res, next) => {
    const response = await User.find({});
    const sortedUsers = response.filter(user => user.desc.length === 0);
  res.render("index", { title: "Users", records: sortedUsers });
};


module.exports = { getUsersController, getMaxFollowing, getNotFollowing, getUserByNumber };