DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;
USE employee_db;

CREATE TABLE department(
	id INTEGER AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30)
);

CREATE TABLE role(
	id INTEGER AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30),
    salary DECIMAL,
    department_id INTEGER
);

CREATE TABLE employee(
	id INTEGER AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INTEGER,
    manager_id INTEGER DEFAULT null
);

-- Add departments, roles, employees --
INSERT INTO department (name)
VALUES('Department 1');

INSERT INTO role (title, salary, department_id)
VALUES ('Manager',30.2, 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Eduardo','Coello',1,2);

-- View departments, roles, employees --
SELECT * FROM department;

SELECT * FROM role;

SELECT * FROM employee;

-- Update employee roles --
UPDATE employee
SET role_id = 3
WHERE first_name = 'Eduardo' && last_name = 'Coello';

-- Update employee managers --
UPDATE employee
SET manager_id = 1
WHERE first_name = 'Eduardo' && last_name = 'Coello';

-- View employees by manager --
SELECT first_name, last_name, manager_id
FROM employee
GROUP BY manager_id;