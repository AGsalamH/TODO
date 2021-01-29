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
1. add the required enviroment variable inside this `.env` file
1. run `npm install`
1. run `node app`

---
##### TODO
- Make `catch(err) {...}` blocks catch specific errors only.
