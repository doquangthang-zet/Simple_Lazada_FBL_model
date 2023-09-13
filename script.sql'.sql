-- create database lazada;
use lazada;

drop table if exists warehouse, product_inventory, product, user;

CREATE TABLE `lazada`.`user` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `role` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`));

drop table if exists warehouse, product_inventory, product;
create table warehouse (
wId int auto_increment unique,
wName varchar(50) unique,
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
createdAt DATETIME);

create table product_inventory (
id int auto_increment unique,
product_id int,
warehouse_id int,
quantity int not null,
total_volume double,
primary key (id),
foreign key (warehouse_id) references warehouse(wId),
foreign key (product_id) references product(id) );

drop table if exists cart_items, outbound_order;

create table cart_items (
id int unique auto_increment,
productId int,
quantity int,
customer_id int,
primary key (id));

create table outbound_order (
id int unique auto_increment,
total double,
customer_id int,
f_name varchar(255),
l_name varchar(255),
email varchar(255),
address varchar(255),
delivery_status bool,
primary key (id));

insert into warehouse(wName, address, volume) values 
("WC", "28 naufd stress, basdf ward, ha tinh province", 100000),
("WB", "28 naufd stress, basdf ward, ha tinh province", 150000);

insert into product values 
(1, "Samsung", "Galaxy Y", "logo192.png", 1000, 1, 1, 1, "64f95624880a0a5b708de026", '{"Brand": "Samsung", "Color":"red", "Weight":"2"}', 4, "2023-09-08 12:46:30"),
(2, "Iphone", "14Pro", "logo192.png", 1500, 0.2, 0.2, 0.2, "64f95624880a0a5b708de026", '{"Weight":"2"}', 4, "2023-09-08 12:46:35");

insert into product_inventory(product_id, warehouse_id, quantity, total_volume) values 
(1, 2, 200, 900),
(2, 2, 100, 0.02),
(1, 1, 100, 450);

insert into cart_items (`productId`, `quantity`, `customer_id`) values
(1, 3, 7);

insert into outbound_order (`total`, `customer_id`, `f_name`,`l_name`, `email`, `address`, `delivery_status`) values 
(3000, 7, "Thang", "Do", "thang@gmail.com", "123 Nguyen Van Linh", false);

select * from user;


drop view if exists product_volume;
create view product_volume as
	select id, length * height * width as volume from product;


drop procedure if exists deleteWarehouse;
delimiter &&
create procedure deleteWarehouse(in id int)
begin
	declare stock int;
    declare message varchar(225); 
    
	declare `_rollback` int default 0;
    declare CONTINUE HANDLER FOR SQLEXCEPTION set `_rollback` = 1;

    set session transaction isolation level serializable;
    start transaction;
		select count(*) into stock from warehouse join product_inventory
		on wId = warehouse_id
		where warehouse.wId = id;
        
		if stock = 0 then
		delete from warehouse where wId = id;
        set message = "Successfully delete!";
        else
        set message = "Warehouse is not empty!";
        end if;
        
		
        if `_rollback` = 1 then rollback;
        else commit;
        select message;
        end if;
end &&
delimiter ;



drop procedure if exists createWarehouse;
delimiter &&
create procedure createWarehouse(wname varchar(50), waddress varchar(225), wvolume int)
begin 
	declare message varchar(225); 
    
	declare `_rollback` int default 0;
    declare CONTINUE HANDLER FOR SQLEXCEPTION set `_rollback` = 1;
	
	set session transaction isolation level serializable;
    start transaction;
        
		insert into warehouse(wName, address, volume) values
        (wname, waddress, wvolume);
        set message = "Successfully create!";
         
		if `_rollback` = 1 then rollback;
        set message = "There is some error!";
        else commit;
        select message;
        end if;
end &&
delimiter ;


drop procedure if exists moveProduct;
delimiter &&
create procedure moveProduct(old_wid int, new_wid int, inventory int, product int, moveQuantity int)
begin
	declare product_volume double;
    declare exist_inventory int;
	declare message varchar(225);
    
	declare `_rollback` int default 0;
    declare CONTINUE HANDLER FOR SQLEXCEPTION set `_rollback` = 1;

	set session transaction isolation level serializable;
    start transaction;
    
    if(moveQuantity > (select quantity from product_inventory where id = inventory)) then 
    rollback;
    set message = "Please enter the correct quantity";
    else
    select volume into product_volume from product_volume where id = product; 
    -- inventory id of existing inventory of warehouse supposed to move into
    select id into exist_inventory from product_inventory where product = product_id and new_wid = warehouse_id;
    
    -- if yes then modify the existing inventory
    if exists(select * from product_inventory where product = product_id and new_wid = warehouse_id) then
        update product_inventory
        set quantity = quantity + moveQuantity, total_volume = total_Volume + product_volume*moveQuantity
        where id = exist_inventory;
        else
        insert into product_inventory(product_id, warehouse_id, quantity, total_volume) values 
        (product, new_wid, moveQuantity, product_volume*moveQuantity);
        end if;
        
		update product_inventory
        set quantity = quantity - moveQuantity, total_volume = total_Volume - product_volume*moveQuantity
        where id = inventory;
        
        if((select quantity from product_inventory where id = inventory) = 0) then
			delete from product_inventory where id = inventory;
		end if;
			set message = "Successfully move!";
        end if;
        
		if `_rollback` = 1 then rollback;
			set message = "Some errors occured!";
        else commit;
			select message;
        end if;
end &&
delimiter ;



drop view if exists available_space;
create view available_space as
	select wid, volume - sum(total_volume) as available
    from warehouse join product_inventory on wid = warehouse_id
    group by wid
    order by available desc;
    

drop procedure if exists insert_inbound;
delimiter &&
create procedure insert_inbound(pid int, wid int, pquantity int)
begin
	declare pvolume double;
    declare lastId int; 
    select volume into pvolume 
    from product_volume where id = pid;
    
	if exists(select * from product_inventory  
		where product_id = pid and warehouse_id = wid) then
        update product_inventory
        set quantity = quantity + pquantity, 
        total_volume = total_volume + pvolume*pquantity
        where product_id = pid and warehouse_id = wid;
        else 
        insert into product_inventory(product_id, warehouse_id, quantity, total_volume) values
        (pid, wid, pquantity, pvolume * pquantity);
        end if;

end && 
delimiter ;


drop procedure if exists inboundOrder;
delimiter &&
create procedure inboundOrder(pid int, pquantity int)
begin
    declare remaining int;
    declare wCount int;
    declare maxWarehouse int;
    declare put int;
    declare message varchar(225);
    
    set remaining = pquantity;
    set wCount = 0 ;
    
    repeat
    -- loop through sorted warehouse view
    set maxWarehouse = (select wid from available_space limit 0, 1);
    -- find the maximum quantity a warehouse can have by dividing the available space with the volume of a product unit, then round down
    set put = floor((select available from available_space where wid = maxWarehouse)/(select volume from product_volume where id = pid));
    -- insert into the warehouse
    if(remaining - put >= 0) then
    call insert_inbound(pid, maxWarehouse, put);
    set remaining = remaining - put;
	set wCount = wCount + 1;
    else
    call insert_inbound(pid, maxWarehouse, remaining);
    set remaining = 0;
    end if;
    until remaining = 0 or wCount = (select count(*) from available_space)
    end repeat;

	if remaining != 0 then
    set message = concat("There are ", remaining, " units cannot be placed into a warehouse");
    else
	set message = "Successfully place all units into warehouses";
    end if;
    
    select message;
end &&		
delimiter ;  

-- OPTIMIZATION FOR BROWSING
show indexes from product;

ALTER TABLE product
ADD INDEX idx_product_title (title);

ALTER TABLE product
ADD INDEX idx_product_description (description);

ALTER TABLE product
ADD INDEX idx_product_category (category);

-- ALTER TABLE product
-- PARTITION BY RANGE(price) (
--   PARTITION p0 VALUES LESS THAN 1000,
--   PARTITION p1 VALUES LESS THAN 2000,
--   PARTITION p2 VALUES LESS THAN 3000,
--   PARTITION p3 VALUES LESS THAN MAXVALUE
-- );

-- ORDER AND PLACED ORDER TRANSACTION
delimiter $$
create procedure placeOrder(total double, customer_id int, f_name varchar(255), l_name varchar(255), email varchar(255), address varchar(255), delivery_status bool)
begin

declare `_rollback` bool default 0;
declare continue handler for sqlexception set `_rollback` = 1;

start transaction;
SET TRANSACTION ISOLATION LEVEL SERIALIZABLE;

INSERT INTO outbound_order (`total`, `customer_id`, `f_name`, `l_name`, `email`, `address`, `delivery_status`) VALUES
(total, customer_id, f_name, l_name, email, address, delivery_status);

if `_rollback` then
	rollback;
else 
	commit;
end if;

end $$
delimiter ;

drop procedure if exists placeOrder;

select *, sum(c.quantity), sum(p.quantity) from product_inventory p join cart_items c on p.product_id = c.productId group by c.productId, p.product_id;



-- USER MANAGEMENT
select * from mysql.user;
-- ADMIN
create user 'admin'@'localhost' identified by 'admin';

ALTER USER 'admin'@'localhost' IDENTIFIED WITH mysql_native_password BY 'admin';
show databases;

create role admin_role;

grant select, insert, update, delete on lazada.warehouse to admin_role;
grant select, insert, update, delete on lazada.product_inventory to admin_role;
grant select, insert, update, delete on lazada.product to admin_role;

grant admin_role to 'admin'@'localhost';
set default role 'admin_role'@'%' to 'admin'@'localhost';
flush privileges;

-- SELLER
create user 'seller'@'localhost' identified by 'seller';

ALTER USER 'seller'@'localhost' IDENTIFIED WITH mysql_native_password BY 'seller';
show databases;

create role seller_role;

grant select, insert, update, delete on lazada.warehouse to seller_role;
grant select, insert, update, delete on lazada.product_inventory to seller_role;
grant select, insert, update, delete on lazada.product to seller_role;

grant seller_role to 'seller'@'localhost';
set default role 'seller_role'@'%' to 'seller'@'localhost';
flush privileges;

-- CUSTOMER
create user 'customer'@'localhost' identified by 'customer';

ALTER USER 'customer'@'localhost' IDENTIFIED WITH mysql_native_password BY 'customer';
show databases;

create role customer_role;

grant select, insert, update, delete on lazada.product_inventory to customer_role;
grant select, insert, update, delete on lazada.product to customer_role;
grant select, insert, update, delete on lazada.cart_items to customer_role;
grant select, insert, update, delete on lazada.outbound_order to customer_role;

grant customer_role to 'customer'@'localhost';
set default role 'customer_role'@'%' to 'customer'@'localhost';
flush privileges;
=======
drop procedure if exists getSellerProduct;
delimiter &&
create procedure getSellerProduct(sid int)
begin
    select id, title from product where sellerId = sid;
end &&
delimiter ;  

