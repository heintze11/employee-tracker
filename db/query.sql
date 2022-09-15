-- Query templates
-- department request
SELECT * FROM departments;

-- role request
SELECT title, role.id, departments.name AS department_name, salary 
FROM role JOIN departments ON role.department_id = departments.id ORDER BY role.id;

-- employee request
SELECT employees.id, first_name, last_name, role.title AS role, departments.name AS department, salary, manager_id 
FROM employees JOIN role ON role_id = role.id JOIN departments ON department_id = departments.id ORDER BY employees.id;

-- employee request - Manager name 
SELECT e.id, e.first_name, e.last_name, role.title AS role, departments.name AS department, salary, m.first_name AS manager
FROM employees e LEFT OUTER JOIN employees m ON e.manager_id = m.id JOIN role ON e.role_id = role.id JOIN departments ON department_id = departments.id ORDER BY id;

-- add department
INSERT INTO departments (name) VALUES (data.name);

-- add role
INSERT INTO role (title, salary, department_id) VALUES ("${data.title}", ${data.salary}, ${results2[0].id});

-- add role inquier query
SELECT id FROM departments WHERE name = "${data.department}"

-- add employee
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (data.firstName, data.lastName, data.roleId, data.managerId);

-- change employee role
UPDATE employees SET role_id = ${data.roleId} WHERE id = ${results3[0].id};

-- update role initial query
SELECT CONCAT (first_name, " ",last_name) AS name, role.title AS role, role.id AS role_id FROM employees JOIN role on role_id = role.id;

-- Update role employee query
SELECT id FROM employees WHERE first_name = '${splitArray[0]}' AND last_name = '${splitArray[1]}';


