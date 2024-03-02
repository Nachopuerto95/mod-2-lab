const createError = require('http-errors');
const Tweet = require('../models/tweet.model');
const User = require('../models/user.model');
const mongoose = require('mongoose');

module.exports.create = (req, res, next) => {
    res.render('tweets/create')
}

module.exports.doCreate = (req, res, next) => {
  const { tweetId } = req.params;
  Tweet.findById(tweetId)
    .then((tweet) => {
      if (!tweet) {
        next(createError(404, 'tweet not found'));
      } else {
        const tweet = req.body;
        tweet.user = req.user.id;
        tweet.id = tweetId;
        return Tweet.create(tweet)
          .then(() => res.redirect(`/tweets/${tweetId}`))
          .catch((error) => {
            if (error instanceof mongoose.Error.ValidationError) {
              res.status(400).render('issues/detail', { issue, errors: error.errors, message: req.body })
            } else {
              next(error);
            }
          });
      }
    }).catch(next);
    
}