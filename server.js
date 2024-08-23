const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const path = require('path');
const sequelize = require('./config/connection');  // Import Sequelize connection
const User = require('./models/User');  // Import User model
const Post = require('./models/Post');  // Import Post model

const app = express();
const PORT = process.env.PORT || 3001;

// Set up Handlebars.js as the template engine
const hbs = exphbs.create({});
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Middleware to parse JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Set up sessions
app.use(session({
    secret: 'Super secret secret',
    resave: false,
    saveUninitialized: true,
}));

// Import routes and give the server access to them
const routes = require('./controllers');
app.use(routes);

// Sync models and start the server
const syncDatabase = async () => {
    try {
        // Sync the database, ensuring User is synced before Post
        await sequelize.sync({ force: false });
        console.log('Database synced successfully.');

        // Start the server
        app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
    } catch (err) {
        console.error('Error syncing database:', err);
    }
};

syncDatabase();