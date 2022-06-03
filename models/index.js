const  Sequelize  = require("sequelize");
const writer = require("./writer");  // models/students.js 파일을 가져옴.
const writings= require("./writings");

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

db.writer=writer;  // 2 
db.writings= writings;

writer.init(sequelize);  // 3
writings.init(sequelize);

writer.associate(db);  // 4
writings.associate(db);

module.exports = db;