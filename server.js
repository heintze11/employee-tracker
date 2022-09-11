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
// default inquirer options
const options = [{
    type: 'list',
    message: 'What would you like to do?',
    choices: ['View Departments', 'View Roles', 'View Employees', 'Add Department', 'Add Role', 'Add Employee', 'Update Employee Role', 'Finished'],
    name: 'option'
}];
// add department questions
const addDep = [{
    type: 'input',
    message: 'What is the department name?',
    name: 'name'
}]
// add role questions
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
// add employee questions
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
    message: "What is the employee's role ID #?",
    name: 'roleId'
}, {
    type: 'input',
    message: "What is the employee's manager's ID #?",
    name: 'managerId',
    default: 'NULL'
}]
// update role questions
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
            choices(data.option);
        })
};


// create if statement to match selection
function choices(option) {
    //Add space before next function call
    console.log("");
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
        finished();
    }
};
// post departments query function
function postDepartments() {
    const sql = 'SELECT * FROM departments;';
    db.query(sql, (err, results) => {
        if (err) throw err;
        console.table(results);
        start();
    })
};
// post roles query function
function postRoles() {
    const sql = 'SELECT title, role.id, departments.name AS department_name, salary FROM role JOIN departments ON role.department_id = departments.id ORDER BY role.id;';
    db.query(sql, (err, results) => {
        if (err) throw err;
        console.table(results);
        start();
    })
};
// post employees query function
function postEmployees() {
    const sql = 'SELECT e.id, e.first_name, e.last_name, role.title AS role, departments.name AS department, salary, m.first_name AS manager FROM employees e LEFT OUTER JOIN employees m ON e.manager_id = m.id JOIN role ON e.role_id = role.id JOIN departments ON department_id = departments.id ORDER BY id;';
    db.query(sql, (err, results) => {
        if (err) throw err;
        console.table(results);
        start();
    })
};
// add department query function
function addDepartment() {
    console.log('Add a new department');
    inquirer.prompt(addDep)
        .then(function (data) {
            console.log(data.name);
            const sql = `INSERT INTO departments (name) VALUES ("${data.name}");`;
            db.query(sql, (err, results) => {
                if (err) throw err;
                console.log('------------');
                console.log(`${data.name} department added to table`);
                console.log('------------');
                start();
        })
    })
};
// add role query function
function addRole() {
    console.log('Add a new role');
    inquirer.prompt(addRol)
        .then(function (data) {
            console.log(data.title);
            const sql = `INSERT INTO role (title, salary, department_id) VALUES ("${data.title}", ${data.salary}, ${data.departmentId});`;
            db.query(sql, (err, results) => {
                if (err) throw err;
                console.log('------------');
                console.log(`${data.title} role added to ${data.departmentId} department`);
                console.log('------------');
                start();
        })
    })
};
// add employee query function
function addEmployee() {
    console.log('Add a new employee');
    inquirer.prompt(addEmp)
        .then(function (data) {
            console.log(data.firstName);
            const sql = `INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ("${data.firstName}", "${data.lastName}", ${data.roleId}, ${data.managerId});`;
            db.query(sql, (err, results) => {
                if (err) throw err;
                console.log('------------');
                console.log(`${data.firstName} ${data.lastName} added to the books`);
                console.log('------------');
                start();
        })
    })
};
// update employee role function
function updateRole() {
    console.log('Update an employee role');
    inquirer.prompt(updateRol)
        .then(function (data) {
            console.log(data.firstName);
            const sql = `UPDATE employees SET role_id = ${data.roleId} WHERE id = ${data.employeeId};`;
            db.query(sql, (err, results) => {
                if (err) throw err;
                console.log('------------');
                console.log(`Employee # ${data.employeeId} role changed to ${data.roleId}`);
                console.log('------------');
                start();
        })
    })
};

// simple finished function - doesn't call inquirer again
function finished() {
    console.log('------------');
    console.log('Finished! Control+C to exit');
    console.log('------------');
};

start();