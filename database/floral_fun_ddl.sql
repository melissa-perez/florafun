-- phpMyAdmin SQL Dump
-- version 5.2.0-1.el7.remi
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Nov 02, 2022 at 04:37 AM
-- Server version: 10.6.9-MariaDB-log
-- PHP Version: 7.4.30
--
-- Database: Floral Fun
-- Group: 56
-- Members: Jacob Springer, Melissa Perez
-- For CS340 Final Project
/*
 Floral Fun is a small, up-and-coming brick-and-mortar flower shop in Corvallis, Oregon.
 The shop owners are looking into creating a database website as taking orders on pen 
 and paper is no longer sustainable. The goal of the website is to record various information
 such as Customers, Orders, and Items into its database.
 */
SET
  SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";

START TRANSACTION;

SET
  time_zone = "+00:00";

SET
  FOREIGN_KEY_CHECKS = 0;

SET
  AUTOCOMMIT = 0;

DROP TABLE IF EXISTS Customers,
Orders,
Order_Items,
Suppliers,
Colors,
Items,
Discounts,
Payment_Methods;

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */
;

/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */
;

/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */
;

/*!40101 SET NAMES utf8mb4 */
;

--
--
-- --------------------------------------------------------
--
-- Table structure for table `Colors`
--
CREATE TABLE `Colors` (
  `color_id` int(11) NOT NULL,
  `color` varchar(45) NOT NULL
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

--
-- Dumping data for table `Colors`
--
INSERT INTO
  `Colors` (`color_id`, `color`)
VALUES
  (1, 'red'),
  (2, 'orange'),
  (3, 'yellow'),
  (4, 'blue'),
  (5, 'purple'),
  (6, 'green'),
  (7, 'white');

-- --------------------------------------------------------
--
-- Table structure for table `Customers`
--
CREATE TABLE `Customers` (
  `customer_id` int(11) NOT NULL,
  `name` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `phone` varchar(15) DEFAULT NULL,
  `address` varchar(145) NOT NULL
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb3;

--
-- Dumping data for table `Customers`
--
INSERT INTO
  `Customers` (
    `customer_id`,
    `name`,
    `email`,
    `phone`,
    `address`
  )
VALUES
  (
    1,
    'Melody Smith',
    'msmith@msn.com',
    NULL,
    '6601 SW WINDING WAY CORVALLIS OREGON 97330'
  ),
  (
    2,
    'Kai Pope',
    'popes@bing.com',
    '202-555-0184',
    '4700 SW HOLLYHOCK CIR CORVALLIS OREGON 97331'
  ),
  (
    3,
    'Kim Grant',
    'kgrant@yahoo.com',
    NULL,
    '1645 SW COUNTRY CLUB PL CORVALLIS OREGON 97339'
  );

-- --------------------------------------------------------
--
-- Table structure for table `Discounts`
--
CREATE TABLE `Discounts` (
  `discount_id` int(11) NOT NULL,
  `code` varchar(45) NOT NULL,
  `percent` int(3) NOT NULL
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb3;

--
-- Dumping data for table `Discounts`
--
INSERT INTO
  `Discounts` (`discount_id`, `code`, `percent`)
VALUES
  (1, 'OFF10', 10),
  (2, 'OFF20', 20),
  (3, 'OFF30', 30),
  (4, 'NONE', 0);

-- --------------------------------------------------------
--
-- Table structure for table `Items`
--
CREATE TABLE `Items` (
  `item_id` int(11) NOT NULL,
  `flower_name` varchar(45) NOT NULL,
  `scientific_name` varchar(45) NOT NULL,
  `is_indoor` tinyint(1) NOT NULL,
  `stock_quantity` int(11) NOT NULL,
  `price` decimal(10, 2) NOT NULL,
  `supplier_id` int(11) DEFAULT NULL,
  `color_id` int(11) DEFAULT NULL
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb3;

--
-- Dumping data for table `Items`
--
INSERT INTO
  `Items` (
    `item_id`,
    `flower_name`,
    `scientific_name`,
    `is_indoor`,
    `stock_quantity`,
    `price`,
    `supplier_id`,
    `color_id`
  )
VALUES
  (1, 'rose', 'rosa', 1, 300, '12.99', 1, 1),
  (
    2,
    'daisy',
    'bellis perennis',
    0,
    500,
    '9.99',
    1,
    7
  ),
  (3, 'tulip', 'tulipa', 1, 150, '17.99', 2, 2);

-- --------------------------------------------------------
--
-- Table structure for table `Orders`
--
CREATE TABLE `Orders` (
  `order_id` int(11) NOT NULL,
  `order_date` date NOT NULL,
  `order_quantity` int(11) NOT NULL,
  `total_sale_price` decimal(10, 2) NOT NULL,
  `customer_id` int(11) DEFAULT NULL,
  `payment_method_id` int(11) DEFAULT NULL,
  `discount_id` int(11) DEFAULT NULL
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb3;

--
-- Dumping data for table `Orders`
--
INSERT INTO
  `Orders` (
    `order_id`,
    `order_date`,
    `order_quantity`,
    `total_sale_price`,
    `customer_id`,
    `payment_method_id`,
    `discount_id`
  )
VALUES
  (1, '2022-12-25', 5, '73.95', 1, 1, 1),
  (2, '2023-12-25', 10, '99.90', 1, 1, 4),
  (3, '2021-07-12', 10, '129.90', 2, 2, 3);

-- --------------------------------------------------------
--
-- Table structure for table `Order_Items`
--
CREATE TABLE `Order_Items` (
  `order_item_id` int(11) NOT NULL,
  `quantity` int(5) NOT NULL,
  `order_id` int(11) DEFAULT NULL,
  `item_id` int(11) DEFAULT NULL
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb3;

--
-- Dumping data for table `Order_Items`
--
INSERT INTO
  `Order_Items` (
    `order_item_id`,
    `quantity`,
    `order_id`,
    `item_id`
  )
VALUES
  (1, 3, 1, 2),
  (2, 2, 1, 3),
  (3, 10, 2, 2);

-- --------------------------------------------------------
--
-- Table structure for table `Payment_Methods`
--
CREATE TABLE `Payment_Methods` (
  `payment_method_id` int(11) NOT NULL,
  `type` varchar(45) NOT NULL
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb3;

--
-- Dumping data for table `Payment_Methods`
--
INSERT INTO
  `Payment_Methods` (`payment_method_id`, `type`)
VALUES
  (1, 'debit'),
  (2, 'credit'),
  (3, 'check');

-- --------------------------------------------------------
--
-- Table structure for table `Suppliers`
--
CREATE TABLE `Suppliers` (
  `supplier_id` int(11) NOT NULL,
  `name` varchar(45) NOT NULL,
  `address` varchar(145) NOT NULL,
  `email` varchar(45) NOT NULL,
  `is_local` tinyint(1) NOT NULL
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb3;

--
-- Dumping data for table `Suppliers`
--
INSERT INTO
  `Suppliers` (
    `supplier_id`,
    `name`,
    `address`,
    `email`,
    `is_local`
  )
VALUES
  (
    1,
    'Flower Inc.',
    '680 SW WASHINGTON AVE CORVALLIS OREGON 97331',
    'flowersinc@yahoo.com',
    1
  ),
  (
    2,
    'Sweet Honey',
    '675 SW SAGEBRUSH DR CORVALLIS OREGON 97331',
    'sh@corp.com',
    1
  ),
  (
    3,
    'Bridal Flowers',
    '9201 CROESUS AVE LOS ANGELES CALIFORNIA 90041',
    'bridalflowers1@google.com',
    0
  );

--
-- Indexes for dumped tables
--
--
-- Indexes for table `Colors`
--
ALTER TABLE
  `Colors`
ADD
  PRIMARY KEY (`color_id`);

--
-- Indexes for table `Customers`
--
ALTER TABLE
  `Customers`
ADD
  PRIMARY KEY (`customer_id`);

--
-- Indexes for table `Discounts`
--
ALTER TABLE
  `Discounts`
ADD
  PRIMARY KEY (`discount_id`);

--
-- Indexes for table `Items`
--
ALTER TABLE
  `Items`
ADD
  PRIMARY KEY (`item_id`),
ADD
  KEY `supplier_id` (`supplier_id`),
ADD
  KEY `color_id` (`color_id`);

--
-- Indexes for table `Orders`
--
ALTER TABLE
  `Orders`
ADD
  PRIMARY KEY (`order_id`),
ADD
  KEY `customer_id` (`customer_id`),
ADD
  KEY `payment_method_id` (`payment_method_id`, `discount_id`),
ADD
  KEY `discount_id` (`discount_id`);

--
-- Indexes for table `Order_Items`
--
ALTER TABLE
  `Order_Items`
ADD
  PRIMARY KEY (`order_item_id`),
ADD
  KEY `order_id` (`order_id`, `item_id`),
ADD
  KEY `item_id` (`item_id`);

--
-- Indexes for table `Payment_Methods`
--
ALTER TABLE
  `Payment_Methods`
ADD
  PRIMARY KEY (`payment_method_id`);

--
-- Indexes for table `Suppliers`
--
ALTER TABLE
  `Suppliers`
ADD
  PRIMARY KEY (`supplier_id`);

--
-- AUTO_INCREMENT for dumped tables
--
--
-- AUTO_INCREMENT for table `Colors`
--
ALTER TABLE
  `Colors`
MODIFY
  `color_id` int(11) NOT NULL AUTO_INCREMENT,
  AUTO_INCREMENT = 8;

--
-- AUTO_INCREMENT for table `Customers`
--
ALTER TABLE
  `Customers`
MODIFY
  `customer_id` int(11) NOT NULL AUTO_INCREMENT,
  AUTO_INCREMENT = 4;

--
-- AUTO_INCREMENT for table `Discounts`
--
ALTER TABLE
  `Discounts`
MODIFY
  `discount_id` int(11) NOT NULL AUTO_INCREMENT,
  AUTO_INCREMENT = 7;

--
-- AUTO_INCREMENT for table `Items`
--
ALTER TABLE
  `Items`
MODIFY
  `item_id` int(11) NOT NULL AUTO_INCREMENT,
  AUTO_INCREMENT = 4;

--
-- AUTO_INCREMENT for table `Orders`
--
ALTER TABLE
  `Orders`
MODIFY
  `order_id` int(11) NOT NULL AUTO_INCREMENT,
  AUTO_INCREMENT = 4;

--
-- AUTO_INCREMENT for table `Order_Items`
--
ALTER TABLE
  `Order_Items`
MODIFY
  `order_item_id` int(11) NOT NULL AUTO_INCREMENT,
  AUTO_INCREMENT = 4;

--
-- AUTO_INCREMENT for table `Payment_Methods`
--
ALTER TABLE
  `Payment_Methods`
MODIFY
  `payment_method_id` int(11) NOT NULL AUTO_INCREMENT,
  AUTO_INCREMENT = 4;

--
-- AUTO_INCREMENT for table `Suppliers`
--
ALTER TABLE
  `Suppliers`
MODIFY
  `supplier_id` int(11) NOT NULL AUTO_INCREMENT,
  AUTO_INCREMENT = 4;

--
-- Constraints for dumped tables
--
--
-- Constraints for table `Items`
--
ALTER TABLE
  `Items`
ADD
  CONSTRAINT `Items_ibfk_1` FOREIGN KEY (`supplier_id`) REFERENCES `Suppliers` (`supplier_id`) ON DELETE
SET
  NULL ON UPDATE CASCADE,
ADD
  CONSTRAINT `Items_ibfk_2` FOREIGN KEY (`color_id`) REFERENCES `Colors` (`color_id`) ON DELETE
SET
  NULL ON UPDATE CASCADE;

--
-- Constraints for table `Orders`
--
ALTER TABLE
  `Orders`
ADD
  CONSTRAINT `Orders_ibfk_1` FOREIGN KEY (`payment_method_id`) REFERENCES `Payment_Methods` (`payment_method_id`) ON DELETE
SET
  NULL ON UPDATE CASCADE,
ADD
  CONSTRAINT `Orders_ibfk_2` FOREIGN KEY (`discount_id`) REFERENCES `Discounts` (`discount_id`) ON DELETE
SET
  NULL ON UPDATE CASCADE,
ADD
  CONSTRAINT `Orders_ibfk_3` FOREIGN KEY (`customer_id`) REFERENCES `Customers` (`customer_id`) ON DELETE
SET
  NULL ON UPDATE CASCADE;

--
-- Constraints for table `Order_Items`
--
ALTER TABLE
  `Order_Items`
ADD
  CONSTRAINT `Order_Items_ibfk_1` FOREIGN KEY (`item_id`) REFERENCES `Items` (`item_id`) ON DELETE
SET
  NULL ON UPDATE CASCADE,
ADD
  CONSTRAINT `Order_Items_ibfk_2` FOREIGN KEY (`order_id`) REFERENCES `Orders` (`order_id`) ON DELETE CASCADE ON UPDATE CASCADE;

SET
  FOREIGN_KEY_CHECKS = 1;

COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */
;

/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */
;

/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */
;