## TODO app
---

#### Dependencies
- Express => Handling requests and responses
- mongoose => mongodb ODM
- bcryptjs => Hash passwords
- jsonwebtoken => Authorization
- morgan => Logger
- dotenv => read and load enviroment variables from `.env` file into `process.env` object
- express-validator => data validation

---
#### To run
1. rename `.env_sample` to `.env` 
1. add the required enviroment variables inside this `.env` file
1. run `npm install`
1. run `node app`

---
#### Todo
- Email Verification
- reset passwords

#### Bug
1. Token can be valid but the user may doesn't Exist. Therefore user appears to be loggedin and can do anything but he doesn't even Exist!!!
    - TO fix: i have to check whether this user exists or NOT in `isAuth` middleware
1. When email is changed the token still the same with the old email. Cuz i use email in token payload
    - To fix: In login: Just use `user._id` as payload only.