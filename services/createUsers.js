const {
  uniqueNamesGenerator,
  names
} = require("unique-names-generator");
const { getGender } = require("gender-detection-from-name");
const { connection } = require("../connect");

const createCollection = async () => {
  const getSQL = "SELECT * FROM test_db.members";
  await connection.query(getSQL, (err, result) => {
    if (err) {
      console.log(err.message);
    } else {
      
      if (!result[0]) {
        for (let i = 1; i <= 200; i += 1) {
          const first_name = uniqueNamesGenerator({
            dictionaries: [names],
          });
          const gender = getGender(first_name, "en");
          if (gender === "unknown") {
            i -= 1;
          } else {
            const subscriptions = [];
            for (let s = 1; s <= Math.floor(Math.random() * 150); s += 1) {
              const number = Math.floor(Math.random() * 200) + 1;
              if (number !== i) {
                subscriptions.includes(number)
                  ? subscriptions
                  : subscriptions.push(number);
              }
            }
            const sql =
              "INSERT INTO test_db.members(id, subcount, first_name, gender, subscription) VALUES ?";
            const values = [
              [i, subscriptions.length, first_name, gender, JSON.stringify(subscriptions)],
            ];
            connection.query(sql, [values], (err, result) => {
              if (err) {
                console.log(err.message);
              }
            });
          }
        }
      }
    }
  });
    
  
};

module.exports = createCollection;