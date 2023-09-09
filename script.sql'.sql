create database lazada;
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
id int auto_increment unique,
title varchar(225),
description varchar(225),
price double,
length double,
width double,
height double,
category varchar(45),
properties json,
primary key (id));

create table product_inventory (
id int auto_increment unique,
product_id int,
warehouse_id int,
quantity int not null,
total_volume double,
primary key (id),
foreign key (warehouse_id) references warehouse(wId),
foreign key (product_id) references product(id) );

insert into warehouse(wName, address, volume) values 
("WC", "28 naufd stress, basdf ward, ha tinh province", 100000),
("WB", "28 naufd stress, basdf ward, ha tinh province", 150000);

insert into product(title, description, price, length, width, height) values 
("Table", "A sturdy table", 1000, 3, 1.5, 1),
("Smartphone", "A smartphone by samsung", 1000, 0.2, 0.1, 0.01),
("Tablet", "A tablet by samsung", 1500, 0.25, 0.2, 0.02);

insert into product_inventory(product_id, warehouse_id, quantity, total_volume) values 
(1, 2, 200, 900),
(2, 2, 100, 0.02),
(1, 1, 100, 450);

SELECT i.id, p.title, w.wName, i.product_id, i.quantity FROM warehouse w JOIN product_inventory i ON  w.wId = i.warehouse_id JOIN product p ON i.product_id = p.id WHERE wId = 3;
select * from warehouse;

select * from warehouse;
select * from product;

create view product_volume as
	select id, length * height * width as volume from product;
drop view product_volume;

drop procedure deleteWarehouse;
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

call deleteWarehouse(2);
select @mess;

drop procedure createWarehouse;
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

drop procedure moveProduct;

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

select * from product_inventory order by warehouse_id;
call moveProduct(2, 1, 1, 1, 10);
select * from product_inventory order by warehouse_id;
delete from product_inventory where id = 5;


create view available_space as
	select wid, volume - sum(total_volume) as available
    from warehouse join product_inventory on wid = warehouse_id
    group by wid
    order by available desc;
    
drop view available_space;    
select * from available_space;
select * from available_space limit 0, 1;

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

drop procedure insert_inbound;

drop procedure inboundOrder;
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


select * from product_inventory;
call inboundOrder(1, 100000);
select * from available_space;

delete from product_inventory where id = 25;