const express = require("express");
const router = express.Router();

router.get('/', (req, res)=> { 

    let employeedata = {};

    res.render('home', {
        title: 'Employees', 
        employeedata
    }); 

});

module.exports = router;