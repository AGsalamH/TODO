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
- Token can be valid but the user may doesn't Exist. Therefore user appears to be loggedin and can do anything but he doesn't even Exist!!!
- TO FIX: i have to check whether this user exists or NOT in `isAuth` middleware