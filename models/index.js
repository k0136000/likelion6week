//const Sequelize = require("sequelize");
// const Writer = require("./Writer");  // models/students.js 파일을 가져옴.
// const Writings= require("./Writings");

import Sequelize from"sequelize";
import Users from "./Users";
import Posts from "./Posts";

const env = process.env.NODE_ENV || "development";
const config = require("../config/config")[env]; //mysql 개인 정보를 가져오는 코드? 인듯
const db = {};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

db.sequelize = sequelize;

db.Posts=Posts;  // 2 
db.Users=Users;

Posts.init(sequelize);  // 3
Users.init(sequelize);

Posts.associate(db);  // 4
Users.associate(db);

module.exports = db;