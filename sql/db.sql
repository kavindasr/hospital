DROP SCHEMA IF EXISTS `hospital_db`;
CREATE SCHEMA `hospital_db`;
USE hospital_db;

DROP TABLE IF EXISTS `patient`;

CREATE TABLE `patient` (
  `nic` varchar(12) NOT NULL,
  `title` varchar(4) NOT NULL check(title IN ('Mr','Mrs','Ms','Rev')),
  `name` varchar(100) NOT NULL,
  `adrs` varchar(100) NOT NULL,
  `gdn_name` varchar(100) NOT NULL,
  `gdn_adrs` varchar(100) DEFAULT NULL,
  `contact_no` char(10) NOT NULL,
  `age` int NOT NULL,
  `gender` varchar(1) NOT NULL CHECK (gender in ('M','F')),
  `marital_status` varchar(1) NOT NULL CHECK(marital_status in ('M','S')),
  `createdAt` date NULL,
  `updatedAt` date NULL,
  PRIMARY KEY (`nic`)
);

DROP TABLE IF EXISTS `department`;

CREATE TABLE `department` (
	`dept_id` int NOT NULL AUTO_INCREMENT,
    `dept_name` varchar(100) NOT NULL,
	`createdAt` date NULL,
	`updatedAt` date NULL,
    PRIMARY KEY (`dept_id`)
);

DROP TABLE IF EXISTS `role`;

CREATE TABLE `role` (
	`role_id` int NOT NULL AUTO_INCREMENT,
    `role_name` varchar(100) NOT NULL,
	`createdAt` date NULL,
	`updatedAt` date NULL,
    PRIMARY KEY (`role_id`)
);

DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
	`nic` varchar(12) NOT NULL,
    `user_name` varchar(50) NOT NULL,
    `pswrd` varchar(450) NOT NULL,
    `role_id` int NOT NULL,
	`createdAt` date NULL,
	`updatedAt` date NULL,
    PRIMARY KEY (`nic`),
    FOREIGN KEY (`role_id`) REFERENCES `role` (`role_id`)
);

DROP TABLE IF EXISTS `request`;

CREATE TABLE `request` (
	`nic` varchar(12) NOT NULL,
    `dept_id` int NOT NULL,
    `req_date` date NOT NULL,
    `req_by` varchar(12) NOT NULL,
    `test_type` varchar(100) NOT NULL,
    `test_status` varchar(10) NOT NULL CHECK (test_status in ('Pending','Completed','Rejected')),
	`exam_by` varchar(12) NULL,
    `formdata` json NULL,
    `attach` varchar(200) NULL,
	`createdAt` date NULL,
	`updatedAt` date NULL,
     PRIMARY KEY (`nic`,`dept_id`,`req_date`),
     FOREIGN KEY (`nic`) REFERENCES `patient` (`nic`),
	 FOREIGN KEY (`dept_id`) REFERENCES `department` (`dept_id`),
     FOREIGN KEY (`req_by`) REFERENCES `user` (`nic`),
     FOREIGN KEY (`exam_by`) REFERENCES `user` (`nic`)
);

DROP TABLE IF EXISTS `checkup`;

CREATE TABLE `checkup` (
	`nic` varchar(12) NOT NULL,
    `visit_date` date NOT NULL,
    `temp` decimal(6,3) NOT NULL,
    `pulse_rate` decimal(10,7) NOT NULL,
    `resp_rate` decimal(4,2) NULL,
	`bp` varchar(10) NOT NULL,
    `weight` decimal(6,3) NOT NULL,
    `height` decimal(6,3) NOT NULL,
    `bmi` decimal(3,1)  NULL,
    `urine` varchar(10) NULL,
    `nurse_nic` varchar(20) NOT NULL,
	`createdAt` date NULL,
	`updatedAt` date NULL,
     PRIMARY KEY (`nic`,`visit_date`),
     FOREIGN KEY (`nic`) REFERENCES `patient` (`nic`),
     FOREIGN KEY (`nurse_nic`) REFERENCES `user` (`nic`)
);


INSERT INTO `patient` VALUES ('199712309876','Mr','Rohan Perera','123/2,Kurunegala,Kurunegala','A.B.Nimal','123/4,Malkaduwawa','0775654543',24,'M','S','2021-04-17',NULL);
INSERT INTO `patient` VALUES ('198723709876','Mrs','Amaya Perera','123/2,Kurunegala,Kurunegala','A.K.Nirmali','123/4,Malkaduwawa','0773456785',45,'F','M','2021-04-17',NULL);
INSERT INTO `patient` VALUES ('199456108712','Mr','Gayan Bandara','123/2,Kurunegala,Kurunegala','S.K.Namal','123/4,Malkaduwawa','0764565765',27,'M','S','2021-04-17',null);

INSERT INTO `department` VALUES (1,'Blood Bank','2021-04-17',NULL);
INSERT INTO `department` VALUES (2,'Dept of ElectroCardio Graph','2021-04-17',NULL);
INSERT INTO `department` VALUES (3,'Dept of Micro Biology','2021-04-17',NULL);
INSERT INTO `department` VALUES (4,'Dept of Radiology','2021-04-17',NULL);
INSERT INTO `department` VALUES (5,'Dept of Chemical & Pathology','2021-04-17',NULL);

INSERT INTO `role` VALUES (1,'ETU Doctor','2021-04-17',NULL);
INSERT INTO `role` VALUES (2,'Nurse','2021-04-17',NULL);
INSERT INTO `role` VALUES (3,'Blood Bank','2021-04-17',NULL);
INSERT INTO `role` VALUES (4,'ECG Dept','2021-04-17',NULL);
INSERT INTO `role` VALUES (5,'Micro Biology Dept','2021-04-17',NULL);
INSERT INTO `role` VALUES (6,'Radiology Dept','2021-04-17',NULL);

INSERT INTO `user` VALUES ('199912341234', 'Bob', '$2b$10$lxqLtnKGRLAKxeIk3P0fs.oKj6TDCVKlCkIUN0Kqb19Uv5tMJDjKy', '2', '2021-04-18', '2021-04-18');
INSERT INTO `user` VALUES ('198088888888', 'Gayan', '$2b$10$lxqLtnKGRLAKxeIk3P0fs.oKj6TDCVKlCkIUN0Kqb19Uv5tMJDjKy', '1', '2021-04-18', '2021-04-18');
INSERT INTO `user` VALUES ('198012345678', 'Jayan', '$2b$10$lxqLtnKGRLAKxeIk3P0fs.oKj6TDCVKlCkIUN0Kqb19Uv5tMJDjKy', '3', '2021-04-18', '2021-04-18');
INSERT INTO `user` VALUES ('198812345678', 'Nimal', '$2b$10$lxqLtnKGRLAKxeIk3P0fs.oKj6TDCVKlCkIUN0Kqb19Uv5tMJDjKy', '4', '2021-04-18', '2021-04-18');

INSERT INTO `request` VALUES ('199712309876','1','2021-01-02','198088888888','Red Blood Cell Cnt','Pending',NULL,NULL,NULL,'2021-04-19',NULL);
INSERT INTO `request` VALUES ('198723709876','2','2021-02-02','198088888888','ECG','Completed','198812345678','{"key1": "value1", "key2": "value2"}','https://ghsghdsghdg','2021-04-19',NULL);

INSERT INTO `checkup` VALUES ('199712309876','2021-01-02','36.7','70.12344',null,'120/80','54.54','180.89',null,null,'199912341234','2021-03-21',null);
