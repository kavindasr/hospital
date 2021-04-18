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
    `test_type` varchar(50) NOT NULL,
    `examined_by` varchar(200) NOT NULL,
	`createdAt` date NULL,
	`updatedAt` date NULL,
     PRIMARY KEY (`nic`,`dept_id`,`req_date`),
     FOREIGN KEY (`nic`) REFERENCES `patient` (`nic`),
	 FOREIGN KEY (`dept_id`) REFERENCES `department` (`dept_id`)
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
     FOREIGN KEY (`nic`) REFERENCES `patient` (`nic`)
);

DROP TABLE IF EXISTS `history`;

CREATE TABLE `history` (
	`nic` varchar(12) NOT NULL,
    `dept_id` int NOT NULL,
    `visit_date` date NOT NULL,
    `report` varchar(100) NOT NULL,
    `examined_by` varchar(200) NOT NULL,
	`smry` text NOT NULL,
	`createdAt` date NULL,
	`updatedAt` date NULL,
     PRIMARY KEY (`nic`,`dept_id`,`visit_date`),
     FOREIGN KEY (`nic`) REFERENCES `patient` (`nic`),
	 FOREIGN KEY (`dept_id`) REFERENCES `department` (`dept_id`)
);

INSERT INTO `patient` VALUES ('199712309876','Mr','Rohan Perera','123/2,Kurunegala,Kurunegala','A.B.Nimal','123/4,Malkaduwawa','0775654543',24,'M','S','2021-04-17',NULL);
INSERT INTO `patient` VALUES ('198723709876','Mrs','Amaya Perera','123/2,Kurunegala,Kurunegala','A.K.Nirmali','123/4,Malkaduwawa','0773456785',45,'F','M','2021-04-17',NULL);
INSERT INTO `patient` VALUES ('199456108712','Mr','Gayan Bandara','123/2,Kurunegala,Kurunegala','S.K.Namal','123/4,Malkaduwawa','0764565765',27,'M','S','2021-04-17',null);

INSERT INTO `department` VALUES (1,'Blood Bank','2021-04-17',NULL);
INSERT INTO `department` VALUES (2,'Dept of ElectroCardio Graph','2021-04-17',NULL);
INSERT INTO `department` VALUES (3,'Dept of Micro Biology','2021-04-17',NULL);
INSERT INTO `department` VALUES (4,'Dept of Radiology','2021-04-17',NULL);

INSERT INTO `role` VALUES (1,'ETU User','2021-04-17',NULL);
INSERT INTO `role` VALUES (2,'Nurse','2021-04-17',NULL);
INSERT INTO `role` VALUES (3,'Blood Bank','2021-04-17',NULL);
INSERT INTO `role` VALUES (4,'ECG Dept','2021-04-17',NULL);
INSERT INTO `role` VALUES (5,'Micro Biology Dept','2021-04-17',NULL);
INSERT INTO `role` VALUES (6,'Radiology Dept','2021-04-17',NULL);

INSERT INTO `user` VALUES ('199912341234', 'Bob', '$2b$10$lxqLtnKGRLAKxeIk3P0fs.oKj6TDCVKlCkIUN0Kqb19Uv5tMJDjKy', '2', '2021-04-18', '2021-04-18');

INSERT INTO `history` VALUES ('199712309876','1','2021-01-02','http/nbnbnbcbcncn/nbnbn','199376509876 , 198765401287','aaaa aaaa aaa aaaa aaa aaa aa a a aaaaa','2021-04-17',NULL);
INSERT INTO `history` VALUES ('198723709876','2','2021-02-02','http/nbnbnbtrtrrcbcncn/nbnbn','199376509876 , 198765401287','aaaa gggg aaaa aaa aaaa aaa aaa aa a a aaaaa','2021-04-17',NULL);

INSERT INTO `checkup` VALUES ('199712309876','2021-01-02','36.7','70.12344',null,'120/80','54.54','180.89',null,null,'A.B.Kumari','2021-03-21',null);
