const router = require('express').Router();
const { Post, User, Comment } = require('../models');

// Route to render the homepage
router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: [
                [{ model: User, attributes: ['username'] }],
            ],
        });

        const posts = postData.map((post) => post.get({ plain: true }));

        console.log('Posts fetched:', posts); // Debug line
        console.log('Logged in:', req.session.logged_in); // Debug line

        res.render('homepage', {
            title: 'Home Page',  // Ensure the title is being passed here
            logged_in: req.session.logged_in,
            user: req.session.user_id ? await User.findByPk(req.session.user_id) : null
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// Route to render the login page
router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/');
        return;
    }
    res.render('login');
});

// Route to render the signup page
router.get('/signup', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/');
        return;
    }
    res.render('signup', {
        title: 'Signup',
    });
});

module.exports = router;
