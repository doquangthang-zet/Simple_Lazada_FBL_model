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
wId int unique,
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
sellerId INT,
createdAt DATETIME,
primary key (id));

create table product_inventory (
id int unique auto_increment,
product_id int,
warehouse_id int,
quantity int,
primary key (id),
foreign key (warehouse_id) references warehouse(wId),
foreign key (product_id) references product(id) );

insert into warehouse values
(1, "WA", "28 naufd stress, basdf ward, ha tinh province", 200000),
(2, "WB", "28 naufd stress, basdf ward, ha tinh province", 150000), 
(3, "WC", "28 naufd stress, basdf ward, ha tinh province", 100000),
(4, "WD", "28 naufd stress, basdf ward, ha tinh province", 250000);


insert into product values 
(1, "Samsung", "Galaxy Y", "logo192.png", 1000, 1, 1, 1, "64f95624880a0a5b708de026", '{"Brand": "Samsung", "Color":"red", "Weight":"2"}', 4, "2023-09-08 12:46:30"),
(2, "Iphone", "14Pro", "logo192.png", 1500, 0.2, 0.2, 0.2, "64f95624880a0a5b708de026", '{"Weight":"2"}', 4, "2023-09-08 12:46:35");

insert into product_inventory values 
(1, 1, 3, 100),
(2, 2, 3, 100),
(3, 1, 2, 100);


-- INVENTORY MANAGEMENT
delimiter &&
create procedure deleteWarehouse(in id int)
begin
	declare stock int;
    
	declare `_rollback` int default 0;
    declare CONTINUE HANDLER FOR SQLEXCEPTION set `_rollback` = 1;

    set session transaction isolation level serializable;
    start transaction;
		select count(quantity) into stock from warehouse join product_inventory
		on wId = warehouse_id
		where warehouse.wName = id;
		if stock = 0 then
		delete from warehouse where wId = id;
        end if;
		
        if `_rollback` = 1 then rollback;
        else commit;
        end if;
end &&
delimiter ;

delimiter &&
create procedure createWarehouse(wname varchar(50), waddress varchar(225), wvolume int)
begin 
	declare lastId int;
    declare newId int;
	declare `_rollback` int default 0;
    declare CONTINUE HANDLER FOR SQLEXCEPTION set `_rollback` = 1;
	
	set session transaction isolation level serializable;
    start transaction;
		select wId into lastId from warehouse 
        order by wId desc limit 1;
		set newId = lastId +1;
        
		insert into warehouse values
        (lastId + 1 ,wname, waddress, wvolume);
         
		if `_rollback` = 1 then rollback;
        else commit;
        end if;
end &&
delimiter ;

drop procedure createWarehouse;

-- INBOUND ORDER MANAGEMENT
delimiter &&
SET max_sp_recursion_depth=255;
create procedure selectWarehouse(in proId int, in quantity int)
OK:begin
	declare biggestWhId int;
	declare biggestWhVolume double;
    declare productVolume double;
    declare totalProductVolume double;
    declare remainProduct int;
    declare storedProduct int;
    
    select wId, volume into biggestWhId, biggestWhVolume from warehouse
	order by volume desc
	limit 1;
    
    select length * width * height into productVolume from product
    where id = proId;
    
    select productVolume * quantity into totalProductVolume;
    
    if totalProductVolume = 0 then
		LEAVE OK;
	elseif biggestWhVolume < productVolume then
		LEAVE OK;
    end if;
    
    if totalProductVolume <= biggestWhVolume then
		if not exists (select * from product_inventory where product_id = proId and biggestWhId = warehouse_id) then
			insert into product_inventory (`product_id`, `warehouse_id`, `quantity`) values (proId, biggestWhId, quantity);
			update warehouse set `volume` = biggestWhVolume - totalProductVolume where wid = biggestWhId;
		else 
			update product_inventory set `quantity` = product_inventory.quantity + quantity where product_id = proId and biggestWhId = warehouse_id;
			update warehouse set `volume` = biggestWhVolume - totalProductVolume where wid = biggestWhId;
		end if;
	end if;
    
    if totalProductVolume > biggestWhVolume then
		set remainProduct = ceil((totalProductVolume - biggestWhVolume) / productVolume);
        set storedProduct = quantity - remainProduct;
        
        if not exists (select * from product_inventory where product_id = proId and biggestWhId = warehouse_id) then
			insert into product_inventory (`product_id`, `warehouse_id`, `quantity`) values (proId, biggestWhId, storedProduct);
			update warehouse set `volume` = biggestWhVolume - (storedProduct * productVolume) where wid = biggestWhId;
		else 
			update product_inventory set `quantity` = product_inventory.quantity + storedProduct where product_id = proId and biggestWhId = warehouse_id;
			update warehouse set `volume` = biggestWhVolume - (storedProduct * productVolume) where wid = biggestWhId;
		end if;
        
        call selectWarehouse(proId, remainProduct);
    end if;
end &&
delimiter ;

drop procedure selectWarehouse;

call selectWarehouse(1, 500000);

select * from product_inventory pi join product p on p.id = pi.product_id join warehouse w on pi.warehouse_id = w.wId;
select * from warehouse;
select * from product_inventory;
select * from product;

select count(quantity) from warehouse join product_inventory
on wId = warehouse_id
where warehouse.wName = "WC";

select * from warehouse
order by volume desc
limit 1;

select length * width * height as productVolume 
from product
where id = 2;