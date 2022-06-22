import { Router } from "express";
import { Users } from "../../models";
import { isEmptyArr } from "./isEmptyArr";
import jwt from "jsonwebtoken";
import { verifyToken } from "./middlewares";
import bcrypt from "bcrypt";

const router=Router();

router.get('/', async(req, res) => {
    let read = await Users.findAll({
        attributes: ['userID'],
        where: {
            userID : req.body.userID
        },
    });
    res.send(read);
});

//login 기능
router.post('/login', async(req, res) => {
    const { userID, PW } = req.body; //body로부터 id와 pw값을 받아옴.
    if (!userID || !PW) {
        res.send('아이디 혹은 패스워드를 입력하지 않았습니다!');
    } else {
        let clientID=await Users.findAll({ //해당 아이디와 일치하는 정보 검색
        attributes: ['userID','userPW'], //select writerId, writerPW
        where: {
            userID,   // where writerID = req.body.writerID
        },
    });
    if(clientID) { //정보가 존재한다면 pw 비교
        const validPass = await bcrypt.compareSync(PW, clientID[0].userPW) //pw값과 암호화된 값 비교
        if(validPass) { //일치한다면 로그인 성공
            const token = jwt.sign({  
                userID: clientID[0].userID, //아이디
                name: clientID[0].name, //해당 사용자의 이름. 데이터베이스에서 가져오기
              }, process.env.JWT_SECRET, { //.env파일에 있는 JWT_SECRET 변수를 불러옴.
                expiresIn: '1h', //1시간
                issuer: 'nodebird',
              }); 
              //access token 발급.
              return res.json({
                code: 200,
                message: '토큰이 발급되었습니다',
                token, //token: token
              });
        } else {
            res.json({
                code: 401,
                message: '로그인실패',
            })
        }
    } else { //해당 아이디에 대한 정보를 찾을 수없을 경우
        res.send("사용자를 찾을 수 없음.");
    }
}   
});

//회원 가입 기능
router.post('/register', async(req,res) => {
    const { name, userID, userPW } = req.body;
    if (!name || !userID || !userPW) {
        res.send('아이디, 패스워드, 혹은 이름을 입력하지 않았습니다.');
    } else {//중복되는 아이디가 존재 하는 지 찾고 변수 read에 저장. 있다면 값을 남기고, 없다면 빈 배열을 남김.
        let read = await Users.findAll({
            attributes: ['userID'],
            where: {
                userID,
            },
        });
        if(isEmptyArr(read)) //빈 배열 일경우
        {
            const hash= await bcrypt.hash(userPW,5);
            console.log(hash);
            await Users.create({
                name,
                userID,
                userPW : hash,
            });
            res.send('회원 가입 성공!');
        } else { //중복되는 아이디가 존재하는 경우.
            res.send('중복된 아이디 입니다.');
        }
    }
});

router.get('/test',verifyToken,(req,res) => {
    res.json(req.decoded);
});

export default router;