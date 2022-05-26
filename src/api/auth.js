import { Router } from "express";
import { writer } from "../../models";
import { isEmptyArr } from "./isEmptyArr";

const router = Router();

router.get('/', async(req, res) => {
    let read = await writer.findAll({
        attributes: ['writerId'],
        where: {
            writerID : req.body.writerID
        },
    });
    res.send(read);
});

//login 기능
router.get('/login', async(req, res) => {
  if (!req.body.writerID || !req.body.writerPW) {
    res.send('아이디 혹은 패스워드를 입력하지 않았습니다!');
  } else {
    let clientID = await writer.findAll({
        attributes: ['writerID','writerPW','name'], //select writerId, writerPW, name
        where: {
            writerID : req.body.writerID,   // where writerID = req.body.writerID
            writerPW : req.body.writerPW   // where writerPW = req.body.writerPW
        },
    });
    if (isEmptyArr(clientID)) {
      res.send('해당 아이디 혹은 패스워드가 존재하지 않습니다.');
    } else {
      res.send('로그인 성공!');
    }
    }
});

//회원 가입 기능
router.post('/register', async(req,res) => {
    const { name, writerID, writerPW } = req.body;
    if (!name || !writerID || !writerPW) {
        res.send('아이디, 패스워드, 혹은 이름을 입력하지 않았습니다.');
    } else {
        let read = await writer.findAll({
            attributes: ['writerId'],
            where: {
                writerID : req.body.writerID
            },
        });
        if(isEmptyArr(read))
        {
            await writer.create({
                name,
                writerID,
                writerPW,
            });
            res.send('회원 가입 성공!');
        } else {
            res.send('중복된 아이디 입니다.');
        }
    }
});

export default router;