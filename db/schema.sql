DROP DATABASE IF EXISTS company_db;

CREATE DATABASE company_db;

use company_db;

CREATE TABLE department(
    id INT PRIMARY KEY AUTO_INCREMENT,
    department_name varchar(30)
);

CREATE TABLE role(
    id INT AUTO_INCREMENT PRIMARY KEY,
    title varchar(30),
    salary DECIMAL,
    department_id INT,
    foreign key (department_id)
    references department(id)
);

CREATE TABLE employee(
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name varchar(30),
    last_name varchar(30),
    role_id INT,
    manager_id INT,
    foreign key (role_id)
    references role(id),
    foreign key (manager_id)
    references employee(id)
);