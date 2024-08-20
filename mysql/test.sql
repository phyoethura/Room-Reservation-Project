-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 18, 2024 at 05:20 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `test`
--

-- --------------------------------------------------------

--
-- Table structure for table `register_students`
--

CREATE TABLE `register_students` (
  `email` varchar(30) NOT NULL,
  `name` varchar(30) NOT NULL,
  `mfu_ID` bigint(15) NOT NULL,
  `password` varchar(200) NOT NULL,
  `role` int(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf32 COLLATE=utf32_unicode_ci;

--
-- Dumping data for table `register_students`
--

INSERT INTO `register_students` (`email`, `name`, `mfu_ID`, `password`, `role`) VALUES
('6331210304@lamduan.mfu.ac.th', 'uoy', 6331210304, '$2b$10$.8b4D5vVeY4KwDhDMWERXOSNfM8ENSGkrZJmXNQiN6WsUTmMwWu.6', 1),
('6431501140@lamduan.mfu.ac.th', 'namthip', 6431501140, '$2b$10$nZ8.Rr1bRLVWmRlFlxYiDODZWE7w/Ht7WIOwks9s6AVK150zXPhgK', 2),
('6431501141@lamduan.mfu.ac.th', 'test', 6431501141, '$2b$10$EXLkgrmQeBWmh690BbCN/uNci82AmKfhHWcYzMfng0TFIoZqpG.j6', 1),
('6431501173@lamduan.mfu.ac.th', 'phyothura', 6431501173, '$2b$10$LDy.h714qmL06./6HT9NNuupQqrxpvWcvia/XKxOZIifk1m2GVmbO', 1),
('6431501174@lamduan.mfu.ac.th', 'Salai David Poi Hlan', 6431501174, '$2b$10$PCGaJ6Rc.zMSNenQW8cfjeFWVRMo/PTwgfQrbvUV9leCmpD1oRQTu', 3),
('6431501175@lamduan.mfu.ac.th', 'Lde', 6431501175, '$2b$10$xQmh5GWo0oXfHWkMr8TH5.ZUDZuMCEQTNGj72mSH.Tofhx5sn.a3G', 1);

-- --------------------------------------------------------

--
-- Table structure for table `request_rooms`
--

CREATE TABLE `request_rooms` (
  `mfu_ID` bigint(15) NOT NULL,
  `time` varchar(20) DEFAULT NULL,
  `date` date NOT NULL,
  `reason` varchar(200) NOT NULL,
  `request_ID` int(20) NOT NULL,
  `status` varchar(20) NOT NULL,
  `room_ID` int(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf32 COLLATE=utf32_unicode_ci;

--
-- Dumping data for table `request_rooms`
--

INSERT INTO `request_rooms` (`mfu_ID`, `time`, `date`, `reason`, `request_ID`, `status`, `room_ID`) VALUES
(6431501175, '8:00-10:00', '2023-11-30', 'test1', 83, 'approved', 13),
(6431501175, '13:00-15:00', '2023-11-28', 'test2', 84, 'approved', 6),
(6431501141, '10:00-12:00', '2023-11-30', 'test3', 85, 'approved', 13),
(6431501141, '13:00-15:00', '2023-11-28', 'test4', 86, 'rejected', 6),
(6431501141, '15:00-17:00', '2023-12-01', 'test6', 88, 'approved', 11),
(6431501175, '10:00-12:00', '2023-12-02', 'test5', 89, 'rejected', 10),
(6431501175, '13:00-15:00', '2023-12-03', 'test7', 90, 'approved', 10),
(6431501175, '8:00-10:00', '2023-11-26', 'test8', 91, 'approved', 8),
(6431501141, '8:00-10:00', '2023-11-25', 'test9', 92, 'approved', 8),
(6431501175, '8:00-10:00', '2023-11-25', 'test10', 93, 'rejected', 8),
(6431501175, '8:00-10:00', '2023-11-25', 'gugu', 94, 'approved', 7),
(6431501175, '8:00-10:00', '2023-11-28', 'jjj', 95, 'rejected', 16),
(6431501175, '8:00-10:00', '2023-11-28', '3', 96, 'rejected', 8);

-- --------------------------------------------------------

--
-- Table structure for table `rooms`
--

CREATE TABLE `rooms` (
  `room_ID` int(20) NOT NULL,
  `room_Number` varchar(20) NOT NULL,
  `building` varchar(20) NOT NULL,
  `description` varchar(100) NOT NULL,
  `room_Status` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf32 COLLATE=utf32_unicode_ci;

--
-- Dumping data for table `rooms`
--

INSERT INTO `rooms` (`room_ID`, `room_Number`, `building`, `description`, `room_Status`) VALUES
(1, '401', 'S7', 'For 4 people. This room has a whiteboard, stationery, power plug and ADAPTER.', 'enable'),
(2, '405', 'S7', 'For 6 people. This room has a TV, power plug and ADAPTER.', 'enable'),
(3, '403', 'S7', 'For 8 people. This room has a Projector, microphone, power plug and ADAPTER.', 'enable'),
(4, '445', 'S8', 'For 4 people. This room has a whiteboard, stationery, power plug and ADAPTER.', 'enable'),
(5, '303', 'E1', 'For 4 people. This room has a whiteboard, stationery, power plug and ADAPTER.', 'enable'),
(6, '3032', 'E1', 'For 6 people. This room has a TV, power plug and ADAPTER.', 'enable'),
(7, '205', 'C2', 'For 8 people. This room has a Projector, microphone, power plug and ADAPTER.', 'enable'),
(8, '304', 'C2', 'For 4 people. This room has a whiteboard, stationery, power plug and ADAPTER.\n', 'enable'),
(9, '402', 'S7A', 'For 6 people. This room has a TV, power plug and ADAPTER.', 'enable'),
(10, '201', 'E3', 'For 6 people. This room has a TV, power plug and ADAPTER.', 'enable'),
(11, '402', 'E3', 'For 8 people. This room has a Projector, microphone, power plug and ADAPTER.', 'enable'),
(12, '301', 'S1', 'For 8 people. This room has a Projector, microphone, power plug and ADAPTER.', 'enable'),
(13, '232', 'S1', 'For 8 people. This room has a Projector, microphone, power plug and ADAPTER.', 'enable'),
(14, '302', 'S1', 'For 6 people. This room has a TV, power plug and ADAPTER.', 'disable'),
(15, '303', 'S1', 'For 4 people. This room has a whiteboard, stationery, power plug and ADAPTER.', 'enable'),
(16, '102', 'E1', 'For 6 people. This room has a TV, power plug and ADAPTER.', 'enable'),
(17, '302', 'C3', 'Add', 'enable');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `register_students`
--
ALTER TABLE `register_students`
  ADD PRIMARY KEY (`mfu_ID`);

--
-- Indexes for table `request_rooms`
--
ALTER TABLE `request_rooms`
  ADD PRIMARY KEY (`request_ID`),
  ADD KEY `mfu_ID_FK` (`mfu_ID`),
  ADD KEY `room_ID_FK` (`room_ID`);

--
-- Indexes for table `rooms`
--
ALTER TABLE `rooms`
  ADD PRIMARY KEY (`room_ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `request_rooms`
--
ALTER TABLE `request_rooms`
  MODIFY `request_ID` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=97;

--
-- AUTO_INCREMENT for table `rooms`
--
ALTER TABLE `rooms`
  MODIFY `room_ID` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `request_rooms`
--
ALTER TABLE `request_rooms`
  ADD CONSTRAINT `mfu_ID_FK` FOREIGN KEY (`mfu_ID`) REFERENCES `register_students` (`mfu_ID`),
  ADD CONSTRAINT `room_ID_FK` FOREIGN KEY (`room_ID`) REFERENCES `rooms` (`room_ID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
