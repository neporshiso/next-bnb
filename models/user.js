const bcrypt = require("bcrypt");
const Sequelize = require("sequelize");

const sequelize = require("../database.js");

class User extends Sequelize.Model {}

User.init(
    {
        email: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false
        }
    },
    {
        sequelize,
        modelName: "user",
        timestamps: false,
        hooks: {
            beforeCreate: async user => {
                const saltRounds = 10;
                const salt = await bcrypt.genSalt(saltRounds);
                user.password = await bcrypt.hash(user.password, salt);
            }
        }
    }
);

User.prototype.isPasswordValid = async function(password) {
    return await bcrypt.compare(password, this.password);
};

module.exports = User;
