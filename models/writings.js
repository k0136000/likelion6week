const Sequelize = require('sequelize');

module.exports = class writings extends Sequelize.Model{ //테이블에 대한 설정
    static init(sequelize){ //테이블 coloumn에 대한 설정
        return super.init({
            name: { //작성자 이름
                type: Sequelize.STRING(5),
            },
            title: { //글 제목
                type: Sequelize.TEXT,
            },
            detail: { //글 내용
                type: Sequelize.TEXT,
            },
            creator: {
                type: Sequelize.STRING(15),
            }
		}, { //테이블 자체에 대한 설정
            sequelize,
            timestamps: false,
            modelName: 'writing', //모델 이름은 단수
            tableName: 'writings', //테이블 이름은 복수로
            paranoid: false,
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
        });
    }
    static associate(db){ //다른 모델과의 관계
        //db.writings.belongsTo(db.writer, { foreignKey: 'creator', targetKey: 'id' });
    }
};