
-- Create a database
CREATE DATABASE EmployeeDetails;


USE EmployeeDetails;

CREATE TABLE tblPersonalDetails (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  age INT NOT NULL
);

INSERT INTO tblPersonalDetails (name, age) VALUES ('Bhavyanshu', 34);
INSERT INTO tblPersonalDetails (name, age) VALUES ('ABC', 34);
INSERT INTO tblPersonalDetails (name, age) VALUES ('Nagp', 37);
INSERT INTO tblPersonalDetails (name, age) VALUES ('XYX', 39);
INSERT INTO tblPersonalDetails (name, age) VALUES ('Summer', 39);

