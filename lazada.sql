create database lazada;
use lazada;

-- User
DROP TABLE IF EXISTS user;
CREATE TABLE `lazada`.`user` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `role` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`));
  
select * from user;

-- Product and Warehouse
drop table if exists warehouse, product_inventory, product;
create table warehouse (
wId varchar(50) unique,
wName varchar(50),
address varchar(225),
volume double,
primary key (wId));

create table product (
id int unique auto_increment,
title varchar(225),
description varchar(225),
image varchar(255),
price double,
length double,
width double,
height double,
category varchar(45),
properties json,
primary key (id));

create table product_inventory (
id varchar(50) unique,
product_id int,
warehouse_id varchar(50),
quantity int,
primary key (id),
foreign key (warehouse_id) references warehouse(wId),
foreign key (product_id) references product(id) );

insert into warehouse values 
("829683", "WA", "28 naufd stress, basdf ward, ha tinh province", 100000),
("845683", "WB", "28 naufd stress, basdf ward, ha tinh province", 150000);

-- insert into product values 
-- ("654", "Smartphone", "A smartphone by samsung","image", 1000, 0.2, 0.1, 0.01, '1'),
-- ("674", "Tablet", "A tablet by samsung","image", 1500, 0.25, 0.2, 0.02,'1');

-- insert into product_inventory values 
-- ("375", "654", "845683", 100),
-- ("315", "674", "845683", 100),
-- ("395", "674", "829683", 100);

select * from warehouse join product_inventory
where warehouse.wName like "WA";
select * from warehouse;
select * from product_inventory;

select * from product;
