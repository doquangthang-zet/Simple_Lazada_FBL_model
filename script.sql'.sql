create database lazada;
use lazada;

drop table if exists warehouse, product_inventory, product;
create table warehouse (
wId int unique,
wName varchar(50),
address varchar(225),
volume double,
primary key (wId));

create table product (
id int unique,
title varchar(225),
description varchar(225),
price double,
length double,
width double,
height double,
primary key (id));

create table product_inventory (
id int unique,
product_id int,
warehouse_id int,
quantity int,
primary key (id),
foreign key (warehouse_id) references warehouse(wId),
foreign key (product_id) references product(id) );

insert into warehouse values 
(3, "WC", "28 naufd stress, basdf ward, ha tinh province", 100000),
(2, "WB", "28 naufd stress, basdf ward, ha tinh province", 150000);

insert into product values 
(345, "Smartphone", "A smartphone by samsung", 1000, 0.2, 0.1, 0.01),
(332, "Tablet", "A tablet by samsung", 1500, 0.25, 0.2, 0.02);

insert into product_inventory values 
(375, 345, 1, 100),
(315, 345, 2, 100),
(395, 332, 1, 100);

select * from warehouse join product_inventory
where warehouse.wName = "WB";
select * from warehouse;
select * from product_inventory;

select count(quantity) from warehouse join product_inventory
on wId = warehouse_id
where warehouse.wName = "WC";

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