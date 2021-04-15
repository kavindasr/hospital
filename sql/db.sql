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
  `reg_date` date NOT NULL,
  PRIMARY KEY (`nic`)
);

DROP TABLE IF EXISTS `department`;

CREATE TABLE `department` (
	`dept_id` int NOT NULL AUTO_INCREMENT,
    `dept_name` varchar(100) NOT NULL,
    PRIMARY KEY (`dept_id`)
);

DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
	`nic` varchar(12) NOT NULL,
    `user_name` varchar(50) NOT NULL,
    `pswrd` varchar(450) NOT NULL,
    `role` varchar(20) NOT NULL,
    PRIMARY KEY (`nic`)
);

DROP TABLE IF EXISTS `request`;

CREATE TABLE `request` (
	`nic` varchar(12) NOT NULL,
    `dept_id` int NOT NULL,
    `req_date` date NOT NULL,
    `test_type` varchar(50) NOT NULL,
     PRIMARY KEY (`nic`,`dept_id`,`req_date`),
     FOREIGN KEY (`nic`) REFERENCES `patient` (`nic`),
	 FOREIGN KEY (`dept_id`) REFERENCES `department` (`dept_id`)
);

DROP TABLE IF EXISTS `history`;

CREATE TABLE `history` (
	`nic` varchar(12) NOT NULL,
    `dept_id` int NOT NULL,
    `visit_date` date NOT NULL,
    `report` varchar(100) NOT NULL,
	`smry` text NOT NULL,
     PRIMARY KEY (`nic`,`dept_id`,`visit_date`),
     FOREIGN KEY (`nic`) REFERENCES `patient` (`nic`),
	 FOREIGN KEY (`dept_id`) REFERENCES `department` (`dept_id`)
);

INSERT INTO `patient` VALUES ('978765437V','Mr','Rohan Perera','123/2,Kurunegala,Kurunegala','A.B.Nimal','123/4,Malkaduwawa','0775654543',24,'M','S','2020-12-13');
INSERT INTO `patient` VALUES ('876543765V','Mrs','Amaya Perera','123/2,Kurunegala,Kurunegala','A.K.Nirmali','123/4,Malkaduwawa','0773456785',45,'F','M','2020-12-18');
INSERT INTO `patient` VALUES ('946587654V','Mr','Gayan Bandara','123/2,Kurunegala,Kurunegala','S.K.Namal','123/4,Malkaduwawa','0764565765',27,'M','S','2020-10-13');

INSERT INTO `department` VALUES (1,'Blood Bank');
INSERT INTO `department` VALUES (2,'Dept of ElectroCardio Graph');
INSERT INTO `department` VALUES (3,'Dept of Micro Biology');
INSERT INTO `department` VALUES (4,'Dept of Radiology');

INSERT INTO `history` VALUES ('978765437V','1','2021-01-02','http/nbnbnbcbcncn/nbnbn','aaaa aaaa aaa aaaa aaa aaa aa a a aaaaa');
INSERT INTO `history` VALUES ('876543765V','2','2021-02-02','http/nbnbnbtrtrrcbcncn/nbnbn','aaaa gggg aaaa aaa aaaa aaa aaa aa a a aaaaa');