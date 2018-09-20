const Challenge = require('../models').Challenge;
const Task = require('../models').Task;

module.exports = {
    create(req, res) {
        return Challenge
            .create({
                challengeTitle: req.body.challengeTitle,
                totalRewardAmount: req.body.totalRewardAmount,
                totalRewardUnits: req.body.totalRewardUnits,
                challengeDescription: req.body.challengeDescription
            })
            .then(challenge => res.status(200).send(challenge))
            .catch(error => res.status(400).send(error));
    },
    list(req, res) {
        return Challenge
            .findAll({
                attributes: ['uuid']
            })
            .then(challenge => res.status(200).send(challenge))
            .catch(error => res.status(400).send(error));
    },
    retrieve(req, res) {
        return Challenge
            .findById(req.params.uuid, {
                attributes: ['uuid']
            })
            .then(challenge => {
                if (!challenge) {
                    return res.status(404).send({
                        message: 'Challenge Not Found',
                    });
                }
                return res.status(200).send(challenge);
            })
            .catch(error => res.status(400).send(error));
    },
    update(req, res) {
        return Challenge
            .findById(req.params.uuid, {
                attributes: ['uuid']
            })
            .then(challenge => {
                if (!challenge) {
                    return res.sendFile(__dirname + '/public/errorpage.html');
                }
                return challenge
                    .update({
                        challengeTitle: req.body.challengeTitle || challenge.challengeTitle,
                        totalRewardAmount: req.body.totalRewardAmount || challenge.totalRewardAmount,
                        totalRewardUnits: req.body.totalRewardUnits || challenge.totalRewardUnits,
                        challengeDescription: req.body.challengeDescription || challenge.challengeDescription
                    })
                    .then(challenge => {
                        res.sendFile(__dirname + '/public/index.html');
                    })
                    .catch((error) => res.sendFile(__dirname + '/public/errorpage.html'));
            })
            .catch((error) => res.sendFile(__dirname + '/public/errorpage.html'));
    }
};