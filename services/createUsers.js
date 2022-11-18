const {
  uniqueNamesGenerator,
  names
} = require("unique-names-generator");
const { getGender } = require("gender-detection-from-name");
const { User } = require('../userModel');

const createCollection = async () => {
  const response = await User.find({});
  if (response[1]) {
    return;
  }
    for (let i = 1; i <= 200; i += 1) {
      const first_name = uniqueNamesGenerator({
        dictionaries: [names],
      });
      const gender = getGender(first_name, 'en');
      if (gender === 'unknown') {
        i -= 1;
      } else {
        const subscriptions = [];
        for (let s = 1; s <= Math.floor(Math.random() * 150); s += 1) {
          const number = Math.floor(Math.random() * 200) + 1;
          if (number !== i) {
            subscriptions.includes(number) ? subscriptions : subscriptions.push(number);
          }
        }
        const user = new User({
          number: i,
          first_name,
          gender,
          subscriptions,
        });
        user.save();
      }
    }
  
};



module.exports = createCollection;
