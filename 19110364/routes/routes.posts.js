const express = require('express');
const posts = require('../controllers/controllers.postcontroller');
const router = express.Router();

router.use((req, res, next) => {
    console.log('Time: ', Date.now())
    next();
})

router.get('/post/:postID', posts.getPostById);

router.get('/', posts.getPosts);

router.get('/create', posts.getFormPost);

router.post('/create', posts.addPost);

module.exports = router;