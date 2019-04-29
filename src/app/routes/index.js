var express = require('express');
var router = express.Router();
app = express()

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

const service = require('../service')

var loggedInPass;
var user;
var password;
var err;
/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

router.get('/login', function(req, res, next) {
    user = ""
    pass = ""
    res.render('login', {
        user: user,
        pass: pass
    });
});

router.post('/login', function(req, res, next) {
    
    service.login(req.body.user, req.body.password).then ((result) => {
        if (result.loggedIn) {
            user = result.doctype
            res.redirect('result')
        } else {
            user = {}
            user.doctype = 'error'
            res.redirect('result')
        }
    })
});

router.get('/result', function(req, res, next) {
    res.render('result', {
        user: user
    });
});

module.exports = router;