Create database testdb;
drop database testdb;
use testdb;

Select * from user;
Select * from user_profile;
Select * from agent;
Select * from office;
Select * from property;
Select * from performance;
Select * from transaction;
Select * from notification;
Select * from images;
Select * from listing_token;

select * from images i join property p on p.id = i.pid;

-- 1  
SELECT p.id pid,p.city,p.type,p.year_built,lt.id Listing_Token FROM property p
JOIN listing_token lt ON p.id = lt.property_id
where p.city = "Mumbai"
 AND lt.list_type = 'RENT'
 AND p.year_built > 2010;
 
SELECT * FROM property p
JOIN listing_token lt ON p.id = lt.property_id
where p.city = "Mumbai"
 AND lt.list_type = 'RENT'
 AND p.year_built > 2010;
 
 -- 2
 
SELECT * FROM property p
JOIN listing_token lt ON p.id = lt.property_id
WHERE p.city = 'Mumbai' AND lt.price BETWEEN 2000000 AND 6000000;
 
SELECT p.id, p.house_no, p.area, p.locality, p.city, lt.price 
FROM property p
JOIN listing_token lt ON p.id = lt.property_id
WHERE p.city = 'Mumbai' 
  AND lt.price BETWEEN 2000000 AND 6000000;
  
  
-- 3
SELECT p.house_no, p.area, p.locality, p.city 
FROM property p
JOIN listing_token lt ON p.id = lt.property_id
WHERE p.locality = 'G.S.Road' 
  AND lt.list_type = 'RENT'
  AND p.bhk >= 2 
  AND lt.price < 15000;
  
SELECT p.house_no, p.area, p.locality, p.city, lt.price 
FROM property p
JOIN listing_token lt ON p.id = lt.property_id
WHERE p.locality = 'Andheri' 
  AND lt.list_type = 'RENT'
  AND p.bhk >= 2 
  AND lt.price < 50000;
  
-- 4
SELECT up.name, SUM(t.amount) AS total_sales
FROM user_profile up
JOIN agent a ON up.user_id = a.agent_id
JOIN transaction t ON a.agent_id = t.agent_id
WHERE YEAR(t.transaction_date) = 2023
GROUP BY a.agent_id, up.name
ORDER BY total_sales DESC
LIMIT 1;

SELECT up.name, SUM(t.amount) AS total_sales
FROM user_profile up
JOIN agent a ON up.user_id = a.agent_id
JOIN transaction t ON a.agent_id = t.agent_id
WHERE YEAR(t.transaction_date) = 2023
GROUP BY a.agent_id, up.name
ORDER BY total_sales DESC
LIMIT 1;

-- 5
SELECT a.agent_id, 
    AVG(t.amount) AS avg_selling_price, 
    AVG(DATEDIFF(t.transaction_date, lt.listing_date)) AS avg_days_on_market 
FROM agent a 
LEFT JOIN transaction t 
    ON a.agent_id = t.agent_id 
    AND YEAR(t.transaction_date) = 2023 
LEFT JOIN listing_token lt 
    ON t.token_id = lt.id 
GROUP BY a.agent_id;

-- 6
SELECT p.*, lt.price 
FROM property p
JOIN listing_token lt ON p.id = lt.property_id
WHERE lt.list_type = 'RENT'
  AND lt.price = (SELECT MAX(price) FROM listing_token WHERE list_type = 'RENT' AND status = 'ACTIVE');
  
  