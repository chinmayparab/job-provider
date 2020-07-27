-- MySQL dump 10.13  Distrib 8.0.20, for Win64 (x86_64)
--
-- Host: localhost    Database: demo
-- ------------------------------------------------------
-- Server version	8.0.20

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
-- Table structure for table `job`
--

DROP TABLE IF EXISTS `job`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `job` (
  `job_id` varchar(10) NOT NULL,
  `posted_on` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `description` varchar(2000) NOT NULL,
  `closing_date` datetime NOT NULL,
  `pos_names` varchar(1000) NOT NULL,
  `no_postions` varchar(100) NOT NULL,
  `stipend` varchar(255) NOT NULL,
  `qualification` varchar(3000) NOT NULL,
  `extra_info` varchar(1000) NOT NULL,
  `interview_mode` varchar(7) NOT NULL,
  `interveiw_loc` varchar(100) NOT NULL,
  `date_time_interview` datetime NOT NULL,
  `is_online_test` tinyint(1) NOT NULL,
  `posted_by` varchar(45) NOT NULL,
  PRIMARY KEY (`job_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `job`
--

LOCK TABLES `job` WRITE;
/*!40000 ALTER TABLE `job` DISABLE KEYS */;
INSERT INTO `job` VALUES ('bTGMHaDh','2020-07-23 08:19:09','34343434','2018-11-23 17:31:26','fdfdf','4','6000','hfjdhfjf','ydosiahfdjkhfd','online','online','2018-11-23 17:31:26',0,'0'),('iAvNDcI3','2020-07-27 15:42:32','raaj hoon mei','2018-11-23 17:31:26','fdfdf','4','6000','hfjdhfjf','ydosiahfdjkhfd','online','online','2018-11-23 17:31:26',0,'raj'),('lxzqnhnF','2020-07-24 14:39:46','34343434','2018-11-23 17:31:26','fdfdf','4','10000','hfjdhfjf','ydosiahfdjkhfd','online','online','2018-11-23 17:31:26',0,'0'),('ObUxDKSm','2020-07-27 15:44:08','raaj sd mei','2018-11-23 17:31:26','fdfdf','4','6000','hfjdhfjf','ydosiahfdjkhfd','online','online','2018-11-23 17:31:26',0,'raj');
/*!40000 ALTER TABLE `job` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-07-27 23:12:46
