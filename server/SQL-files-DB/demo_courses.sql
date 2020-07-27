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
-- Table structure for table `courses`
--

DROP TABLE IF EXISTS `courses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `courses` (
  `course_id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `description` varchar(1000) NOT NULL,
  `category` varchar(100) NOT NULL,
  `skills_taught` varchar(255) NOT NULL,
  `level` varchar(15) NOT NULL,
  `price` int NOT NULL,
  `url` varchar(100) NOT NULL,
  PRIMARY KEY (`course_id`)
) ENGINE=InnoDB AUTO_INCREMENT=101 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `courses`
--

LOCK TABLES `courses` WRITE;
/*!40000 ALTER TABLE `courses` DISABLE KEYS */;
INSERT INTO `courses` VALUES (1,'The Web Developer Bootcamp','description','Development','web development - HTML, CSS, JS, Node, and More','Beginner',455,'https://www.udemy.com/course/the-web-developer-bootcamp/'),(2,'Deep Learning A-Z™: Hands-On Artificial Neural Networks','description','Development','Deep learning','Beginner',455,'https://www.udemy.com/course/deeplearning/'),(3,'The Complete React Native + Hooks Course [2020 Edition]','description','Development','Redux Framework','Beginner',455,'https://www.udemy.com/course/the-complete-react-native-and-redux-course/'),(4,'Learn Python Programming Masterclass','description','Development','Programming  Languages','Intermediate',455,'https://www.udemy.com/course/python-the-complete-python-developer-course/'),(5,'Complete C# Unity Developer 2D: Learn to Code Making Games','description','Development','Game Development Fundamentals','Intermediate',455,'https://www.udemy.com/course/unitycourse/'),(6,'The Ultimate MySQL Bootcamp: Go from SQL Beginner to Expert','description','Development','MySQL','Beginner',455,'https://www.udemy.com/course/the-ultimate-mysql-bootcamp-go-from-sql-beginner-to-expert/'),(7,'Selenium WebDriver with Java -Basics to Advanced+Frameworks','description','Development','Software Testing','Beginner',455,'https://www.udemy.com/course/selenium-real-time-examplesinterview-questions/'),(8,'Scrum Certification Prep +Scrum Master+ Agile Scrum Training','description','Development','Agile','Intermediate',455,'https://www.udemy.com/course/scrum-certification/'),(9,'Docker Mastery: with Kubernetes +Swarm from a Docker Captain','description','Development','Docker','Intermediate',455,'https://www.udemy.com/course/docker-mastery/'),(10,'Shopify Power: Build An Ecommerce Website Using Shopify','description','Development','Shopify','Beginner',481,'https://www.udemy.com/course/shopify-power/'),(11,'An Entire MBA in 1 Course:Award Winning Business School Prof','description','Business','Business Fundamentals','Intermediate',415,'https://www.udemy.com/course/an-entire-mba-in-1-courseaward-winning-business-school-prof/'),(12,'The Complete Financial Analyst Course 2020','description','Business','Financial Analysis','Beginner',455,'https://www.udemy.com/course/the-complete-financial-analyst-course/'),(13,'Writing With Flair: How To Become An Exceptional Writer','description','Business','Writing ','Advanced',455,'https://www.udemy.com/course/writing-with-flair-how-to-become-an-exceptional-writer/'),(14,'Become a Product Manager | Learn the Skills & Get the Job','description','Business','Product Management','Advanced',455,'https://www.udemy.com/course/become-a-product-manager-learn-the-skills-get-a-job/'),(15,'Sales Training: Practical Sales Techniques','description','Business','Sales skills','Advanced',455,'https://www.udemy.com/course/master-successful-selling/'),(16,'The Complete Digital Marketing Guide - 18 Courses in 1','description','Business','Digital Marketing','Advanced',455,'https://www.udemy.com/course/digital-marketing-guide/'),(17,'UiPath - Level 1 Robotic Process Automation','description','Business','Robotic Process Automation','Beginner',488,'https://www.udemy.com/course/uipath-robotic-process-automation/'),(18,'PMP Exam Prep Seminar - PMBOK Guide 6','description','Business','PMBOK','Advanced',455,'https://www.udemy.com/course/pmp-pmbok6-35-pdus/'),(19,'Intro to Business Law for Entrepreneurs ','description','Business','Business Law','Advanced',481,'https://www.udemy.com/course/introduction-to-business-law-for-entrepreneurs-mba-business-school/'),(20,'The Ultimate Hands-On Hadoop - Tame your Big Data!','description','Business','Big Data','Advanced',455,'https://www.udemy.com/course/the-ultimate-hands-on-hadoop-tame-your-big-data/'),(21,'How to Start an Amazon FBA Store on a Tight Budget','description','Business','Amazo FBA','Advanced',455,'https://www.udemy.com/course/sell-on-amazon-as-small-start-up/'),(22,'Administrative Human Resources (HR) for Beginners','description','Business','Human Resources','Beginner',455,'https://www.udemy.com/course/administrative-human-resources-for-beginners/'),(23,'Professional Life Coaching Certification PCELC Life Coach','description','Business','Life Coach Training','Advanced',455,'https://www.udemy.com/course/professional-life-coach-certification/'),(24,'Scrivener |Full Course on How to Write a Book in Scrivener 2','description','Business','Scrivener','Advanced',455,'https://www.udemy.com/course/scrivener-everything-you-need-to-know-from-idea-to-launch/'),(25,'Fundamentals of Analyzing Real Estate Investments','description','Business','Real Estate Investing','Advanced',455,'https://www.udemy.com/course/real-estate-investment-analysis/'),(26,'The Complete Financial Analyst Course 2020','description','Finance & Accounting Courses','Financial Analysis','Advanced',455,'https://www.udemy.com/course/the-complete-financial-analyst-course/'),(27,'Introduction to Finance, Accounting, Modeling and Valuation','description','Finance & Accounting Courses','Accounting','Advanced',455,'https://www.udemy.com/course/introduction-to-accounting-finance-modeling-valuation-by-chris-haroun/'),(28,'PCI (Payment Card) Standards for Corporate Professionals','description','Finance & Accounting Courses','PCI DSS','Advanced',455,'https://www.udemy.com/course/pci-payment-card-standards-for-corporate-professionals/'),(29,'Blockchain and Bitcoin Fundamentals','description','Finance & Accounting Courses','Bitcoin','Beginner',455,'https://www.udemy.com/course/blockchain-and-bitcoin-fundamentals/'),(30,'(17) Economics courses (35 hrs) incl. Indian & US Economies','description','Finance & Accounting Courses','Economics','Intermediate',455,'https://www.udemy.com/course/egg-timer-economics/'),(31,'The Complete Investment Banking Course 2020','description','Finance & Accounting Courses','Investment Banking','Intermediate',455,'https://www.udemy.com/course/the-complete-investment-banking-course-2016/'),(32,'AWS Certified Solutions Architect - Associate 2020','description','IT & Software','AWS Certification ','Beginner',455,'https://www.udemy.com/course/aws-certified-solutions-architect-associate/'),(33,'The Complete Ethical Hacking Course: Beginner to Advanced!','description','IT & Software','Ethical Hacking','Intermediate',455,'https://www.udemy.com/course/penetration-testing/'),(34,'PLC Programming From Scratch (PLC I)','description','IT & Software','PLC','Beginner',455,'https://www.udemy.com/course/plc-programming-from-scratch/'),(35,'Learn Linux in 5 Days and Level Up Your Career','description','IT & Software','Linux','Intermediate',455,'https://www.udemy.com/course/learn-linux-in-5-days/'),(36,'Microsoft Excel - Excel from Beginner to Advanced','description','Office Productivity','Excel','Beginner',455,'https://www.udemy.com/course/microsoft-excel-2013-from-beginner-to-advanced-and-beyond/'),(37,'The Complete iMovie Course - from Beginner to Advanced 2020','description','Office Productivity','iMovie','Beginner',455,'https://www.udemy.com/course/the-complete-imovie-course/'),(38,'Google Cloud Productivity - Drive and Google\'s Office Suite','description','Office Productivity','Google Apps','Beginner',455,'https://www.udemy.com/course/google-office-productivity/'),(39,'SAP ABAP Programming For Beginners - Online Training','description','Office Productivity','SAP ABAP','Intermediate',455,'https://www.udemy.com/course/sap-abap-programming-for-beginners/'),(40,'Oracle PL/SQL Fundamentals vol. I & II','description','Office Productivity','PPI/SQL','Intermediate',455,'https://www.udemy.com/course/oracle-plsql-fundamentals-vol-i-ii/'),(41,'Reiki Level I, II and Master/Teacher Program','description','Personal Development','Reiki','Intermediate',455,'https://www.udemy.com/course/reikicourse/'),(42,'Become a SpeedDemon: Productivity Tricks to Have More Time','description','Personal Development','Personal Productivity','',455,'https://www.udemy.com/course/become-a-speeddemon-hack-automation-focus-efficiency-to-have-more-time/'),(43,'Management Skills: New Manager Training in Essential Skills','description','Personal Development','Mangement skilla','Intermediate',455,'https://www.udemy.com/course/the-new-manager-managing-people-teams-processes/'),(44,'Investing In Stocks The Complete Course! (11 Hour)','description','Personal Development','Stock Trading ','Intermediate',455,'https://www.udemy.com/course/investing-in-stocks/'),(45,'[2020] Career Hacking™: Resume, LinkedIn, Interviewing +More','description','Personal Development','Interviewing skills','Beginner',455,'https://www.udemy.com/course/golden-gate-bridge/'),(46,'Neuroscience for parents: How to raise amazing kids','description','Personal Development','Neuroscience','Beginner',455,'https://www.udemy.com/course/neuroscience-and-parenting/'),(47,'Happiness Life Coach Certification (Accredited)','description','Personal Development','Life Coach Training','Beginner',455,'https://www.udemy.com/course/happiness-life-coach-certification/'),(48,'Mindfulness Practitioner Course (Level I, II, III & Master)','description','Personal Development','Mindfulness','Beginner',455,'https://www.udemy.com/course/mindfulness-training-course-online-mindfulness-practitioner/'),(49,'Personal Branding Mastery: The System To Reinvent Yourself!','description','Personal Development','Personal Branding ','',611,'https://www.udemy.com/course/personal-branding-mastery/'),(50,'Arts Therapy - Arts Therapy For Self Healing (Part One)','description','Personal Development','Art  Therapy','Beginner',507,'https://www.udemy.com/course/art-therapy-for-everyone/'),(51,'Body Language for Entrepreneurs','description','Personal Development','Body Language','',455,'https://www.udemy.com/course/body-language-for-entrepreneurs/'),(52,'Double Your Confidence & Self Esteem - Complete Blueprint','description','Personal Development','Confidence','Beginner',455,'https://www.udemy.com/course/double-your-confidence-self-esteem/'),(53,'Emotional Intelligence: Master Anxiety, Fear, & Emotions','description','Personal Development','Emotional  Intelligence','Beginner',455,'https://www.udemy.com/course/master-your-emotions-uncertainty-stress-anxiety-and-fear/'),(54,'Become a SuperLearner® 2: Learn Speed Reading & Boost Memory','description','Personal Development','Speed Reading ','Intermediate',455,'https://www.udemy.com/course/become-a-superlearner-2-speed-reading-memory-accelerated-learning/'),(55,'Neuroplasticity: How To Rewire Your Brain','description','Personal Development','Neuroplasticity','Intermediate',494,'https://www.udemy.com/course/neuroplasticity/'),(56,'Wordpress for Beginners - Master Wordpress Quickly','description','Design','WordPress','Beginner',455,'https://www.udemy.com/course/wordpress-for-beginners-course/'),(57,'The Ultimate Drawing Course - Beginner to Advanced','description','Design','Drawing','Beginner',455,'https://www.udemy.com/course/the-ultimate-drawing-course-beginner-to-advanced/'),(58,'Drawing and Painting on the iPad with Procreate','description','Design','Digital art ','Intermediate',455,'https://www.udemy.com/course/drawing-and-painting-on-the-ipad-with-procreate/'),(59,'UX & Web Design Master Course: Strategy, Design, Development','description','Design','User Experience design','Intermediate',455,'https://www.udemy.com/course/ux-web-design-master-course-strategy-design-development/'),(60,'Pixel art for Video games','description','Design','Pixel Art','Intermediate',455,'https://www.udemy.com/course/pixel-art-for-video-games/'),(61,'Learn to draw fashion with Adobe Illustrator CC - Beginners','description','Design','Adobe Illustrator','Beginner',455,'https://www.udemy.com/course/learn-to-draw-fashion-with-adobe-illustrator-cc-beginners/'),(62,'The Complete Digital Marketing Course - 12 Courses in 1','description','Marketing','Digital Marketing','Beginner',455,'https://www.udemy.com/course/learn-digital-marketing-course/'),(63,'SEO 2020: Complete SEO Training + SEO for WordPress Websites','description','Marketing','SEO','Beginner',455,'https://www.udemy.com/course/seo-get-to-number1-in-google-search/'),(64,'Facebook Ads & Facebook Marketing MASTERY 2020 | Coursenvy ®','description','Marketing','Facebook Marketing','Beginner',455,'https://www.udemy.com/course/facebook-ads-facebook-marketing-mastery-guide/'),(65,'YouTube Masterclass - Your Complete Guide to YouTube','description','Marketing','Youtube Marketing','Intermediate',455,'https://www.udemy.com/course/youtube-masterclass/'),(66,'Google Analytics Certification: Become Certified & Earn More','description','Marketing','Google Analytics','Intermediate',455,'https://www.udemy.com/course/google-analytics-certification/'),(67,'The Ultimate Public Relations Masterclass','description','Marketing','Public Relations','Beginner',455,'https://www.udemy.com/course/the-ultimate-public-relations-masterclass/'),(68,'The Art & Science of Drawing / BASIC SKILLS','description','Lifestyle','Drawing','Beginner',455,'https://www.udemy.com/course/the-art-and-science-of-drawing/'),(69,'Sourdough Bread Baking 101','description','Lifestyle','Sourdough Bread Baking','Beginner',474,'https://www.udemy.com/course/sourdough-bread-baking-101/'),(70,'Natural Beauty: How to Make Lotions,Creams and Body Butters','description','Lifestyle','Beauty','Beginner',468,'https://www.udemy.com/course/natural-beauty-how-to-make-lotionscreams-and-body-butters/'),(71,'Travel Writing: Explore the World & Publish Your Stories!','description','Lifestyle','Writing ','Beginner',455,'https://www.udemy.com/course/travel-writing-class/'),(72,'iPhone Photography | Take Professional Photos On Your iPhone','description','Photography','iPhone Photography','Beginner',481,'https://www.udemy.com/course/iphonephotography/'),(73,'Photography Masterclass: A Complete Guide to Photography','description','Photography','Photography','Beginner',455,'https://www.udemy.com/course/photography-masterclass-complete-guide-to-photography/'),(74,'Adobe Lightroom Classic CC & CC: Photo Editing Masterclass','description','Photography','Adobe Lightroom ','Beginner',455,'https://www.udemy.com/course/adobe-lightroom/'),(75,'Cognitive Behavioural Therapy (CBT) Practitioner Certificate','description','Health & Fitness','CBT','Beginner',455,'https://www.udemy.com/course/cognitive-behavioural-therapy-online-course-cbt-practitioner-course/'),(76,'Herbalism :: Introduction & Medicine Making [Certificate]','description','Health & Fitness','Herbalism','Intermediate',500,'https://www.udemy.com/course/herbalism-medicine-making/'),(77,'Elevate Your Tennis Game: Learn from Champion Andre Agassi','description','Health & Fitness','Tennis','Intermediate',462,'https://www.udemy.com/course/andreagassi/'),(78,'Internationally Accredited Diploma in Yoga Training','description','Health & Fitness','Yoga','Intermediate',481,'https://www.udemy.com/course/internationally-accredited-diploma-in-yoga-training/'),(79,'Shuffle Dance Master Class Vol 1. | How to Shuffle Dance','description','Health & Fitness','Dance','Beginner',455,'https://www.udemy.com/course/how-to-shuffle-dance-tutorial/'),(80,'Crash Course 2 Keto - Ketosis Made Simple','description','Health & Fitness','Ketosis','Beginner',455,'https://www.udemy.com/course/crashcourse2keto/'),(81,'The Art of Energy Healing','description','Health & Fitness','Energy Healing','Intermediate',455,'https://www.udemy.com/course/the-art-of-energy-healing/'),(82,'Pianoforall - Incredible New Way To Learn Piano & Keyboard','description','Music','Piano','Advanced',455,'https://www.udemy.com/course/pianoforall-incredible-new-way-to-learn-piano-keyboard/'),(83,'Music + Audio Production in Logic Pro X - The Complete Guide','description','Music','Music Production','Advanced',455,'https://www.udemy.com/course/music-production-in-logic-pro-x-course/'),(84,'Music Theory Comprehensive Complete! (Levels 1, 2, & 3)','description','Music','Music theory','Beginner',514,'https://www.udemy.com/course/music-theory-complete/'),(85,'How To Sing #1: Complete Vocal Warm ups & Voice Physiology','description','Music','Singing','Beginner',468,'https://www.udemy.com/course/singing-lessons-online/'),(86,'Read Music FAST!','description','Music','Reading Music','Beginner',455,'https://www.udemy.com/course/sight-reading/'),(87,'Ultimate Ableton Live 9 COMPLETE: Parts 1, 2, & 3','description','Music','Aleton Live','Beginner',455,'https://www.udemy.com/course/ultimate-ableton-live-complete/'),(88,'IELTS Band 7+ Complete Prep Course','description','Teaching & Academics','IELTS','Beginner',644,'https://www.udemy.com/course/ielts-band-7-preparation-course/'),(89,'Mastering Data Structures & Algorithms using C and C++','description','Teaching & Academics','Data Structures','Beginner',455,'https://www.udemy.com/course/datastructurescncpp/'),(90,'Critical Thinker Academy: Learn to Think Like a Philosopher','description','Teaching & Academics','Critical Thinking','Beginner',455,'https://www.udemy.com/course/critical-thinker-academy/'),(91,'Become a Calculus 1 Master','description','Teaching & Academics','Calculus','Beginner',455,'https://www.udemy.com/course/calculus1/'),(92,'The complete SOLAR ENERGY course. Beginner to advanced level','description','Teaching & Academics','Solar Energy','Intermediate',481,'https://www.udemy.com/course/the-complete-solar-energy-course-beginner-to-advanced-level/'),(93,'How to Create an Awesome Online Course','description','Teaching & Academics','Online Course Creation','Intermediate',455,'https://www.udemy.com/course/how-to-create-an-awesome-online-course/'),(94,'Counselling Practitioner Certificate (Beginner to Advanced)','description','Teaching & Academics','Counselling','Beginner',455,'https://www.udemy.com/course/online-counselling-practitioner-course-counselling-skills/'),(95,'Learn German Language: Complete German Course - Beginners','description','Teaching & Academics','German Language','Beginner',455,'https://www.udemy.com/course/german-course-for-beginners-learn-german/'),(96,'Confidence On Camera: Make Amazing Videos, Easily.','description','Teaching & Academics','Presentation Skills','Advanced',468,'https://www.udemy.com/course/be-comfortable-and-confident-on-camera/'),(97,'IELTS Band 7+ Complete Prep Course','description','Teaching & Academics','IELTS','Beginner',644,'https://www.udemy.com/course/ielts-band-7-preparation-course/'),(98,'Research Methodology','description','Teaching & Academics','Research Methods','Beginner',455,'https://www.udemy.com/course/research-methods/'),(99,'Complete Punctuation: Novice To Pro','description','Teaching & Academics','Punctuation','Intermediate',455,'https://www.udemy.com/course/punctuation-novice-to-pro/'),(100,'Rockstar Teacher Training','description','Teaching & Academics','Teacher Training','Intermediate',455,'https://www.udemy.com/course/rockstar-teacher-training/');
/*!40000 ALTER TABLE `courses` ENABLE KEYS */;
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
