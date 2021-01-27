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
1. npm install
1. node app

---
##### TODO:
- pre hooks for `find` query to add `{creator: req.user}` to all queries instead of hardcode it myself.
- some post hooks to overwrite mongoose error messages.
- format some error messages to hide internal info.
- add pre hook for `update` query to update the time everytime a todo is updated.