
## Grandysoft-backend-task 
This project created with:
- [express](http://expressjs.com/)
- [mongoose](https://mongoosejs.com/)
- [dotenv](https://github.com/motdotla/dotenv#readme)
- [nodemon](https://nodemon.io/)
 ### 1. Create a .env file in the root of your project:
```javascript
.env
1. PORT=3000 //your localhost port, for example 3000
2. MONGODB_URL=mongodb+srv:... //path to your database on mongodb with your password
```
 ### 2. Install all dependencies with `npm` or `yarn`
 ### Commands:
- `npm start` &mdash; start the server in production mode
- `npm run start:dev` &mdash; start the server in development mode
#### At the first start of the server, 200 users are generated and collection "users" stored in your database.
##### Every time a check is launched, if there is a collection on the server, then they are not generated
#### Each user has a subscription to other users. Maximum of 150 subscriptions. It is chosen randomly.

 ### Routes:

- `GET` &mdash; `/users` get all of users in the table, sorted by number

- `GET` &mdash; `/users/123/friends` get users whose subscriptions match the subscription of the selected user. 

 Request parameters: `order_by=` - number of choice user, `order_type=` - field for sort (only `number` , `first_name` or `gender`). For exsample: `/users/123/friends?order_by=15&order_type=number`

- `GET` &mdash; `/max-following` get 5 users with the most subscriptions

- `GET` &mdash; `/not-following` get all users without subscriptions 

