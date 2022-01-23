INSERT INTO department (department_name)
VALUES 
("Firefighter"),
("EMS"),
("Hospital");

INSERT INTO role(title, salary, department_id)
VALUES
("Firefighter", 40000,1),
("Engineer", 50000, 1),
("Paramedic", 45000, 2),
("EMT", 40000, 2),
("Captain", 70000,1),
("Nurse", 70000, 3),
("Physician Assistant", 100000,3);

INSERT INTO employee(first_name,last_name, role_id,manager_id)
VALUES
("Chris", "Argon",1,NULL),
("Dan", "Garcia", 3, NULL),
("Matt", "Edge", 5, NULL),
("Andy", "Banks", 6, NULL),
("Brandon", "Horst", 7, 1),
("Brenda", "Frost", 6, 2),
("Jacob", "Williams", 4, 3),
("Chelsie", "Sims",6,3)