INSERT INTO e1 (name,age)
values
("Anmol" , 20),
("Singh" , 30),
("meena" , 22);


INSERT INTO e2 (gender,num)
values
("Anmol" , 20),
("Singh" , 30),
("meena" , 22);


INSERT INTO user (username,email,password,provider_type) VALUES
('anmol','anmol@gmail.com','$2a$10$5s9xbuNG60CXT0S7SxLyY.jpFJhFOduZQiOwQg8r7UmheqrG5znu6','EMAIL'),
('rahul','rahul@gmail.com','$2a$10$5s9xbuNG60CXT0S7SxLyY.jpFJhFOduZQiOwQg8r7UmheqrG5znu6','EMAIL'),
('aman','aman@gmail.com','$2a$10$5s9xbuNG60CXT0S7SxLyY.jpFJhFOduZQiOwQg8r7UmheqrG5znu6','EMAIL'),
('rohit','rohit@gmail.com','$2a$10$5s9xbuNG60CXT0S7SxLyY.jpFJhFOduZQiOwQg8r7UmheqrG5znu6','EMAIL'),
('neha','neha@gmail.com','$2a$10$5s9xbuNG60CXT0S7SxLyY.jpFJhFOduZQiOwQg8r7UmheqrG5znu6','EMAIL'),
('pooja','pooja@gmail.com','$2a$10$5s9xbuNG60CXT0S7SxLyY.jpFJhFOduZQiOwQg8r7UmheqrG5znu6','EMAIL'),
('vikas','vikas@gmail.com','$2a$10$5s9xbuNG60CXT0S7SxLyY.jpFJhFOduZQiOwQg8r7UmheqrG5znu6','EMAIL'),
('ramesh','ramesh@gmail.com','$2a$10$5s9xbuNG60CXT0S7SxLyY.jpFJhFOduZQiOwQg8r7UmheqrG5znu6','EMAIL'),
('suresh','suresh@gmail.com','$2a$10$5s9xbuNG60CXT0S7SxLyY.jpFJhFOduZQiOwQg8r7UmheqrG5znu6','EMAIL'),
('deepak','deepak@gmail.com','$2a$10$5s9xbuNG60CXT0S7SxLyY.jpFJhFOduZQiOwQg8r7UmheqrG5znu6','EMAIL'),
('office_delhi','office.delhi@realestate.com','$2a$10$5s9xbuNG60CXT0S7SxLyY.jpFJhFOduZQiOwQg8r7UmheqrG5znu6','EMAIL'),
('office_mumbai','office.mumbai@realestate.com','$2a$10$5s9xbuNG60CXT0S7SxLyY.jpFJhFOduZQiOwQg8r7UmheqrG5znu6','EMAIL'),
('singh','anmol24@gmail.com','$2a$10$5s9xbuNG60CXT0S7SxLyY.jpFJhFOduZQiOwQg8r7UmheqrG5znu6','EMAIL'),
('deepika','deepika@gmail.com','$2a$10$5s9xbuNG60CXT0S7SxLyY.jpFJhFOduZQiOwQg8r7UmheqrG5znu6','EMAIL');


INSERT INTO user_profile
(user_id,name,phone,profileurl,area,city,pin,user_type)
VALUES
(1,'Anmol',9876543210,'url1','Connaught','Delhi',110001,'USER'),
(2,'Rahul',9876543211,'url2','Andheri','Mumbai',400053,'AGENT'),
(3,'Aman',9876543212,'url3','Whitefield','Bangalore',560001,'AGENT'),
(4,'Rohit',9876543213,'url4','Navrang','Ahmedabad',380001,'USER'),
(5,'Neha',9876543214,'url5','T Nagar','Chennai',600001,'USER'),
(6,'Pooja',9876543215,'url6','MG Road','Delhi',110002,'USER'),
(7,'Vikas',9876543216,'url7','Koregaon','Pune',411001,'USER'),
(8,'Ramesh',9876543217,'url8','Banjara','Hyderabad',500001,'USER'),
(9,'Suresh',9876543218,'url9','Sector 18','Noida',201301,'USER'),
(10,'Deepak',9876543219,'url10','Salt Lake','Kolkata',700001,'USER'),
(11,'Delhi Office',9898878005,'office1','Connaught','Delhi',110001,'OFFICE'),
(12,'Mumbai Office',9752658881,'office2','Andheri','Mumbai',400053,'OFFICE'),
(13,'AKS',9752658881,'admin_url','Andheri','Mumbai',400053,'ADMIN'),
(14,'Deepika',9876543219,'url10','Salt Lake','Kolkata',700001,'USER');

INSERT INTO office (office_id,office_name,location,office_number)
VALUES
(11,'Delhi Office','New Delhi',9898878005),
(12,'Mumbai Office','Mumbai',9752658881);

INSERT INTO agent
(agent_id,commission_rate,licence_number,experience,status,office_id)
VALUES
(2,4.5,'LIC1001',5,'ACTIVE',11),
(3,3.8,'LIC1002',3,'ACTIVE',12);

INSERT INTO property
(house_no,locality,area,city,pin,size,type,bhk,year_built,owner_id,office_id)
VALUES
('A101','Connaught','Central','Delhi',110001,1200,'FLAT',2,2018,7,11),
('B201','Andheri','West','Mumbai',400053,1500,'APARTMENT',3,2020,8,12),
('C301','Whitefield','IT','Bangalore',560001,1400,'FLAT',4,2019,9,11),
('D401','MG Road','Central','Delhi',110002,1000,'FLAT',5,2017,10,12),
('E501','Sector 18','Central','Noida',201301,1300,'FLAT',6,2016,14,11);

INSERT INTO listing_token
(list_type,price,description,status,pid,aid)
VALUES
('SELL',5000000,'Luxury Flat','ACTIVE',1,2),
('RENT',20000,'Nice Apartment','ACTIVE',2,3),
('SELL',7500000,'Villa','ACTIVE',3,2),
('SELL',3500000,'2BHK','ACTIVE',4,3);

INSERT INTO performance
(deals,total_sales,score,user_rating,deals_left,aid)
VALUES
(10,5000000,8.5,4.5,2,2),
(8,3000000,7.5,4.0,1,3);

INSERT INTO images (url,pid)
VALUES
('https://img1.com',1),
('https://img2.com',1),
('https://img3.com',2),
('https://img4.com',3),
('https://img5.com',4);

INSERT INTO notification
(message,type,status,sender_id,receiver_id)
VALUES
('Property viewed','GENERAL','READ',1,2),
('Offer placed','GENERAL','UNREAD',2,1),
('New listing','PROPERTY','READ',3,4),
('Meeting scheduled','PROPERTY','UNREAD',2,5);


INSERT INTO transaction
(amount,type,mode,aid,token_id,buyer_id)
VALUES
(5000000,'FULL','ONLINE',2,1,1),
(20000,'ADVANCE','CARD',3,2,4),
(7500000,'ADVANCE','ONLINE',2,3,5),
(3500000,'FULL','BANK_TRANSFER',3,4,6);