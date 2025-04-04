-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 04, 2025 at 09:39 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `mysterybanana`
--

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(6) UNSIGNED NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `reg_date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `name`, `email`, `password`, `reg_date`) VALUES
(1, 'Alice Johnson', 'alice.johnson@gmail.com', '$2y$10$hzQVr0l.h2cXT..eGydIWOP7hzoSBFx0irEuIA/ie/1FJRIHW5mIG', '2025-04-03 08:55:06'),
(4, 'Bob Smith', 'bob.smith@gmail.com', '$2y$10$Stn1oUpAz9C64AU9t.wxXe6J4AYQlXHue7AIDjimPfFDSxALV6qgm', '2025-04-03 08:55:26'),
(7, 'Charlie Davis', 'charlie.davis@gmail.com', '$2y$10$NnpACXh7c7P6kSTwt90p/.z9HoQbgGiJfk8SC8xilymR1YMMAIj2u', '2025-04-03 08:55:43'),
(14, 'David', 'david.miller@gmail.com', '$2y$10$ccfHPD6u7yaR9LKDM/3fSOm3Yp0hEl0BP19V67SVRzktQeIgnhDzi', '2025-04-03 08:56:02'),
(15, 'Emma Wilson', 'emma1011son@gmail.com', '$2y$10$fK6b2ZeDuz1xFdZ1n91dCegApGtS1vNPPwjjjMYj/ZJw4jJsK/R3m', '2025-04-03 08:56:26'),
(16, 'Frank Thomas', 'fran411homas@gmail.com', '$2y$10$ebgfluLovXarHYbCf8Tpp.4i3Mmj89Uyzch7AZpKf9gHmn5Q8BXMS', '2025-04-03 08:56:49'),
(17, 'Grace Lee', 'grace.lee@gmail.com', '$2y$10$1eUKNfk.RthblLTQnjBNgOtg.5nY.nNyymLIkMb9QehJp9k4zZt8.', '2025-04-03 08:57:03'),
(18, 'Henry White', 'henry.white@gmail.com', '$2y$10$y.al0CdCCLt.bMuqqqhfdu8K59tyn0wngpzNDOMM9ha9AhKwjPE.O', '2025-04-03 08:57:22'),
(19, 'Ivy Martin', 'ivymartin@gmail.com', '$2y$10$e9ze/Kbf4Dilz2Px.iPu4.vpv0C2IdVirucaEeBeTLDFOe1tXgAPa', '2025-04-03 08:57:42'),
(20, 'Test1', 'user@gmail.com', '$2y$10$jBz5.yT6n01dHxLw42hd8uzAiNJf2sd9hPZrgBly4WoEGWy7K0Vmq', '2025-03-24 17:19:27'),
(21, 'Buddhini Alwis', 'alwis@test', '$2y$10$8V2SRqGw8NfVgfLm7Lb9bOAkRhC31C/1q0zDnz.cNj6pxby2/DgiG', '2025-03-28 04:24:49'),
(22, 'Jack', 'anderson@gmail.com\r\n', '$2y$10$pxw9zLZDnfIoy4fjh1Q6FOSaYOPV7Yo5HWunCX4jJTVCfRky4Re.i', '2025-04-03 09:22:38'),
(23, 'Elif', 'elif101x@hotmail.com', '$2y$10$4yUCfWjazyr9I6zalc3rMuKMnjCv35eNI1c1Lp9AsWXsJsKTClYrm', '2025-04-03 08:47:48'),
(24, 'Robert Alison', 'robwsde@gmail.com', '$2y$10$TlTbCQXp8BEE6dNiftsxT.XjYyZfEso9Vwv8TlYf76dpKXbgG/6Ha', '2025-04-03 08:47:16'),
(25, 'Kelly', 'K0llyx@hotmail.com', '$2y$10$/RoxzhC997AILn2U0ErIuOPoAUtrWuaJhu11SlSGPzQYkVxpThHIm', '2025-04-03 08:58:49'),
(26, 'Wiliam', 'abcwliam@2hotmail', '$2y$10$MXgk7YtV9Jue7kSBxmEZDeYXQoeapElAYIfZlpYDzMrOjAvVEc9SW', '2025-04-03 09:03:05'),
(27, 'William', 'wiliamh141232@gmail.com', '$2y$10$x.jy1SRU8b9EjdsVFW4Z5.9yGy5OJu57DApSU5hOVyb1JS/bVDBe2', '2025-04-03 09:15:30'),
(28, 'Zoe Robinson', 'zoe.robinson@gmail.com', '$2y$10$4WSNhtXoxYUfYdjk.FmPJucL2JYHmAZ6Xotq0zRzq/ZbkeqevxjdW', '2025-04-03 09:23:37'),
(29, 'Elisha', 'e00ff@hotmail.com', '$2y$10$LEBuWWhcNaNEif38hkFmDe4vLI82.mMvGJCJi/da4TyKQjQKGro7W', '2025-04-03 12:25:06'),
(30, 'Tina King', 'abcd120@gmail.com', '$2y$10$48a4pgiLsaHjdBXsvUt7eOzkewPYMo0goOLaOqxQNBaWjGrIBbsaC', '2025-04-04 00:55:52'),
(31, 'Quinn', 'quinn.walker@gmail.com', '$2y$10$qp7nu3DdjQFmbQuGB2yD0OMX.mdTM3K6NtmCMxgCBNy4kY7EICQNK', '2025-04-04 01:02:25'),
(32, 'Rachel', 'achelasx56@gmail.com', '$2y$10$KIJuDeh2/UBrEp/pzAtle.DyEIlRDFGvnejblkTCCORUAJNEdLU2u', '2025-04-04 01:08:51'),
(33, 'Taylor Noah', 'nh12nhhhh@gmail.com', '$2y$10$eTVPjfWcS6et9iCjZYN6vOrLsT0irbOyn/W87AlkU7wvCT7mqJQpK', '2025-04-04 01:15:10'),
(34, 'Sanka', 'sanka@gmail.com', '$2y$10$uIjyq354yoePEjrBs/CYse8a.d20aQCQYUngsQUl0Z30IH0xCz6Li', '2025-04-04 01:16:43'),
(35, 'Samuel Hall', 'samuel.hall@gmail.com', '$2y$10$0yx0VQ4zGrS32K.mUn1gC.O5X5g4O2R3fyM7AvTzZ5aqX6214En3q', '2025-04-04 01:17:37'),
(36, 'Davis', 'dfavis@hotmail.com', '$2y$10$5HO8EzrcHTEqpdlwGEIkG.7tKG37ACBE3P2zaFJo9I.SfXBWFgjk2', '2025-04-04 01:18:38'),
(37, 'Peter', 'peter@hotmail.com', '$2y$10$97kbG6bRLYlojbfrtqMTR.EhbnFn/Pwa6YbN.xv1WniQHMMQX0YRe', '2025-04-04 01:21:16'),
(38, 'Hirunika', 'hiruniak@gmail.com', '$2y$10$PaUhbFcX8NbrN4o1bupRPeP9.CQZ2pj6WqNVpe6tFPURCsWVdqFBS', '2025-04-04 01:22:12'),
(39, 'Mia Scott', 'abc@gmail.com', '$2y$10$QedR1..Pb1jPabTTMkuXY.o/5HH/93a3bwXKDWuFPNrzC0S7lLpee', '2025-04-04 01:23:14'),
(40, 'Anna', 'anna@gmail.com', '$2y$10$xsJ3oe8W0qYjhpAkEMuBEuaDLuJgJlKwzah8CGY0J6rNA6DH1KyCS', '2025-04-04 05:32:02'),
(41, 'Wimal', 'wimal@gmail.com', '$2y$10$Socer8zVZBJfqHfbEdreCOvyYml0fKyNmKfli18UYAk0Z6FBg3l4e', '2025-04-04 05:37:33'),
(42, 'Wimala', 'wimala@gmail.com', '$2y$10$OGMRlCeTjTihLlsXXX07Wup2j/8bvmK80BwQQTPBWNbJDz/0I6Ram', '2025-04-04 05:41:15'),
(43, 'Rashmi', 'rashmi@gmail.com', '$2y$10$tgImSEJJQUsIvcCk9YjTnuNLnuor.w.LVAT8igDX6B3Sh4yJarc1K', '2025-04-04 05:43:28'),
(44, 'Nimal', 'nimal@gmail.com', '$2y$10$OL5aVmO5eydoW8I1phBqEuwCKYy8VSmZoh/DWqJSiFc8ET9Fv3HWq', '2025-04-04 05:46:32'),
(45, 'Nimali', 'nimali@gmail.com', '$2y$10$25s4VlCOpnh/vtHOrfsxzOzZd3xJ27osQiQ/1PWjRIbVwqDWxGh3e', '2025-04-04 05:54:37'),
(46, 'Kumudu', 'kumudu@gmail.com', '$2y$10$Q5uWNVZRDo3R5S5/FoT/8u/DSKxS7rQ6hUKT5wlUrpe0F6wF8MxFq', '2025-04-04 06:04:54'),
(47, 'Anni', 'anni@gmail.com', '$2y$10$lfXxaIKn1Z1BSlFTOxMfo.gaOF8m4YNr2Vr7sg6YG0qjL1J6PgNFW', '2025-04-04 06:26:15');

-- --------------------------------------------------------

--
-- Table structure for table `user_scores`
--

CREATE TABLE `user_scores` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `score` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_scores`
--

INSERT INTO `user_scores` (`id`, `user_id`, `score`) VALUES
(1, 23, 500),
(2, 21, 1020),
(3, 24, 560),
(8, 26, 30),
(9, 28, 20),
(10, 29, 50),
(27, 30, 70),
(28, 31, 60),
(29, 32, 80),
(30, 33, 1200),
(31, 34, 2250),
(32, 35, 120),
(33, 36, 40),
(34, 37, 10),
(35, 38, 2000),
(36, 39, 350),
(37, 40, 0),
(38, 42, 0),
(39, 43, 0),
(40, 44, 10),
(41, 45, 10),
(42, 46, 30),
(43, 47, 10);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `user_scores`
--
ALTER TABLE `user_scores`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(6) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=48;

--
-- AUTO_INCREMENT for table `user_scores`
--
ALTER TABLE `user_scores`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
