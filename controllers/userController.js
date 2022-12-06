const { connection } = require("../connect");

const getUsersController = async (req, res, next) => {
  const getSQL = "SELECT * FROM test_db.members ORDER BY id";
  await connection.query(getSQL, (err, result) => {
    if (err) {
      console.log(err.message);
    } else {
      res.render("index", { title: "Users", records: result });
    }
  });
  
};

const getUserByNumber = async (req, res, next) => {
  const { order_by, order_type } = req.query;
  const getSQL = `SELECT * FROM test_db.members WHERE id=${order_by}`;
  await connection.query(getSQL, (err, result) => {
    if (err) {
      console.log(err.message);
    } else {
      const name = result[0].first_name;
      const userSubs = JSON.parse(result[0].subscription);
      const getFriend = `SELECT * FROM test_db.members WHERE id IN (${userSubs}) ORDER BY ${order_type}`;
      connection.query(getFriend, (err, result) => {
        if (err) {
          console.log(err.message);
        } else {
          const friends = result.filter((elem) =>
            JSON.parse(elem.subscription).includes(Number(order_by))
          );
          res.render("index", {
            title: `User ${name}(id:${order_by}) with subscriptions ${userSubs}`,
            records: friends,
          });
        }
      })
    }
  })
}

const getMaxFollowing = async (req, res, next) => {
  const getSQL = "SELECT * FROM test_db.members ORDER BY subcount DESC LIMIT 5";
  await connection.query(getSQL, (err, result) => {
    if (err) {
      console.log(err.message);
    } else {
      res.render("index", { title: "5 users with max-following", records: result });
    }
  });
};

const getNotFollowing = async (req, res, next) => {
  const getSQL = "SELECT * FROM test_db.members WHERE subcount = 0";
  await connection.query(getSQL, (err, result) => {
    if (err) {
      console.log(err.message);
    } else {
     res.render("index", {
       title: "Users with 0 subscriptions",
       records: result,
     });
    }
  });
  
};

module.exports = {
  getUsersController,
  getMaxFollowing,
  getNotFollowing,
  getUserByNumber,
}
