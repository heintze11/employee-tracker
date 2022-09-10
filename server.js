// Install dependencies
    // Express
    // Inquirer 8.2.4
    // mysql2
    // Console.table
// Create Database
// Seed Database
// Use inquirer to select from query options
// Use console.table to show results...?

// dependencies
const express = require('express');
const mysql = require('mysql2');
const inquirer = require('inquirer');
const e = require('express');
// port
const PORT = process.env.PORT || 3001;
const app = express();
// express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// connect to database
const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: 'otisroot',
      database: 'business_db'
    },
    console.log(`Connected to the business_db database.`)
  );

const options = [{
    type: "list",
    message: "What would you like to do?",
    choices: ["View Departments", "View Roles", "View Employees", "Add Department", "Add Role", "Add Employee", "Update Employee Role", ],
    name: "option"
}];
// inquire to determine next steps
// connect options to queries



// create if statement to match selection
function choices (option){
    console.log(option);
    if(option === "View Departments"){
        postDepartments();
    } else if (option === "View Roles"){
        postRoles();
    } else if (option === "View Employees"){
        postEmployees();
    } else {
        return console.log("next steps")
    }
};

function postDepartments(){
    console.log("show departments");
};

function postRoles(){
    console.log("show roles");
};

function postEmployees(){
    console.log("show employees");
};



function start() {
    inquirer.prompt(options)
    .then(function (data) {
        console.log (data);
        choices(data.option);
    })
};

start();
