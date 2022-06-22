import Sequelize from 'sequelize';

module.exports = class Users extends Sequelize.Model{ //테이블에 대한 설정
    static init(sequelize){ //테이블 coloumn에 대한 설정
        return super.init({
            name: {  //이름
                type: Sequelize.STRING(5),
            },
            userID: {
                type: Sequelize.STRING(20),
            },
            userPW: {
                type: Sequelize.STRING(100),
            },
		}, { //테이블 자체에 대한 설정
            sequelize,
            timestamps: false,
            modelName: 'User', //모델 이름은 단수
            tableName: 'Users', //테이블 이름은 복수로
            paranoid: false,
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
        });
    }
    static associate(db){ //다른 모델과의 관계
        //db.writer.hasMany(db.writings,{foreignKey: "creator", sourceKey:"id"});
        //writer와 writings 릴레이션은 서로 1 대 다 관계 이므로 writer릴레이션에 hasmany를 wrtings릴레이션에 belongsTo를 사용함.
        //writings 릴레이션에 creator라는 외래키를 추가함.
    }
};
