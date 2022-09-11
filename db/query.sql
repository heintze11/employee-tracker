-- Query templates
-- department request
SELECT * FROM departments;

-- role request
SELECT title, role.id, departments.name AS department_name, salary 
FROM role JOIN departments ON role.department_id = departments.id ORDER BY role.id;

-- employee request
SELECT employees.id, first_name, last_name, role.title AS role, departments.name AS department, salary, manager_id 
FROM employees JOIN role ON role_id = role.id JOIN departments ON department_id = departments.id ORDER BY employees.id;

-- add department
INSERT INTO departments (name) VALUES (data.name);

-- add role
INSERT INTO role (title, salary, department_id) VALUES (data.title, data.salary, data.departmentId);

-- add employee
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (data.firstName, data.lastName, data.roleId, data.managerId);

-- change employee role
UPDATE employees SET role_id = data.roleId WHERE id = data.employeeId;