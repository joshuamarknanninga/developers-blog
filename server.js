const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

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

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
