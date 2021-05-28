-- MySQL dump 10.13  Distrib 8.0.22, for Win64 (x86_64)
--
-- Host: localhost    Database: hospital
-- ------------------------------------------------------
-- Server version	8.0.22

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `checkup`
--

DROP TABLE IF EXISTS `checkup`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `checkup` (
  `id` int NOT NULL AUTO_INCREMENT,
  `visit_date` datetime NOT NULL,
  `temp` decimal(6,3) NOT NULL,
  `pulse_rate` decimal(10,7) NOT NULL,
  `resp_rate` decimal(4,2) DEFAULT NULL,
  `bp` varchar(10) NOT NULL,
  `weight` decimal(6,3) NOT NULL,
  `height` decimal(6,3) NOT NULL,
  `bmi` decimal(3,1) DEFAULT NULL,
  `urine` varchar(10) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `patientNic` varchar(12) DEFAULT NULL,
  `nurseId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `patientNic` (`patientNic`),
  KEY `nurseId` (`nurseId`),
  CONSTRAINT `checkup_ibfk_1` FOREIGN KEY (`patientNic`) REFERENCES `patient` (`nic`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `checkup_ibfk_2` FOREIGN KEY (`nurseId`) REFERENCES `nurse` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `checkup`
--

LOCK TABLES `checkup` WRITE;
/*!40000 ALTER TABLE `checkup` DISABLE KEYS */;
INSERT INTO `checkup` VALUES (1,'2021-01-02 00:00:00',36.700,70.1234400,NULL,'120/80',54.540,180.890,NULL,NULL,'2021-04-18 00:00:00','2021-04-18 00:00:00','198723709876',1);
/*!40000 ALTER TABLE `checkup` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `department`
--

DROP TABLE IF EXISTS `department`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `department` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `department`
--

LOCK TABLES `department` WRITE;
/*!40000 ALTER TABLE `department` DISABLE KEYS */;
INSERT INTO `department` VALUES (1,'Blood Bank','2021-04-17 00:00:00',NULL),(2,'Dept of ElectroCardio Graph','2021-04-17 00:00:00',NULL),(3,'Dept of Micro Biology','2021-04-17 00:00:00',NULL),(4,'Dept of Radiology','2021-04-17 00:00:00',NULL),(5,'Dept of Chemical & Pathology','2021-04-17 00:00:00',NULL);
/*!40000 ALTER TABLE `department` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `doctor`
--

DROP TABLE IF EXISTS `doctor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `doctor` (
  `id` int NOT NULL AUTO_INCREMENT,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `userNic` varchar(12) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `userNic` (`userNic`),
  CONSTRAINT `doctor_ibfk_1` FOREIGN KEY (`userNic`) REFERENCES `user` (`nic`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `doctor`
--

LOCK TABLES `doctor` WRITE;
/*!40000 ALTER TABLE `doctor` DISABLE KEYS */;
INSERT INTO `doctor` VALUES (1,'2021-04-18 00:00:00','2021-04-18 00:00:00','198088888888');
/*!40000 ALTER TABLE `doctor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dwoker`
--

DROP TABLE IF EXISTS `dwoker`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dwoker` (
  `id` int NOT NULL AUTO_INCREMENT,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `departmentId` int NOT NULL,
  `userNic` varchar(12) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `departmentId` (`departmentId`),
  KEY `userNic` (`userNic`),
  CONSTRAINT `dwoker_ibfk_1` FOREIGN KEY (`departmentId`) REFERENCES `department` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `dwoker_ibfk_2` FOREIGN KEY (`userNic`) REFERENCES `user` (`nic`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dwoker`
--

LOCK TABLES `dwoker` WRITE;
/*!40000 ALTER TABLE `dwoker` DISABLE KEYS */;
INSERT INTO `dwoker` VALUES (1,'2021-04-18 00:00:00','2021-04-18 00:00:00',5,'198012345678');
/*!40000 ALTER TABLE `dwoker` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `etuform`
--

DROP TABLE IF EXISTS `etuform`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `etuform` (
  `id` int NOT NULL AUTO_INCREMENT,
  `visit_date` datetime NOT NULL,
  `allergies` varchar(100) DEFAULT NULL,
  `observation` json NOT NULL,
  `pupils` varchar(20) DEFAULT NULL,
  `so2` decimal(6,3) DEFAULT NULL,
  `eye` int DEFAULT NULL,
  `verbal` int DEFAULT NULL,
  `motor` int DEFAULT NULL,
  `test_depts` json DEFAULT NULL,
  `severity` varchar(50) DEFAULT NULL,
  `asgn_ward` varchar(12) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `doctorId` int NOT NULL,
  `patientNic` varchar(12) DEFAULT NULL,
  `status` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `doctorId` (`doctorId`),
  KEY `patientNic` (`patientNic`),
  CONSTRAINT `etuform_ibfk_1` FOREIGN KEY (`doctorId`) REFERENCES `doctor` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `etuform_ibfk_2` FOREIGN KEY (`patientNic`) REFERENCES `patient` (`nic`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `etuform`
--

LOCK TABLES `etuform` WRITE;
/*!40000 ALTER TABLE `etuform` DISABLE KEYS */;
/*!40000 ALTER TABLE `etuform` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `nurse`
--

DROP TABLE IF EXISTS `nurse`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `nurse` (
  `id` int NOT NULL AUTO_INCREMENT,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `userNic` varchar(12) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `userNic` (`userNic`),
  CONSTRAINT `nurse_ibfk_1` FOREIGN KEY (`userNic`) REFERENCES `user` (`nic`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `nurse`
--

LOCK TABLES `nurse` WRITE;
/*!40000 ALTER TABLE `nurse` DISABLE KEYS */;
INSERT INTO `nurse` VALUES (1,'2021-04-18 00:00:00','2021-04-18 00:00:00','199912341234');
/*!40000 ALTER TABLE `nurse` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `patient`
--

DROP TABLE IF EXISTS `patient`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `patient` (
  `nic` varchar(12) NOT NULL,
  `title` varchar(4) NOT NULL,
  `name` varchar(100) NOT NULL,
  `adrs` varchar(100) NOT NULL,
  `gdn_name` varchar(100) NOT NULL,
  `gdn_adrs` varchar(100) DEFAULT NULL,
  `contact_no` varchar(10) NOT NULL,
  `age` int NOT NULL,
  `gender` varchar(1) NOT NULL,
  `marital_status` varchar(1) NOT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`nic`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `patient`
--

LOCK TABLES `patient` WRITE;
/*!40000 ALTER TABLE `patient` DISABLE KEYS */;
INSERT INTO `patient` VALUES ('198723709876','Mrs','Amaya Perera','123/2,Kurunegala,Kurunegala','A.K.Nirmali','123/4,Malkaduwawa','0773456785',45,'F','M','2021-04-17 00:00:00',NULL),('199456108712','Mr','Gayan Bandara','123/2,Kurunegala,Kurunegala','S.K.Namal','123/4,Malkaduwawa','0764565765',27,'M','S','2021-04-17 00:00:00',NULL),('199712309876','Mr','Rohan Perera','123/2,Kurunegala,Kurunegala','A.B.Nimal','123/4,Malkaduwawa','0775654543',24,'M','S','2021-04-17 00:00:00',NULL);
/*!40000 ALTER TABLE `patient` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `request`
--

DROP TABLE IF EXISTS `request`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `request` (
  `id` int NOT NULL AUTO_INCREMENT,
  `req_date` datetime NOT NULL,
  `test_type` varchar(100) NOT NULL,
  `special_note` varchar(250) DEFAULT NULL,
  `test_status` varchar(10) DEFAULT 'Pending',
  `formdata` json DEFAULT NULL,
  `attach` varchar(200) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `departmentId` int DEFAULT NULL,
  `patientNic` varchar(12) DEFAULT NULL,
  `etuformId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `departmentId` (`departmentId`),
  KEY `patientNic` (`patientNic`),
  KEY `etuformId` (`etuformId`),
  CONSTRAINT `request_ibfk_1` FOREIGN KEY (`departmentId`) REFERENCES `department` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `request_ibfk_2` FOREIGN KEY (`patientNic`) REFERENCES `patient` (`nic`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `request_ibfk_3` FOREIGN KEY (`etuformId`) REFERENCES `etuform` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `request`
--

LOCK TABLES `request` WRITE;
/*!40000 ALTER TABLE `request` DISABLE KEYS */;
/*!40000 ALTER TABLE `request` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role`
--

DROP TABLE IF EXISTS `role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `role` (
  `role_id` int NOT NULL AUTO_INCREMENT,
  `role_name` varchar(100) NOT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`role_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role`
--

LOCK TABLES `role` WRITE;
/*!40000 ALTER TABLE `role` DISABLE KEYS */;
INSERT INTO `role` VALUES (1,'ETU Doctor','2021-04-17 00:00:00',NULL),(2,'Nurse','2021-04-17 00:00:00',NULL),(3,'Blood Bank','2021-04-17 00:00:00',NULL),(4,'ECG Dept','2021-04-17 00:00:00',NULL),(5,'Micro Biology Dept','2021-04-17 00:00:00',NULL),(6,'Radiology Dept','2021-04-17 00:00:00',NULL),(7,'Chemical_Pathology Dept','2021-04-17 00:00:00',NULL);
/*!40000 ALTER TABLE `role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sequelizemeta`
--

DROP TABLE IF EXISTS `sequelizemeta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sequelizemeta` (
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`name`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sequelizemeta`
--

LOCK TABLES `sequelizemeta` WRITE;
/*!40000 ALTER TABLE `sequelizemeta` DISABLE KEYS */;
INSERT INTO `sequelizemeta` VALUES ('20210526070952-change_column_etuform2.js');
/*!40000 ALTER TABLE `sequelizemeta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `nic` varchar(12) NOT NULL,
  `name` varchar(50) NOT NULL,
  `password` varchar(450) NOT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`nic`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES ('198012345678','Jayan','$2b$10$lxqLtnKGRLAKxeIk3P0fs.oKj6TDCVKlCkIUN0Kqb19Uv5tMJDjKy','2021-04-18 00:00:00','2021-04-18 00:00:00'),('198088888888','Gayan','$2b$10$lxqLtnKGRLAKxeIk3P0fs.oKj6TDCVKlCkIUN0Kqb19Uv5tMJDjKy','2021-04-18 00:00:00','2021-04-18 00:00:00'),('198812345678','Nimal','$2b$10$lxqLtnKGRLAKxeIk3P0fs.oKj6TDCVKlCkIUN0Kqb19Uv5tMJDjKy','2021-04-18 00:00:00','2021-04-18 00:00:00'),('199912341234','Bob','$2b$10$lxqLtnKGRLAKxeIk3P0fs.oKj6TDCVKlCkIUN0Kqb19Uv5tMJDjKy','2021-04-18 00:00:00','2021-04-18 00:00:00');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'hospital'
--

--
-- Dumping routines for database 'hospital'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-05-27 12:56:05
