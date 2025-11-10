-- Question 1
INSERT INTO public.account
	(account_firstname, account_lastname,
	 account_email, account_password
	 )
 VALUES 
 	('Tony', 'Stark', 'tony@starkent.com',
	 'Iam1ronM@n');

--Question 2
-- Update Tony Stark account_type to'Admin' type
UPDATE public.account
SET account_type = 'Admin'
WHERE account_id = 1;

-- Question 3
-- Delete Tony Stark Record for table 'account'
DELETE FROM public.account
WHERE account_id = 1;


-- Question 4
UPDATE public.inventory
SET inv_description = REPLACE(inv_description,
'small interiors',
'a huge interior')
WHERE inv_make = 'GM' AND inv_model = 'Hummer';

-- OR

UPDATE public.inventory
SET inv_description = REPLACE(inv_description,
'small interiors', 'a huge interior')
WHERE CONCAT(inv_make, ' ', inv_model) = 'GM Hummer';


-- Question 5
SELECT inv_make, inv_model, classification_name
FROM public.inventory i
	INNER JOIN public.classification c
	ON i.classification_id = c.classification_id
WHERE 	c.classification_name = 'Sport';


-- Question 6
UPDATE public.inventory
SET
	inv_image = REPLACE(inv_image, '/images', '/images/vehicles'),
	inv_thumbnail = REPLACE(inv_thumbnail, '/images', '/images/vehicles');