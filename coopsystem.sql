-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 24, 2021 at 04:53 PM
-- Server version: 10.4.17-MariaDB
-- PHP Version: 8.0.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `coopsystem`
--

-- --------------------------------------------------------

--
-- Table structure for table `appliedjobs`
--

CREATE TABLE `appliedjobs` (
  `id` bigint(20) NOT NULL,
  `jid` bigint(20) DEFAULT NULL,
  `sid` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `employees`
--

CREATE TABLE `employees` (
  `id` bigint(20) NOT NULL,
  `email_id` varchar(255) DEFAULT NULL,
  `first_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `jobs`
--

CREATE TABLE `jobs` (
  `id` bigint(20) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `skills` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `attributes` varchar(255) DEFAULT NULL,
  `qualification` varchar(100) DEFAULT NULL,
  `experience` varchar(20) DEFAULT NULL,
  `salpackage` varchar(20) DEFAULT NULL,
  `positions` varchar(11) DEFAULT NULL,
  `status` varchar(20) DEFAULT '1',
  `companyname` varchar(50) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `hrname` varchar(50) DEFAULT NULL,
  `contact1` varchar(20) DEFAULT NULL,
  `contact2` varchar(20) DEFAULT NULL,
  `email` varchar(120) DEFAULT NULL,
  `website` varchar(50) DEFAULT NULL,
  `field` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `jobs`
--

INSERT INTO `jobs` (`id`, `title`, `skills`, `description`, `attributes`, `qualification`, `experience`, `salpackage`, `positions`, `status`, `companyname`, `address`, `hrname`, `contact1`, `contact2`, `email`, `website`, `field`) VALUES
(1, 'Software Engineer', 'JAVA, C#', 'Test', 'Test', 'BE, BTECH, MS, MCA', '3 Years', '21000', '1', 'Accepting', 'Test Company', 'New Westminster', 'Test HR', '8188888888', '8188888888', 'testHR@testcmpany1.com', 'www.testcmpany1.com', 'CSIS'),
(22, 'test engineer', 'JAVA, C#', 'test tsts', 'tets', 'BE', '2', '500000', '2', 'Accepting', 'test2', 'New Westminster', 'Douglas College', '8188888888', '8188888888', 'test@test2.com', 'www.test2.com', 'CSIS');

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `id` int(11) NOT NULL,
  `name` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`id`, `name`) VALUES
(1, 'ROLE_USER'),
(2, 'ROLE_ADMIN');

-- --------------------------------------------------------

--
-- Table structure for table `studentdetails`
--

CREATE TABLE `studentdetails` (
  `id` bigint(20) NOT NULL,
  `sid` bigint(20) DEFAULT NULL,
  `fname` varchar(50) DEFAULT NULL,
  `lname` varchar(50) DEFAULT NULL,
  `contact` varchar(20) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `course` varchar(20) DEFAULT NULL,
  `international` varchar(20) DEFAULT NULL,
  `workpermit` varchar(20) DEFAULT NULL,
  `skills` varchar(255) DEFAULT NULL,
  `resume` varchar(255) DEFAULT NULL,
  `totalexperience` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `studentdetails`
--

INSERT INTO `studentdetails` (`id`, `sid`, `fname`, `lname`, `contact`, `address`, `course`, `international`, `workpermit`, `skills`, `resume`, `totalexperience`) VALUES
(1, 4, 'testF', 'testL', '8188888888', 'Test Address', 'testF', 'Yes', 'Yes', 'Java', NULL, '3');

-- --------------------------------------------------------

--
-- Table structure for table `studentedudetails`
--

CREATE TABLE `studentedudetails` (
  `education_id` bigint(20) NOT NULL,
  `sid` bigint(20) NOT NULL,
  `education` varchar(50) DEFAULT NULL,
  `specialization` varchar(50) DEFAULT NULL,
  `university` varchar(50) DEFAULT NULL,
  `cgpa` varchar(10) DEFAULT NULL,
  `doj` varchar(50) DEFAULT NULL,
  `doc` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `studentedudetails`
--

INSERT INTO `studentedudetails` (`education_id`, `sid`, `education`, `specialization`, `university`, `cgpa`, `doj`, `doc`) VALUES
(1, 4, 'BE', 'Computers', 'Mumbai University', '3.51', '2011-08', '2015-07'),
(2, 4, 'MS', 'Computers', 'DC', '3.56', '2019-08', '2021-12'),
(3, 4, 'PGD', 'Computers', 'DC', '3.56', '2010-07', '2012-12');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) NOT NULL,
  `email` varchar(100) DEFAULT NULL,
  `password` varchar(120) DEFAULT NULL,
  `username` varchar(20) DEFAULT NULL,
  `access` tinyint(1) DEFAULT 1,
  `status` tinyint(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `password`, `username`, `access`, `status`) VALUES
(1, 'admin@test.com', '$2a$10$aNOtYf.xcSWo4yr.TaWAU.jR.mXBAQQqqEEuiWoNrbLR7h4nPeIzm', 'testadmin', 1, 1),
(4, 'test@test12.com', '$2a$10$tAL1QZg73CPsUhsVzfuyOuXnFU13nEbJo.v4Sq/vfa5uMpDMv6lBa', 'testuser', 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `user_roles`
--

CREATE TABLE `user_roles` (
  `user_id` bigint(20) NOT NULL,
  `role_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user_roles`
--

INSERT INTO `user_roles` (`user_id`, `role_id`) VALUES
(1, 2),
(4, 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `appliedjobs`
--
ALTER TABLE `appliedjobs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_JID` (`jid`),
  ADD KEY `FK_StuID` (`sid`);

--
-- Indexes for table `employees`
--
ALTER TABLE `employees`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `website` (`website`),
  ADD UNIQUE KEY `cemail` (`email`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `studentdetails`
--
ALTER TABLE `studentdetails`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `studentid` (`sid`);

--
-- Indexes for table `studentedudetails`
--
ALTER TABLE `studentedudetails`
  ADD PRIMARY KEY (`education_id`),
  ADD KEY `FK_ESID` (`sid`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UKr43af9ap4edm43mmtq01oddj6` (`username`),
  ADD UNIQUE KEY `UK6dotkott2kjsp8vw4d0m25fb7` (`email`);

--
-- Indexes for table `user_roles`
--
ALTER TABLE `user_roles`
  ADD KEY `FK_UID` (`user_id`),
  ADD KEY `FK_RID` (`role_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `appliedjobs`
--
ALTER TABLE `appliedjobs`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `employees`
--
ALTER TABLE `employees`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `studentdetails`
--
ALTER TABLE `studentdetails`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `studentedudetails`
--
ALTER TABLE `studentedudetails`
  MODIFY `education_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `appliedjobs`
--
ALTER TABLE `appliedjobs`
  ADD CONSTRAINT `FK_JID` FOREIGN KEY (`jid`) REFERENCES `jobdetails` (`id`),
  ADD CONSTRAINT `FK_StuID` FOREIGN KEY (`sid`) REFERENCES `studentdetails` (`sid`);

--
-- Constraints for table `studentdetails`
--
ALTER TABLE `studentdetails`
  ADD CONSTRAINT `FK_SID` FOREIGN KEY (`sid`) REFERENCES `users` (`id`);

--
-- Constraints for table `studentedudetails`
--
ALTER TABLE `studentedudetails`
  ADD CONSTRAINT `FK_ESID` FOREIGN KEY (`sid`) REFERENCES `studentdetails` (`sid`);

--
-- Constraints for table `user_roles`
--
ALTER TABLE `user_roles`
  ADD CONSTRAINT `FK_RID` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`),
  ADD CONSTRAINT `FK_UID` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
