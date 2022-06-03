import { Router } from "express";
import { writings } from "../../models";

const router = Router();

//글 목록 조회
router.get('/', async(req, res) => {
    res.send(await writings.findAll({ }));
});

//글 개별 항목 조회
router.get('/:postId', async(req,res) => {
    const { postId } = req.params;
    let read = await writings.findAll({
        attributes: ['name','title'],
        where: {id : postId},
    });
    res.send(read);
});

//글 생성
router.post('/', async(req,res) => {
    const { name, title, detail } = req.body;
    if(!name || !title || !detail) {
        res.send("작성자ID, 작성자 이름, 제목, 내용을 입력하셨는지 확인해주세요!");
    } else {
        await writings.create({
            name,
            title,
            detail,
        });
        res.send('해당 데이터 생성 완료!');
    }
});

//특정 글 수정
router.put('/:postId', async(req,res)=>{
    const { postId } = req.params;
    await writings.update({
        detail : req.body.text,
    }, {
        where: {id : postId},
    });
    res.send('해당 데이터 수정 완료!');
});

//특정 글 삭제
router.delete('/:postId', async(req,res) => {
    const postId = req.params;
    writings.destroy({
        where: {id : postId},
    });
    res.send('해당 데이터 삭제 완료!');
});

export default router;