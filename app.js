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
app.use(express.urlencoded({ extended: true }));

/// my middleware
app.use((req, res, next) => {
    res.locals.query = req.query;
    // res.locals.user_id = req.session.user_id;
    // res.locals.member = req.session.sess_valid;
    next();
}); /// exposes session to ejs templates


// roles data
let roles = [
    { role_id: 1, role: "Tech Lead" },

    { role_id: 2, role: "Senior Security Engineer" },

    { role_id: 3, role: "Software Engineer" },

    { role_id: 4, role: "UX Lead" },

    { role_id: 5, role: "Data Architect" },

    { role_id: 6, role: "UI Lead" },

    { role_id: 7, role: "Workday Consultant" }
]
/// initial data
let employeeData = [
    { first_name: "Seamus", last_name: "McBride", salary: 30000, role: "Ejit", address: "here", employee_number: 42069 },
    { first_name: "Sam", last_name: "Millar", salary: 40000, role: "Tech Lead", address: "here", employee_number: 420670 },
    { first_name: "Paula", last_name: "Santkiewicz", salary: 50000, role: "UX Lead", address: "here", employee_number: 42071 },
    { first_name: "Bethani", last_name: "Gourlay", salary: 60000, role: "UI Lead", address: "here", employee_number: 42072 },
    { first_name: "Dylan", last_name: "Robinson", salary: 70000, role: "Database Manager", address: "here", employee_number: 42073 },
];

/// routes

app.get('/', (req, res) => {

    res.render('home', {
        title: 'Employees',
        employeeData
    });

});

app.get('/employee', (req, res) => {

    try {

        let n = req.query.n;

        let employee = {};

        for (i = 0; i < employeeData.length; i++) {
            if (employeeData[i].employee_number == n) employee = employeeData[i];
        };

        res.render('employee', {
            title: `Employee ${n}`,
            employee
        });

    } catch {

        res.redirect('/');

    }

});

app.get('/add', (req, res) => {

    res.render('add', {
        title: 'Add employee',
        roles
    });

});

app.get('/edit', (req, res) => {

    let employeeNum = req.query.n;
    let employee = employeeData.filter((employee) => {
        return employee.employee_number.toString() === employeeNum;
    });

    res.render('edit', {
        title: 'Edit employees', employee, roles, employeeNum
    });
});

app.post('/edit', (req, res) => {
    let employeeNum = req.body.employeeNumber;
    console.log("in post route");


    let employee = employeeData.filter((employee) => {
        return employee.employee_number.toString() === employeeNum;
    });
    let index = employeeData.findIndex((emp) => {
        return emp.employee_number.toString() === employeeNum
    });

    if (index !== -1) {
        employeeData[index].salary = req.body.employeeSalary;
        employeeData[index].first_name = req.body.firstName;
        employeeData[index].last_name = req.body.lastName;
        employeeData[index].address = req.body.address;
        employeeData[index].role = req.body.jobTitle;

    }

    // res.render('edit', {
    //     title: 'Edit employees', roles, employee, employeeNum
    // });
    res.redirect('/');
});

app.post('/add', (req, res) => {


    let employee = {
        first_name: req.body.firstName,
        last_name: req.body.lastName,
        salary: req.body.employeeSalary,
        role: req.body.jobTitle,
        address: req.body.address,
        employee_number: req.body.employeeID
    };

    console.log(employee.role);
    employeeData.push(employee);

    res.redirect('/');

});

app.get('/login', (req, res) => {

    let title = "Login";
    res.render("login", { title });
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