const express = require('express');
const views = require('../controllers/views.controller');
const users = require('../controllers/users.controller');
const tweets = require('../controllers/tweet.controller');

const router = express.Router();

router.get('/', views.home);

router.get('/signup', users.create);
router.post('/signup', users.doCreate);

router.get('/login', users.login);
router.post('/login', users.doLogin);

router.get('/profile', users.profile);

router.get('/create', tweets.create);
router.post('/create', tweets.doCreate)


module.exports = router;