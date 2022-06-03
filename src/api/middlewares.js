const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {
  try {//위변조, 만료되지 않은경우 토큰값을 디코딩하여 저장?
    req.decoded = jwt.verify(req.headers.authorization, process.env.JWT_SECRET);
    return next();
  } catch (error) { //헤더 혹은 페이로드가 위변조 되었는지, 토큰의 유효기간이 초과되었는지 확인
    if (error.name === 'TokenExpiredError') { // 유효기간 초과
      return res.status(419).json({
        code: 419,
        message: '토큰이 만료되었습니다',
      });
    }
    return res.status(401).json({
      code: 401,
      message: '유효하지 않은 토큰입니다',
    });
  }
};