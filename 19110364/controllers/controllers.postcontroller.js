const { mylist } = require('../models/models.posts');

function getPostById(req, res) {
    const ID = req.params.postID;
    var post;
    mylist.forEach(element => {
        if (element.id == ID) {
            post = element;
        }
    });
    if (post) {
        res.render('postDetail', {
            title: post.title,
            post: post,
        });
    } else {
        res.render('postDetail', {
            title: 'error',
            message: "Don't have the Post",
        });
    }
}

function getPosts(req, res) {
    if (mylist) {
        console.log('mygroup is exist');
        res.render('index', {
            title: 'Home',
            listPost: mylist
        });
    } else {
        console.log('mygroup is not exist');
        res.render('index', {
            title: 'error',
            message: "Don't have the Post",
        });
    }
}

function getFormPost(req, res) {
    res.render('addPost', {
        title: 'Create Post',
    });
}

function addPost(req, res) {
    const ID = makeid(8);

    var flag = false;
    const post = { id: ID, title: req.body.title, content: req.body.content };
    var title = req.body.title;

    if (title.trim() !== '') {
        console.log('ok');
        if(mylist) {
            mylist.forEach(element => {
                if (element.title == post.title) {
                    flag = true;
                }
            });
        }
        if (!flag) {
            mylist.push(post);
    
            res.render('addPost', {
                title: 'Create Post',
                message_success: 'Add post successfully',
            });
        } else {
            res.render('addPost', {
                title: 'Create Post',
                message_error: 'Duplicate title',
            });
        }
    } else {
        res.render('addPost', {
            title: 'Create Post',
            message_error: 'Title is empty',
        });
    }
}

function makeid(len) {
    var text = "";
    var char_list = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < len; i++) {
        text += char_list.charAt(Math.floor(Math.random() * char_list.length));
    }
    return text;
}

module.exports = {
    getFormPost,
    getPosts,
    addPost,
    getPostById,
}