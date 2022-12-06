const express = require("express");
const { connection } = require("./connect");
const { getUsersController, getMaxFollowing, getNotFollowing, getUserByNumber } = require("./controllers/userController");
const createCollection = require("./services/createUsers");
const path = require('path');
const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
const { PORT } = process.env;

app.get("/users", getUsersController);
app.get("/users/123/friends", getUserByNumber);
app.get("/max-following", getMaxFollowing);
app.get("/not-following", getNotFollowing);

const start = async () => {
    try {
        await connection.connect((err) => {
          if (err) {
            return console.log(err.message);
          } else {
            console.log("Database connected!");
          }
        });
        await connection.query(
          "CREATE TABLE IF NOT EXISTS test_db.members(number INT, subcount INT, first_name VARCHAR(100), gender ENUM('male','female'), subscription TEXT)",
          (err, result) => {
            if (err) {
              console.log(err.message);
            } else {
              console.log(result);
            }
          }
        );
        await createCollection();
        await app.listen(PORT, () => {
          console.log(`Server running. Use API on port: ${PORT}`);
        });
    } catch (err) {
        console.log(err.message);
        return process.exit(1);
    }
}
start();