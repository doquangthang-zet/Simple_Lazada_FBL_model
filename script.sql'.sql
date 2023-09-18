create database if not exists lazada;
use lazada;

drop table if exists product, user, warehouse, product_inventory, cart_items, outbound_order, delivery_items;
CREATE TABLE `lazada`.`user` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `role` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`));

drop table if exists warehouse;
create table warehouse (
wId int auto_increment unique,
wName varchar(50) unique,
address varchar(225),
volume double,
primary key (wId));

drop table if exists product;
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

drop table if exists product_inventory;
create table product_inventory (
id int auto_increment unique,
product_id int,
warehouse_id int,
quantity int not null,
total_volume double,
primary key (id),
foreign key (warehouse_id) references warehouse(wId),
foreign key (product_id) references product(id));

drop table if exists cart_items;
create table cart_items (
id int unique auto_increment,
productId int,
quantity int,
customer_id int,
primary key (id),
foreign key (productId) references product(id),
foreign key (customer_id) references user(id));

drop table if exists outbound_order;
create table outbound_order (
id int unique auto_increment,
total double,
customer_id int,
f_name varchar(255),
l_name varchar(255),
email varchar(255),
address varchar(255),
delivery_status varchar(45),
primary key (id),
foreign key (customer_id) references user(id));

drop table if exists delivery_items;
create table delivery_items (
id int unique auto_increment,
productId int,
quantity int,
order_id int,
warehouse_id int,
primary key (id),
foreign key (warehouse_id) references warehouse(wId),
foreign key (productId) references product(id),
foreign key (order_id) references outbound_order(id));

insert into warehouse(wName, address, volume) values 
("WC", "28 Nguyen Van Linh stress, 7 ward, hochiminh city", 100000),
("WB", "30 Group 7 stress, database ward, rmit province", 150000);

insert into product values 
(1, "Samsung", "Galaxy Y", "image-1694334658666.iphone-14-pro-model-unselect-gallery-2-202209.jpg", 1000, 0.9, 1, 1, "64f95624880a0a5b708de026", '{"Brand": "Samsung", "Color":"red", "Weight":"2"}', 4, "2023-09-08 12:46:30"),
(2, "Iphone", "14Pro", "image-1694334658666.iphone-14-pro-model-unselect-gallery-2-202209.jpg", 1500, 0.5, 1, 1, "64f95624880a0a5b708de026", '{"Weight":"2"}', 4, "2023-09-08 12:46:35"),
(3, "Oppo", "neo 5", "image-1694334658666.iphone-14-pro-model-unselect-gallery-2-202209.jpg", 1500, 2, 2, 2, "64f95624880a0a5b708de026", '{"Weight":"2"}', 4, "2023-09-08 12:46:39");

insert into product_inventory(product_id, warehouse_id, quantity, total_volume) values 
(1, 2, 200, 180),
(2, 2, 101, 50.5),
(3, 2, 100, 600),
(1, 1, 100, 100);

-- View store products and their volume
drop view if exists product_volume;
create view product_volume as
	select id, length * height * width as volume from product;

-- Procedure to delete warehouse
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

-- Procedure to create new warehouse
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

-- Procedure to move product between warehouse
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

-- View store available space of all warehouse
drop view if exists available_space;
create view available_space as
	select wid, volume - sum(total_volume) as available
    from warehouse join product_inventory on wid = warehouse_id
    group by wid
    order by available desc;

-- Procedure to insert inbound order to appropriate table
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

-- Inbound procedure to create inbound order
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

drop procedure if exists getSellerProduct;
delimiter &&
create procedure getSellerProduct(sid int)
begin
    select id, title from product where sellerId = sid;
end &&
delimiter ;  


-- ORDER AND PLACED ORDER PROCETURE AND FUNCTION AND TRIGGER
-- Function to check each product quantity
drop function if exists check_inventory_quantity;
delimiter $$
create function check_inventory_quantity(pid int, pquantity int)
returns bool reads sql data
begin
	declare in_check bool;

    if ((select sum(quantity) from product_inventory where product_id = pid) >= pquantity) then
		set in_check = 1;
        else set in_check = 0;
        end if;
	return in_check;
end $$
delimiter ;

-- Checkout procedure to check valid product and remove the invalid ones from cart items
drop procedure if exists checkout;
delimiter $$
create procedure checkout(customerId int) 
begin
	declare item_count int default 0;
    declare itemId int;
    declare itemQuantity int;
    declare pid int;
    declare `_rollback` bool default 0;
	declare continue handler for sqlexception set `_rollback` = 1;
    
set session transaction isolation level serializable;
start transaction;

    repeat
		set itemId = (select id from cart_items where customer_id = customerId 
					group by id order by id limit item_count, 1);                    
		set itemQuantity = (select quantity from cart_items where customer_id = customerId and id = itemId);
        set pid = (select productId from cart_items where id= itemId);
		if (check_inventory_quantity(pid, itemQuantity) = 0) then 
			delete from cart_items where id = itemId;
		else 
			set item_count = item_count + 1;
		end if;
	until item_count = (select count(*) from cart_items where customer_id = customerId)
	end repeat;
            
	if `_rollback` then
		rollback;
	else 
		commit;
	end if;
end $$
delimiter ;

-- Place order procedure
drop procedure if exists placeOrder;
delimiter $$
create procedure placeOrder(total double, customer_id int, f_name varchar(255), l_name varchar(255), email varchar(255), address varchar(255), delivery_status varchar(45)) 
begin
	declare item_count int default 0;
    declare orderId int;
    declare itemId int;
    declare itemQuantity int;
    declare pid int;
    declare maxWhItemId int;
    declare maxWhId int;
    declare maxWhItemQuantity int;
    
    declare remainItem int;
    declare `_rollback` bool default 0;
	declare continue handler for sqlexception set `_rollback` = 1;

set session transaction isolation level serializable;
start transaction;

	INSERT INTO outbound_order (`total`, `customer_id`, `f_name`, `l_name`, `email`, `address`, `delivery_status`) VALUES
		(total, customer_id, f_name, l_name, email, address, delivery_status);
    
    set orderId = (select id from outbound_order where outbound_order.customer_id = customer_id order by id desc limit 0,1);
    
    repeat
		set itemId = (select id from cart_items where cart_items.customer_id = customer_id limit item_count, 1);                    
		set itemQuantity = (select quantity from cart_items where cart_items.customer_id = customer_id and id = itemId);
        set remainItem = itemQuantity;
        set pid = (select productId from cart_items where id = itemId);
		
        repeat
			set maxWhItemId = (select id from product_inventory where product_id = pid order by quantity desc limit 0,1);
			set maxWhId = (select warehouse_id from product_inventory where product_id = pid order by quantity desc limit 0,1);
			set maxWhItemQuantity = (select quantity from product_inventory where product_id = pid order by quantity desc limit 0,1);
			
			if maxWhItemQuantity >= remainItem then
				INSERT INTO delivery_items (`productId`,`quantity`,`order_id`,`warehouse_id`) values (pid, remainItem, orderId, maxWhId);
				update product_inventory set quantity = maxWhItemQuantity - remainItem where id = maxWhItemId;
                set remainItem = 0;
			else 
				set remainItem = itemQuantity - maxWhItemQuantity;
                INSERT INTO delivery_items (`productId`,`quantity`,`order_id`,`warehouse_id`) values (pid, maxWhItemQuantity, orderId, maxWhId);
				update product_inventory set quantity = 0 where id = maxWhItemId;
			end if;
        until remainItem = 0
        end repeat;
        
        set item_count = item_count + 1;
	until item_count = (select count(*) from cart_items where cart_items.customer_id = customer_id)
	end repeat;
    
	if `_rollback` then
		rollback;
	else 
		commit;
	end if;
end $$
delimiter ;

-- Accept delivery procedure
drop procedure if exists acceptDelivery;
delimiter $$
create procedure acceptDelivery(orderId int)
begin
	declare count int default 0;
	declare warehouseId int;
    declare proId int;

	repeat 
		set warehouseId = (select warehouse_id from delivery_items where order_id = orderId limit count, 1);
		set proId = (select productId from delivery_items where order_id = orderId limit count, 1);
        
		update product_inventory set total_volume = product_inventory.quantity * (select volume from product_volume where id = proId) where warehouse_id = warehouseId and product_id = proId;
		
		set count = count + 1;
    until count = (select count(*) from delivery_items where order_id = orderId)
    end repeat;
end $$
delimiter ;



-- Reject procedure
drop procedure if exists rejectDelivery;
delimiter $$
create procedure rejectDelivery(orderId int)
begin
	declare count int default 0;
	declare warehouseId int;
    declare itemId int;
    declare itemQuantity int;
    declare itemVolume int;

	repeat 
		set warehouseId = (select warehouse_id from delivery_items where order_id = orderId limit count, 1);
		set itemQuantity = (select quantity from delivery_items where order_id = orderId limit count, 1);
		set itemId = (select productId from delivery_items where order_id = orderId limit count, 1);
		set itemVolume = (select volume from product_volume where id = itemId);
		set itemQuantity = (select quantity from delivery_items where order_id = orderId limit count, 1);
		
		update product_inventory set quantity = quantity + itemQuantity where warehouse_id = warehouseId and product_id = itemId;
		
		set count = count + 1;
    until count = (select count(*) from delivery_items where order_id = orderId)
    end repeat;
end $$
delimiter ;

-- trigger delivery
drop trigger if exists delivery;
delimiter $$
create trigger delivery after update on outbound_order for each row
begin

	if new.delivery_status = "accept" then
		call acceptDelivery(new.id);
	elseif new.delivery_status = "reject" then
		call rejectDelivery(new.id);
    end if;

    delete from cart_items where cart_items.customer_id = new.customer_id;
    delete from delivery_items where order_id = new.id;
end $$
delimiter ;

-- OPTIMIZATION FOR BROWSING
ALTER TABLE product
ADD INDEX idx_product_title (title);

ALTER TABLE product
ADD INDEX idx_product_description (description);

ALTER TABLE product
ADD INDEX idx_product_category (category);

ALTER TABLE product
ADD INDEX idx_product_price (price);

ALTER TABLE product
ADD INDEX idx_product_createdDate (createdAt);

-- USER MANAGEMENT
-- ADMIN
drop user if exists 'admin'@'localhost';
create user 'admin'@'localhost' identified by 'admin';

ALTER USER 'admin'@'localhost' IDENTIFIED WITH mysql_native_password BY 'admin';

drop role if exists admin_role;
create role admin_role;

grant select, insert, update, delete on lazada.warehouse to admin_role;
grant select, insert, update, delete on lazada.product_inventory to admin_role;
grant select, insert, update, delete on lazada.product to admin_role;
grant select, insert, update, delete on lazada.product_volume to admin_role;
grant select, insert, update, delete on lazada.available_space to admin_role;
grant select, insert, update, delete on lazada.cart_items to admin_role;
grant select, insert, update, delete on lazada.outbound_order to admin_role;
grant select, insert, update, delete on lazada.delivery_items to admin_role;
grant execute on procedure moveProduct to admin_role;
grant execute on procedure deleteWarehouse to admin_role;
grant execute on procedure createWarehouse to admin_role;
grant execute on procedure selectWarehouse to admin_role;
-- grant execute on procedure checkout to admin_role;
-- grant execute on procedure placeOrder to admin_role;
-- grant execute on procedure acceptDelivery to admin_role;
-- grant execute on procedure rejectDelivery to admin_role;

grant admin_role to 'admin'@'localhost';
set default role 'admin_role'@'%' to 'admin'@'localhost';
flush privileges;

-- SELLER
drop user if exists 'seller'@'localhost';
create user 'seller'@'localhost' identified by 'seller';

ALTER USER 'seller'@'localhost' IDENTIFIED WITH mysql_native_password BY 'seller';

drop role if exists seller_role;
create role seller_role;

grant select, insert, update, delete on lazada.product to seller_role;
grant select, insert, update, delete on lazada.product_volume to seller_role;
grant execute on procedure getSellerProduct to seller_role;
-- grant execute on procedure inboundOrder to seller_role;
-- grant execute on procedure insert_inbound to seller_role;

grant seller_role to 'seller'@'localhost';
set default role 'seller_role'@'%' to 'seller'@'localhost';
flush privileges;

-- CUSTOMER
drop user if exists 'customer'@'localhost';
create user 'customer'@'localhost' identified by 'customer';

ALTER USER 'customer'@'localhost' IDENTIFIED WITH mysql_native_password BY 'customer';

drop role if exists customer_role;
create role customer_role;

grant select on lazada.product to customer_role;
grant select, insert, update, delete on lazada.cart_items to customer_role;

grant customer_role to 'customer'@'localhost';
set default role 'customer_role'@'%' to 'customer'@'localhost';
flush privileges;
