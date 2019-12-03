const express = require("express");
const next = require("next");

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== "production";
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();

const session = require("express-session");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const User = require("./model").User;
const sequelize = require("./model").sequelize;
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const sessionStore = new SequelizeStore({
    db: sequelize
});

// automatically creates table in database. comment out after running once.
// sessionStore.sync()



passport.use(
    new LocalStrategy(
        {
            usernameField: "email",
            passwordField: "password"
        },
        async function(email, password, done) {
            if (!email || !password) {
                done("Email and password rquired", null);
                return;
            }

            const user = await User.findOne({ where: { email: email } });

            if (!user) {
                done("User not found", null);
                return;
            }

            const valid = await user.isPasswordValid(password);

            if (!valid) {
                done("Email and password do not match", null);
                return;
            }

            done(null, user);
        }
    )
);

passport.serializeUser((user, done) => {
    done(null, user.email);
});

passport.deserializeUser((email, done) => {
    User.findOne({ where: { email: email } }).then(user => {
        done(null, user);
    });
});

nextApp.prepare().then(() => {
    const server = express();

    server.use(
        session({
            secret: "343ji43j4n3jn4jk3n",
            resave: false,
            saveUninitialized: true,
            name: "nextbnb",
            cookie: {
                secure: false,
                maxAge: 30 * 24 * 60 * 60 * 1000
            },
            store: sessionStore
        }),
        passport.initialize(),
        passport.session()
    );

    server.post('/api/auth/register', async (req, res) => {
        const { email, password, passwordConfirmation } = req.body
    
        if (password !== passwordConfirmation) {
            res.end(
                JSON.stringify({ status: 'error', message: 'Passwords do not match' })
            )
            return
        }
    
        try {
            const user = await User.create({ email, password })
    
            req.login(user, err => {
                if (err) {
                    res.statusCode = 500
                    res.end(JSON.stringify({ status: 'error', message: err }))
                    return
                }
    
                return res.end(
                    JSON.stringify({ status: 'success', message: 'Logged in' })
                )
            })
        } catch (error) {
            res.statusCode = 500
            let message = 'An error occurred'
            if (error.name === 'SequelizeUniqueConstraintError') {
                message = 'User already exists'
            }
            res.end(JSON.stringify({ status: 'error', message }))
        }
    })

    server.all("*", (req, res) => {
        return handle(req, res);
    });

    server.listen(port, err => {
        if (err) throw err;
        console.log(`>>>>> Ready on http://localhost:${port} <<<<<`);
    });
});
