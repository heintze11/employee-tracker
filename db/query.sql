-- department request
SELECT * FROM departments;

-- role request
SELECT title, role.id AS role_id, departments.name AS department_name, salary 
FROM role JOIN departments ON role.department_id = departments.id;

-- employee request
SELECT employees.id, first_name, last_name, role.title AS role, departments.name AS department, salary, manager_id 
FROM employees JOIN role ON role_id = role.id JOIN departments ON department_id = departments.id;
