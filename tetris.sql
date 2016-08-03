-- phpMyAdmin SQL Dump
-- version 4.2.7.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Dec 12, 2014 at 08:45 AM
-- Server version: 5.6.20
-- PHP Version: 5.5.15

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `tetris`
--

-- --------------------------------------------------------

--
-- Table structure for table `scores`
--

CREATE TABLE IF NOT EXISTS `scores` (
`pid` int(20) NOT NULL,
  `pname` varchar(20) CHARACTER SET utf8 NOT NULL,
  `pscore` int(10) NOT NULL
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=83 ;

--
-- Dumping data for table `scores`
--

INSERT INTO `scores` (`pid`, `pname`, `pscore`) VALUES
(6, 'alex', 89),
(7, 'Sriram', 34),
(8, 'bob', 54),
(9, 'cathy', 43),
(10, 'Gouth', 10),
(11, 'Lee', 0),
(12, 'Sam', 23),
(13, 'Sam', 0),
(14, 'Noname', 0),
(15, 'Noname', 0),
(16, 'Noname', 0),
(17, 'Noname', 0),
(18, 'Noname', 0),
(19, 'Noname', 0),
(20, 'Noname', 0),
(21, 'Noname', 0),
(22, 'Noname', 0),
(23, 'Noname', 0),
(24, 'sds', 0),
(25, 'sd', 0),
(26, 'Noname', 0),
(27, 'Noname', 0),
(28, 'Noname', 0),
(29, 'Noname', 0),
(30, 'Noname', 0),
(31, 'Noname', 0),
(32, 'Noname', 34),
(33, 'Noname', 106),
(34, 'abc', 10),
(35, 'cde', 0),
(36, 'abc', 0),
(37, 'cfr', 0),
(38, 'mjh', 0),
(39, 'Noname', 0),
(40, 'mnb', 38),
(41, 'mkj', 0),
(42, 'abc', 0),
(43, 'abc', 0),
(44, 'Jaff', 0),
(45, 'mnb', 0),
(46, '', 0),
(47, 'lkj', 0),
(48, 'nbb', 0),
(49, 'nbv', 0),
(50, 'lkj', 0),
(51, 'lkj', 10),
(52, 'jhh', 0),
(53, 'Noname', 0),
(54, 'jhjh', 0),
(55, 'jh', 0),
(56, 'Noname', 0),
(57, 'Noname', 0),
(58, 'Noname', 0),
(59, 'Noname', 0),
(60, 'Noname', 0),
(61, 'Noname', 0),
(62, 'Noname', 0),
(63, 'Noname', 0),
(64, 'Noname', 0),
(65, 'Noname', 0),
(66, 'Noname', 0),
(67, 'Noname', 0),
(68, 'Noname', 0),
(69, 'Noname', 0),
(70, 'Noname', 0),
(71, 'Noname', 0),
(72, 'Noname', 0),
(73, 'Noname', 0),
(74, 'Noname', 0),
(75, 'Noname', 0),
(76, 'Noname', 0),
(77, 'Noname', 0),
(78, 'Silpa', 211),
(79, 'ss', 0),
(80, 'Noname', 0),
(81, 'Noname', 0),
(82, 'Noname', 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `scores`
--
ALTER TABLE `scores`
 ADD PRIMARY KEY (`pid`), ADD KEY `pname_2` (`pname`), ADD FULLTEXT KEY `pname` (`pname`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `scores`
--
ALTER TABLE `scores`
MODIFY `pid` int(20) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=83;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
