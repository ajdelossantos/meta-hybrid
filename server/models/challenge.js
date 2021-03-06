'use strict';
module.exports = (sequelize, DataTypes) => {
    const Challenge = sequelize.define('Challenge', {
        uuid: {
            type: DataTypes.UUID,
            primaryKey: true,
            allowNull: false,
            defaultValue: DataTypes.UUIDV4
        },
        challengeTitle: {
            type: DataTypes.STRING,
            allowNull: false
        },
        challengeDescription: {
            type: DataTypes.STRING
        },
        tokenTypeUuid: {
            type: DataTypes.UUID,
            allowNull: false
        },
        transactionUuid: {
            type: DataTypes.UUID,
            allowNull: false
        },
        rewardAmount: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {});

    Challenge.associate = function(models) {
        Challenge.hasMany(models.Task, {
            foreignKey: 'challengeId',
            as: 'tasks'
        });
        Challenge.belongsTo(models.User, {
            foreignKey: 'sponsorId',
            onDelete: 'CASCADE'
        });
    };
    sequelize.sync();
    return Challenge;
};