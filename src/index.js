import express from "express";
import { sequelize } from "../models";
import dotenv from "dotenv";
import api from "./api"; //라우터 분리

const app = express();
const port = 4000; //dotenv내에 저장된 port 값을 불러옴 만약 없다면 그냥 3000으로 초기화

dotenv.config(); //.env에 저장되어 있는 내용을 node.js에서 접근할 수 있도록 
//console.log(process.env);

sequelize
  .sync({ force: false }) //force: true->서버 실행시 테이블 재생성, force: false -> 서버 실행시 테이블 재생성 안함
  .then(() => {
    console.log('데이터베이스 연결 성공 ');
  })
  .catch((err) => {
    console.log(err);
  });

app.use(express.json());
app.use("/",api);

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
