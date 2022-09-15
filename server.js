// dependencies
const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');
// port
const PORT = process.env.PORT || 3001;

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
    // query all departments to make the list dynamic
    db.query('SELECT * FROM departments', function (err, results1) {
        if (err) throw err;
        inquirer.prompt([{
            type: 'input',
            message: 'What is the role title?',
            name: 'title'
        }, {
            type: 'number',
            message: 'What is the role salary?',
            name: 'salary'
        }, {
            type: 'list',
            message: 'What department is this role in?',
            name: 'department',
            choices: function () {
                const roleArray = [];
                for (let i = 0; i < results1.length; i++) {
                    roleArray.push(results1[i].name);
                }
                return roleArray;
            }
        }])
            .then(function (data) {
                db.query(`SELECT id FROM departments WHERE name = "${data.department}"`, (err, results2) => {
                    const sql = `INSERT INTO role (title, salary, department_id) VALUES ("${data.title}", ${data.salary}, ${results2[0].id});`;
                    db.query(sql, (err, results) => {
                        if (err) throw err;
                        console.log('------------');
                        console.log(`${data.title} role added to ${data.department} department`);
                        console.log('------------');
                        start();
                    })
                })
            })
    })
};
// add employee query function
function addEmployee() {
    console.log('Add a new employee');
    //get all roles from database
    db.query('SELECT * FROM role', function (err, results1) {
        if (err) throw err;

        inquirer.prompt([{
            type: 'input',
            message: "What is the employee's first name?",
            name: 'firstName'
        }, {
            type: 'input',
            message: "What is the employee's last name?",
            name: 'lastName'
        }, {
            type: 'list',
            message: "What is the employee's role?",
            name: 'title',
            choices: function () {
                const roleArray = [];
                for (let i = 0; i < results1.length; i++) {
                    roleArray.push(results1[i].title);
                }
                return roleArray;
            }
        }, {
            type: 'input',
            message: "What is the employee's manager's ID #?",
            name: 'managerId',
            default: 'NULL'
        }])
            .then(function (data) {
                const roleQuery = `SELECT id FROM role WHERE title = "${data.title}"`;
                db.query(roleQuery, (err, results) => {
                    if (err) throw err;
                    const sql = `INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ("${data.firstName}", "${data.lastName}", ${results[0].id}, ${data.managerId});`;
                    db.query(sql, (err, results) => {
                        if (err) throw err;
                        console.log('------------');
                        console.log(`${data.firstName} ${data.lastName} added to the books`);
                        console.log('------------');
                        start();
                    })
                })
            })
    })
};
// update employee role function
function updateRole() {
    console.log('Update an employee role');
    // query to make the employee list dynamic
    db.query('SELECT CONCAT (first_name, " ",last_name) AS name, role.title AS role, role.id AS role_id FROM employees JOIN role on role_id = role.id;', function (err, results2) {
        if (err) throw err;
        inquirer.prompt([{
            type: 'list',
            message: "What emplpoyee do you want to change the role for?",
            name: 'employee',
            choices: function () {
                const empArry = [];
                for (let i = 0; i < results2.length; i++) {
                    empArry.push(results2[i].name);
                }
                return empArry;
            }
        }, {
            type: 'number',
            message: "What is the new employee's role ID #?",
            name: 'roleId'
        }])
            .then(function (data) {
                let splitString = (data.employee);
                const splitArray = splitString.split(" ");
                const employeeQuery = `SELECT id FROM employees WHERE first_name = '${splitArray[0]}' AND last_name = '${splitArray[1]}';`;
                db.query(employeeQuery, (err, results3) => {
                    if (err) throw err;

                    const sql = `UPDATE employees SET role_id = ${data.roleId} WHERE id = ${results3[0].id};`;
                    db.query(sql, (err, results) => {
                        if (err) throw err;
                        console.log('------------');
                        console.log(`Employee ${data.employee} role changed to ${data.roleId}`);
                        console.log('------------');
                        start();
                    })
                })
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