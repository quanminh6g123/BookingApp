//const User = require('../models/USer');
const { multipleMongooseToObject } = require('../../util/mongoose');
const { mongooseToObject } = require('../../util/mongoose');

class UserController {
    /* //[Get] /news
    index(req, res, next) {
        Course.find({})
            .then((courses) => {
                res.render('home', {
                    courses: multipleMongooseToObject(courses),
                });
            })
            .catch((err) => {
                res.status(400).json({ error: 'Error' });
                console.log(err);
            });
    }

    //[Get] /search/...
    search(req, res) {
        
        let params = []
        params.name = req.query.name
    } */
}

module.exports = new UserController();
