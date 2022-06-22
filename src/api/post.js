import { Router } from "express";
import { Posts } from "../../models";
import { verifyToken } from "./middlewares";
import cors from "cors";

const router = Router();

var corsOptions = {
    origin:'http://localhost:3000',
    credentials: true,
    optionsSuccessStatus:200
}

//글 목록 조회
router.get('/',cors(corsOptions), async(req, res) => {
    //해당 아이디인 글을 모두 검색해주는 기능 필요함.
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.send(await Posts.findAll({ }));
});

//글 개별 항목 조회
router.get('/', verifyToken, async(req,res) => {
    let read = await Posts.findAll({
        attributes: ['name','detail'],
        where: {
            title,
        },
    });
    res.send(read);
});

//글 생성
router.post('/', verifyToken, async(req,res) => {
    //토큰을 받아와서 토큰 속 아이디 값을 찾아야 함.
    const { title, detail } = req.body;
    const userID = req.decoded.userID;
    if(!userID || !title || !detail) {
        res.send("작성자ID, 작성자 이름, 제목, 내용을 입력하셨는지 확인해주세요!");
    } else {
        await Posts.create({
            userID,
            title,
            detail,
        });
        res.send('해당 데이터 생성 완료!');
    }
});

//특정 글 수정
router.put('/', verifyToken, async(req,res)=>{
    const { title, text } = req.body;
    await Posts.update({
        detail : text,
    }, {
        where: {
            title,
        },
    });
    res.send('해당 데이터 수정 완료!');
});

//특정 글 삭제
router.delete('/', verifyToken, async(req,res) => {
    const { title } = req.body;
    Posts.destroy({
        where: {
            title,
        },
    });
    res.send('해당 데이터 삭제 완료!');
});

export default router;