INSERT INTO departments (name)
VALUES ("Accounting"),
       ("Software"),
       ("Operations"),
       ("Sales");

INSERT INTO role (title, salary, department_id)
VALUES ("Accountant", 80000, 1),
       ("Associate Engineer", 120000, 2),
       ("Sales Lead", 100000, 4),
       ("Salesman", 80000, 4),
       ("Senior Engineer", 150000, 2),
       ("Technician", 80000, 3),
       ("Specialist", 90000, 3),
       ("CPA", 110000, 1);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Boris", "Miller", 4, 3),
       ("Lisa", "MacDonald", 4, 3),
       ("Owen", "Cornish", 3, NULL),
       ("Gavin", "Piper", 3, 3),
       ("Brian", "Bower", 2, 6),
       ("Kimberly", "Davidson", 5, NULL),
       ("Adrian", "Mills", 2, 6),
       ("Anna", "Springer", 5, 6),
       ("Sebastian", "Robertson", 6, 11),
       ("Andrea", "Sanderson", 6, 11),
       ("Jonathan", "Turner", 7, NULL),
       ("Anne", "Mills", 7, 11),
       ("Jake", "Sanderson", 1, 14),
       ("Amanda", "Ellison", 8, NULL),
       ("Alexander", "Forsyth", 1, 14),
       ("Benjamin", "North", 8, 14);
