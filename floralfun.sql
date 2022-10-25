-- phpMyAdmin SQL Dump
-- version 5.2.0-1.el7.remi
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Oct 15, 2022 at 08:58 PM
-- Server version: 10.6.9-MariaDB-log
-- PHP Version: 7.4.30
-- Group 56
-- Jacob Springer, Melissa Perez
SET
  FOREIGN_KEY_CHECKS = 0;

SET
  AUTOCOMMIT = 0;

SET
  SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";

START TRANSACTION;

SET
  time_zone = "+00:00";

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */
;

/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */
;

/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */
;

/*!40101 SET NAMES utf8mb4 */
;

--
-- Database: `cs340_springja`
--
-- --------------------------------------------------------
--
-- Table structure for table `Customers`
--
CREATE
OR REPLACE TABLE `Customers` (
  `customer_id` int(11) NOT NULL,
  `name` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `phone` varchar(15) DEFAULT NULL,
  `address` varchar(145) NOT NULL
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb3;

-- --------------------------------------------------------
--
-- Table structure for table `Items`
--
CREATE
OR REPLACE TABLE `Items` (
  `item_id` int(11) NOT NULL,
  `flower_name` varchar(45) NOT NULL,
  `scientific_name` varchar(45) NOT NULL,
  `color` varchar(45) NOT NULL,
  `is_indoor` tinyint(1) NOT NULL,
  `stock_quantity` int(11) NOT NULL,
  `price` decimal(10, 2) NOT NULL,
  `supplier_id` int(11) NOT NULL
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb3;

-- --------------------------------------------------------
--
-- Table structure for table `Orders`
--
CREATE
OR REPLACE TABLE `Orders` (
  `order_id` int(11) NOT NULL,
  `order_date` date NOT NULL,
  `product_quantity` int(11) NOT NULL,
  `total_sale_price` decimal(10, 2) NOT NULL,
  `customer_id` int(11)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb3;

-- --------------------------------------------------------
--
-- Table structure for table `Order_Items`
--
CREATE
OR REPLACE TABLE `Order_Items` (
  `order_items_id` int(11) NOT NULL,
  `discount` varchar(45) NOT NULL,
  `sale_price` decimal(10, 2) NOT NULL,
  `payment_method` varchar(45) NOT NULL,
  `card_number` varchar(45) NOT NULL,
  `order_id` int(11),
  `item_id` int(11) NOT NULL
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb3;

-- --------------------------------------------------------
--
-- Table structure for table `Suppliers`
--
CREATE
OR REPLACE TABLE `Suppliers` (
  `supplier_id` int(11) NOT NULL,
  `name` varchar(45) NOT NULL,
  `address` varchar(145) NOT NULL,
  `email` varchar(45) NOT NULL,
  `is_local` tinyint(1) NOT NULL
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb3;

--
-- Indexes for dumped tables
--
--
-- Indexes for table `Customers`
--
ALTER TABLE
  `Customers`
ADD
  PRIMARY KEY (`customer_id`);

--
-- Indexes for table `Items`
--
ALTER TABLE
  `Items`
ADD
  PRIMARY KEY (`item_id`),
ADD
  KEY `supplier_id` (`supplier_id`);

--
-- Indexes for table `Orders`
--
ALTER TABLE
  `Orders`
ADD
  PRIMARY KEY (`order_id`),
ADD
  KEY `customer_id` (`customer_id`);

--
-- Indexes for table `Order_Items`
--
ALTER TABLE
  `Order_Items`
ADD
  PRIMARY KEY (`order_items_id`),
ADD
  KEY `order_id` (`order_id`, `item_id`),
ADD
  KEY `item_id` (`item_id`);

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
-- AUTO_INCREMENT for table `Customers`
--
ALTER TABLE
  `Customers`
MODIFY
  `customer_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `Items`
--
ALTER TABLE
  `Items`
MODIFY
  `item_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `Orders`
--
ALTER TABLE
  `Orders`
MODIFY
  `order_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `Order_Items`
--
ALTER TABLE
  `Order_Items`
MODIFY
  `order_items_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `Suppliers`
--
ALTER TABLE
  `Suppliers`
MODIFY
  `supplier_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--
--
-- Constraints for table `Items`
--
ALTER TABLE
  `Items`
ADD
  CONSTRAINT `Items_ibfk_1` FOREIGN KEY (`supplier_id`) REFERENCES `Suppliers` (`supplier_id`);

--
-- Constraints for table `Orders`
--
ALTER TABLE
  `Orders`
ADD
  CONSTRAINT `Orders_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `Customers` (`customer_id`) ON DELETE CASCADE;

--
-- Constraints for table `Order_Items`
--
ALTER TABLE
  `Order_Items`
ADD
  CONSTRAINT `Order_Items_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `Orders` (`order_id`) ON DELETE CASCADE,
ADD
  CONSTRAINT `Order_Items_ibfk_2` FOREIGN KEY (`item_id`) REFERENCES `Items` (`item_id`);

--
-- INSERT data for table `Customers`
--
INSERT INTO
  `Customers` (name, email, phone, address)
VALUES
  (
    'Melody Smith',
    'msmith@msn.com',
    NULL,
    '6601 SW WINDING WAY'
  );

INSERT INTO
  `Customers` (name, email, phone, address)
VALUES
  (
    'Kai Pope',
    'popes@bing.com',
    '202-555-0184',
    '4700 SW HOLLYHOCK CIR'
  );

INSERT INTO
  `Customers` (name, email, phone, address)
VALUES
  (
    'Kim Grant',
    'kgrant@yahoo.com',
    NULL,
    '1645 SW COUNTRY CLUB PL'
  );

--
-- INSERT data for table `Suppliers`
--
INSERT INTO
  `Suppliers` (name, address, email, is_local)
VALUES
  (
    'Flower Inc.',
    '680 SW WASHINGTON AVE',
    'flowersinc@yahoo.com',
    1
  );

INSERT INTO
  `Suppliers` (name, address, email, is_local)
VALUES
  (
    'Sweet Honey',
    '675 SW SAGEBRUSH DR',
    'sh@corp.com',
    1
  );

INSERT INTO
  `Suppliers` (name, address, email, is_local)
VALUES
  (
    'Bridal Flowers',
    '9201 CROESUS AVE',
    'bridalflowers1@google.com',
    0
  );

--
-- INSERT data for table `Items`
--
INSERT INTO
  `Items` (
    flower_name,
    scientific_name,
    color,
    is_indoor,
    stock_quantity,
    price,
    supplier_id
  )
VALUES
  (
    'rose',
    'rosa',
    'red',
    1,
    300,
    12.99,
    (
      SELECT
        supplier_id
      FROM
        Suppliers
      WHERE
        supplier_id = 1
    )
  );

INSERT INTO
  `Items` (
    flower_name,
    scientific_name,
    color,
    is_indoor,
    stock_quantity,
    price,
    supplier_id
  )
VALUES
  (
    'daisy',
    'bellis perennis',
    'white',
    0,
    500,
    9.99,
    (
      SELECT
        supplier_id
      FROM
        Suppliers
      WHERE
        supplier_id = 1
    )
  );

INSERT INTO
  `Items` (
    flower_name,
    scientific_name,
    color,
    is_indoor,
    stock_quantity,
    price,
    supplier_id
  )
VALUES
  (
    'tulip',
    'tulipa',
    'orange',
    1,
    150,
    17.99,
    (
      SELECT
        supplier_id
      FROM
        Suppliers
      WHERE
        supplier_id = 2
    )
  );

INSERT INTO
  `Orders` (
    order_date,
    product_quantity,
    total_sale_price,
    customer_id
  )
VALUES
  (
    '2022-12-25',
    5,
    73.95,
    (
      SELECT
        customer_id
      FROM
        Customers
      WHERE
        customer_id = 1
    )
  );

INSERT INTO
  `Orders` (
    order_date,
    product_quantity,
    total_sale_price,
    customer_id
  )
VALUES
  (
    '2023-12-25',
    10,
    99.90,
    (
      SELECT
        customer_id
      FROM
        Customers
      WHERE
        customer_id = 1
    )
  );

INSERT INTO
  `Orders` (
    order_date,
    product_quantity,
    total_sale_price,
    customer_id
  )
VALUES
  (
    '2021-07-12',
    10,
    129.90,
    (
      SELECT
        customer_id
      FROM
        Customers
      WHERE
        customer_id = 2
    )
  );

--
-- INSERT data for table `Order_Items`
--
INSERT INTO
  `Order_Items` (
    discount,
    sale_price,
    payment_method,
    card_number,
    order_id,
    item_id
  )
VALUES
  (
    'NONE',
    0.00,
    'debit',
    '5152606644395575',
    (
      SELECT
        order_id
      FROM
        Orders
      WHERE
        order_id = 1
    ),
    (
      SELECT
        item_id
      FROM
        Items
      WHERE
        item_id = 3
    )
  );

INSERT INTO
  `Order_Items` (
    discount,
    sale_price,
    payment_method,
    card_number,
    order_id,
    item_id
  )
VALUES
  (
    'NONE',
    0.00,
    'debit',
    '5152606644395575',
    (
      SELECT
        order_id
      FROM
        Orders
      WHERE
        order_id = 1
    ),
    (
      SELECT
        item_id
      FROM
        Items
      WHERE
        item_id = 2
    )
  );

INSERT INTO
  `Order_Items` (
    discount,
    sale_price,
    payment_method,
    card_number,
    order_id,
    item_id
  )
VALUES
  (
    'OFF30',
    90.92,
    'debit',
    '5152606644395575',
    (
      SELECT
        order_id
      FROM
        Orders
      WHERE
        order_id = 2
    ),
    (
      SELECT
        item_id
      FROM
        Items
      WHERE
        item_id = 1
    )
  );

INSERT INTO
  `Order_Items` (
    discount,
    sale_price,
    payment_method,
    card_number,
    order_id,
    item_id
  )
VALUES
  (
    'NONE',
    0.00,
    'credit',
    '4539272950735057',
    (
      SELECT
        order_id
      FROM
        Orders
      WHERE
        order_id = 3
    ),
    (
      SELECT
        item_id
      FROM
        Items
      WHERE
        item_id = 2
    )
  );

SET
  FOREIGN_KEY_CHECKS = 1;

COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */
;

/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */
;

/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */
;