create table baskets( 
    id serial not null primary key,
    fruit_name text not null,
    quantity int,
    price int,
    basket varchar(50)not null
);

insert into baskets (fruit_name,quantity,price,basket) values ('Apple',1,3,'A');
insert into baskets(fruit_name,quantity,price,basket) values ('Banana',1,4,'A');
insert into baskets(fruit_name,quantity,price,basket) values ('Orange',1,2,'A');
insert into baskets(fruit_name,quantity,price,basket) values ('Orange',1,6,'B');

