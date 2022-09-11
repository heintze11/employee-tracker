INSERT INTO departments (name)
VALUES ("Accounting"),
       ("Software"),
       ("Operations"),
       ("Sales");

INSERT INTO role (title, salary, department_id)
VALUES ("Accountant", 80000, 1),
       ("CPA", 110000, 1),
       ("Associate Engineer", 120000, 2),
       ("Senior Engineer", 150000, 2),
       ("Technician", 80000, 3),
       ("Specialist", 90000, 3),
       ("Salesman", 80000, 4),
       ("Sales Lead", 100000, 4);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Boris", "Miller", 1, 4),
       ("Lisa", "MacDonald", 1, 4),
       ("Owen", "Cornish", 1, 4),
       ("Gavin", "Piper", 2, NULL),
       ("Brian", "Bower", 3, 8),
       ("Kimberly", "Davidson", 3, 8),
       ("Adrian", "Mills", 3, 8),
       ("Anna", "Springer", 4, NULL),
       ("Sebastian", "Robertson", 5, 12),
       ("Andrea", "Sanderson", 5, 12),
       ("Jonathan", "Turner", 5, 12),
       ("Anne", "Mills", 6, NULL),
       ("Jake", "Sanderson", 7, 16),
       ("Amanda", "Ellison", 7, 16),
       ("Alexander", "Forsyth", 7, 16),
       ("Benjamin", "North", 8, NULL);
