/// imports
const express = require("express");
// const sessions = require('express-session');
const fs = require('fs');

/// app and ports 
const app = express();
const APP_PORT = process.env.APP_PORT || 3000;

/// their middleware 
app.use(express.static('static'));
app.set('view engine', 'ejs');
// app.use(sessions({
//     secret: process.env.SESSIONS_SECRET,
//     saveUninitialized: false,
//     resave: false
//     })
// );
app.use(express.urlencoded({extended: true})); 

/// my middleware
// app.use((req, res, next) => {
//     res.locals.query = req.query;
//     res.locals.user_id = req.session.user_id;
//     res.locals.member = req.session.sess_valid;
//     next();
// }); /// exposes session to ejs templates

/// data
let employeeData = [
    {first_name: "Seamus", last_name: "McBride",salary: 30000, role : "Ejit", address: "here", employee_number: 42069},
    {first_name: "Sam", last_name: "Millar",salary: 40000, role : "Tech Lead", address: "here", employee_number: 420670},
    {first_name: "Paula", last_name: "Sankiewicz",salary: 50000, role : "UX Lead", address: "here", employee_number: 42071},
    {first_name: "Bethani", last_name: "Gourlay",salary: 60000, role : "UI Lead", address: "here", employee_number: 42072},
    {first_name: "Dylan", last_name: "Robinson",salary: 70000, role : "Database Manager", address: "here", employee_number: 42073},
];

/// routes

app.get('/', (req, res)=> { 

    res.render('home', {
        title: 'Employees', 
        employeeData
    }); 

});

app.get('/viewemployee', (req, res)=> { 

    let index = req.index;

    res.render('home', {
        title: 'Employees', 
        employee: employeeData[index]
    }); 

});

// /// route handler
// const routeFiles = fs.readdirSync('./routes')
//     .filter(file => ( file.endsWith('.js') && !file.startsWith('_') ));
// for (const file of routeFiles) {
// 	const route = require(`./routes/${file}`);
//     routePath = file.slice(0,-3);
//     if (file=='home.js') routePath="";
// 	app.use(`/${routePath}`, route);
// }
// // console.log("Routes:", routeFiles);

/// server
const server = app.listen(APP_PORT, () => {
    console.log(`App started at http://localhost:${server.address().port}/`);
}); 