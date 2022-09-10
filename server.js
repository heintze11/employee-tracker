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
const cTable = require('console.table');
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
    type: 'list',
    message: 'What would you like to do?',
    choices: ['View Departments', 'View Roles', 'View Employees', 'Add Department', 'Add Role', 'Add Employee', 'Update Employee Role', 'Finished'],
    name: 'option'
}];

const addDep = [{
    type: 'input',
    message: 'What is the department name?',
    name: 'name'
}]

const addRol = [{
    type: 'input',
    message: 'What is the role title?',
    name: 'title'
}, {
    type: 'number',
    message: 'What is the role salary?',
    name: 'salary'
}, {
    type: 'number',
    message: 'What is the department id?',
    name: 'departmentId'
}]

const addEmp = [{
    type: 'input',
    message: "What is the employee's first name?",
    name: 'firstName'
}, {
    type: 'input',
    message: "What is the employee's last name?",
    name: 'lastName'
}, {
    type: 'number',
    message: "What is the employee's role ID?",
    name: 'roleId'
}, {
    type: 'number',
    message: "What is the employee's manager's ID?",
    name: 'managerId'
}]

const updateRol = [{
    type: 'number',
    message: "What is the employee's ID number?",
    name: 'employeeId'
}, {
    type: 'number',
    message: "What is the new employee's role number?",
    name: 'roleId'
}]
// inquire to determine next steps
// connect options to queries
function start() {
    inquirer.prompt(options)
        .then(function (data) {
            console.log(data);
            choices(data.option);
        })
};


// create if statement to match selection
function choices(option) {
    console.log(option);
    if (option === 'View Departments') {
        postDepartments();
    } else if (option === 'View Roles') {
        postRoles();
    } else if (option === 'View Employees') {
        postEmployees();
    } else if (option === 'Add Department') {
        addDepartment();
    } else if (option === 'Add Role') {
        addRole();
    } else if (option === 'Add Employee') {
        addEmployee();
    } else if (option === 'Update Employee Role') {
        updateRole();
    } else {
        console.log ('Finished!')
        finished();
    }
};

function postDepartments() {
    const sql = 'SELECT * FROM departments;';
    db.query(sql, (err, results) => {
        if (err) throw err;
        console.table(results);
        start();
    })
};

function postRoles() {
    const sql = 'SELECT title, role.id, departments.name AS department_name, salary FROM role JOIN departments ON role.department_id = departments.id ORDER BY role.id;';
    db.query(sql, (err, results) => {
        if (err) throw err;
        console.table(results);
        start();
    })
};

function postEmployees() {
    const sql = 'SELECT employees.id, first_name, last_name, role.title AS role, departments.name AS department, salary, manager_id FROM employees JOIN role ON role_id = role.id JOIN departments ON department_id = departments.id ORDER BY employees.id;';
    db.query(sql, (err, results) => {
        if (err) throw err;
        console.table(results);
        start();
    })
};

function addDepartment() {
    console.log('add department');
    inquirer.prompt(addDep)
        .then(function (data) {
            console.log(data.name);
            const sql = "INSERT INTO departments (name) VALUES (" + data.name + ");";
            db.query(sql, (err, results) => {
                if (err) throw err;
                console.table(results);
                start();
        })
    
    
    })
};

function addRole() {
    console.log('add role');
};

function addEmployee() {
    console.log('add employee');
};

function updateRole() {
    console.log('update role');
};

// Need to fix - trying to exit sql when finished
function finished() {
    db.query('exit', (err, results) => {
        if (err) throw err;
    })
};

start();