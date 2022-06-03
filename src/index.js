import express from "express";
import db, { sequelize } from "../models";
import writer from "../models/writer";
import writings from "../models/writings";
import api from "./api"; //라우터 분리

const app = express();
const port = 3000;

db. writer = writer;
db. writings = writings;

writer.init(sequelize);
writer.associate(db);

writings.init(sequelize);
writings.associate(db);

sequelize
  .sync({ force: false }) //force: true->서버 실행시 테이블 재생성, force: false -> 서버 실행시 테이블 재생성 안함
  .then(() => {
    console.log("데이터베이스 연결 성공");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(express.json());
app.use("/",api);

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
