const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const path = require('path');
const fs = require("fs");
const app = express();
const PORT = 3000;

// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public')); // Serve static files from 'public' directory
app.use(cookieParser());

// Path to the user database file
const USERS_DB = path.join(__dirname, 'data', 'users.json');

// Ensure the database file exists
if (!fs.existsSync(USERS_DB)) {
    fs.writeFileSync(USERS_DB, JSON.stringify([]));
}

// Helper to read users from the file
function readUsers() {
    const data = fs.readFileSync(USERS_DB, "utf-8");
    return JSON.parse(data);
}

// Helper to write users to the file
function writeUsers(users) {
    fs.writeFileSync(USERS_DB, JSON.stringify(users, null, 2));
}

app.use((req, res, next) => {
  res.locals.loginUser = req.cookies.loggedInUser || null;
  res.locals.userInfo = req.cookies.infoUser || null;
  next();
});

//Sets a basic route index.hbs when website initially starts and when home is clicked from the nav bar or whenever a process needs to go back to home 
app.get('/', (req, res) => {
    const users = readUsers();
    res.render('index.hbs', users);
})
app.post('/', (req, res) => {
    const users = readUsers();
    res.render('index.hbs', users);
})


app.get('/calcu', (req, res) => {
    const todolist = readUsers();
    console.log('Users loaded:', todolist);
    res.render('headerPages/calcu.hbs');
})

app.get('/learn', (req, res) => {
    res.render('headerPages/learn.hbs');
})

app.get('/examples', (req, res) => {
    res.render('headerPages/examples.hbs');
})

app.get('/signUp', (req, res) => {
    res.render('headerPages/signUp.hbs');
})

app.get('/logIn', (req, res) => {
    res.render('headerPages/logIn.hbs');
})

app.post("/login", (req, res) => {
    const { email, password } = req.body;
    const users = readUsers();
    // const user = users.find((u) => u.username === username && u.password === password);
    let mess = "Login Successful"
    if (users[email] && users[email].password == password) {
        let loginUser = `${users[email].profile}`  
        let userInfo = email;
        // save the cookie containing name (username) information
         // 1-hour expiry
        res.cookie("infoUser", userInfo, { maxAge: 3600000 });
        res.cookie("loggedInUser", loginUser, { maxAge: 3600000 });
        res.redirect("/successLogin")
    } else {
        mess = "Invalid username or password.";
        res.render('headerPages/logIn.hbs', {mess})
    }
});

// Middleware to check authentication
function isAuthenticated(req, res, next) {
    const username = req.cookies.loggedInUser;
    if (username) {
        next(); // User is authenticated, proceed to the next middleware/route
    } else {
        res.redirect('/'); // Redirect to login page if not authenticated
    }
}

app.get('/successLogin', isAuthenticated, (req, res) => {
    res.render("index.hbs");
});

app.post("/signup", (req, res) => {
    const { email, password, username } = req.body;
    const users = readUsers();
    console.log(users)
   // const user = users.find((u) => u.username === username && u.password === password);
   let profile = username.substring(0,2);
  
  try {
    let newUser = { password, username,
                  profile };
    users[email] = newUser;
    
    console.log('Saving updated user data...');
    writeUsers(users);
    console.log('user data saved successfully');
    
    res.redirect("/logIn")
  } catch (error) {
    console.error('Error reading users file:', error);
    res.status(500).send('Error loading user data');
  }  
  
  
    res.render("headerPages/signUp.hbs")
});

app.get('/logOut', (req, res) => {
    res.clearCookie("loggedInUser");
    res.clearCookie("infoUser");
    //res.locals.loginUser = req.cookies.loggedInUser
    //res.locals.userInfo = req.cookies.infoUser || null;
    res.redirect('/');
})

app.get('/draft', (req, res) => {
    res.render('headerPages/draft.hbs');
})

app.get('/game', (req, res) => {
    res.render('headerPages/game.hbs');
})

app.post('/game', (req, res) => {
    const users = readUsers();
    let finalScore = req.cookies.finalScore;
    let qNum = req.cookies.qNum;
    console.log("score: " + finalScore);
    console.log("qNUm: "+qNum);

      if(qNum == 15){
        let email = req.cookies.infoUser;
        try {
          if(!users[email]["scores"]){
            users[email]["scores"] = []
          }
          users[email]["scores"].push(finalScore);

          console.log('Saving updated user data...')
          writeUsers(users);
          console.log('user data saved successfully');
          console.log("final Score: "+finalScore);
        } 
        catch (error) {
          console.error('Error reading users file:', error);
          res.status(500).send('Error loading user data');
        }  
    }
    res.render('headerPages/game.hbs');
})

app.get('/scores', (req, res) => {
    const users = readUsers();    
    try {
      let email = req.cookies.infoUser;
      let username = users[email]["username"];
      let scores = users[email]["scores"];
      res.render('headerPages/scores.hbs', {scores, username});
    }
    catch (error) {
      console.error('Error reading users file:', error);
      res.status(500).send('Error loading user data');
    }
})

app.get('/deleteAccount', (req, res) => {
  res.clearCookie("loggedInUser");
  res.clearCookie("infoUser");
  
});

app.post('/deleteAccount', (req, res) => {
  let email = req.cookies.infoUser;
  const users = readUsers();
  
  try {    
    delete users[email];
    
    console.log('Saving updated user data...');
    writeUsers(users);
    console.log('user data saved successfully');
    res.clearCookie("loggedInUser");
    res.clearCookie("infoUser");
    res.redirect('/');
  } catch (error) {
    console.error('Error reading users file:', error);
    res.status(500).send('Error loading user data');
  }
});

app.get('/updateUsername', (req, res) => {
  let newUsername = req.body.newUsername;
  let email = req.cookies.infoUser;
  const users = readUsers();
  let newProfile = newUsername.substring(0,2);
  users[email]["username"] = newUsername;
  users[email]["profile"] = newProfile;
  res.clearCookie("loggedInUser");
  res.cookie("loggedInUser", newProfile, { maxAge: 3600000 });
});

app.post('/updateUsername', (req, res) => {
  let newUsername = req.body.newUsername;
  let email = req.cookies.infoUser;
  const users = readUsers();
  let newProfile = newUsername.substring(0,2);
  
  try {    
    users[email]["username"] = newUsername;
    users[email]["profile"] = newProfile;
    res.cookie("loggedInUser", newProfile, { maxAge: 3600000 });
    
    console.log('Saving updated user data...');
    writeUsers(users);
    console.log('user data saved successfully');
    
    res.redirect('/settings');
  } catch (error) {
    console.error('Error reading users file:', error);
    res.status(500).send('Error loading user data');
  }
});

app.get('/updateEmail', (req, res) => {
  let newEmail = req.body.newEmail;
  const users = readUsers();
  res.clearCookie("infoUser");
  res.cookie("infoUser", newEmail, { maxAge: 3600000 });
});

app.post('/updateEmail', (req, res) => {
  let newEmail = req.body.newEmail;
  let email = req.cookies.infoUser;
  
  try {    
    const users = readUsers();
    users[newEmail] = users[email];
    delete users[email];
;
    writeUsers(users);
    console.log(users[newEmail]);
    console.log(newEmail);
    
    res.cookie("infoUser", newEmail, { maxAge: 3600000 });
    res.redirect('/settings');
  } catch (error) {
    console.error('Error reading users file:', error);
    res.status(500).send('Error loading user data');
  }
});

app.get('/updatePassword', (req, res) => {
  let newPassword = req.body.newPassword;
  let email = req.cookies.infoUser;
  const users = readUsers();
});

app.post('/updatePassword', (req, res) => {
  let oldPassword = req.body.oldPassword;
  let newPassword = req.body.newPassword;
  let email = req.cookies.infoUser;
  const users = readUsers();
  
  try {  
    if (users[email] && users[email].password == oldPassword) {
      users[email]["password"] = newPassword;
      console.log('Saving updated user data...');
      writeUsers(users);
      console.log('user data saved successfully');

      res.redirect('/settings');
    } else {
        let mess = "Old password is incorrect";
        res.redirect(`/settings?mess=${encodeURIComponent(mess)}`);
    }
  } catch (error) {
    console.error('Error reading users file:', error);
    res.status(500).send('Error loading user data');
  }
});

app.get('/settings', (req, res) => {
    const users = readUsers();
    const {mess} = req.query;
    let email = req.cookies.infoUser;
    let username = users[email]["username"];
    let password = users[email]["password"];
    password = password.replace(/./g, "*");
    res.render('headerPages/settings.hbs', {email, username, 
                                            password, mess});
})

app.post('/settings', (req, res) => {
    const users = readUsers();
    let email = req.cookies.infoUser;
    let username = users[email]["username"];
    let password = users[email]["password"];
    password = password.replace(/./g, "*");
    res.render('headerPages/settings.hbs', {email, username, 
                                            password});
})


app.get('/arithmetic', (req, res) => {
    res.render('eduPages/arithmetic.hbs');
})

app.get('/easyAlgebra', (req, res) => {
    res.render('eduPages/easyAlgebra.hbs');
})

app.get('/hardAlgebra', (req, res) => {
    res.render('eduPages/hardAlgebra.hbs');
})

app.get('/about', (req, res) => {
    res.render('footerPages/about.hbs');
})

app.get('/sources', (req, res) => {
    res.render('footerPages/sources.hbs');
})


// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
