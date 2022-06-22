import Sequelize from'sequelize';

module.exports = class Posts extends Sequelize.Model{ //테이블에 대한 설정
    static init(sequelize){ //테이블 coloumn에 대한 설정
        return super.init({
            title: { //글 제목
                type: Sequelize.STRING(30),
            },
            detail: { //글 내용
                type: Sequelize.TEXT,
            },
            userID: { //작성자 아이디
                type: Sequelize.STRING(15),
            }
		}, { //테이블 자체에 대한 설정
            sequelize,
            timestamps: false,
            modelName: 'Post', //모델 이름은 단수
            tableName: 'Posts', //테이블 이름은 복수로
            paranoid: false,
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
        });
    }
    static associate(db){ //다른 모델과의 관계
        //db.writings.belongsTo(db.writer, { foreignKey: 'creator', targetKey: 'id' });
    }
};