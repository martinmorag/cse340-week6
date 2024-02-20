-- Task One - Write SQL Statements

-- Adding Tony Stark data
INSERT INTO public.inventory (
    account_firstname,
    account_lastname,
    account_email,
    account_password
  )
VALUES (
    'Tony',
    'Stark',
    'tony@starkent.com', 
    'Iam1ronM@n'
  );

-- Updating the account.type
UPDATE public.account
SET account_type = 'Admin'
WHERE account_id = 1;

-- Deleting Tony Stark from the database
DELETE from public.account
WHERE account_id = 1;

-- Modify the "GH Hummer"
UPDATE public.inventory
SET inv_description = 'Do you have 6 kids and like to go offroading? The Hummer gives you the a huge interior with an engine to get you out of any muddy or rocky situation.'
WHERE inv_id = 10;

-- Use an inner join
SELECT
    inv_make,
    inv_model,
    classification_name
FROM 
    public.inventory
INNER JOIN public.classification
    ON public.inventory.classification_id = public.classification.classification_id
WHERE public.classification.classification_name = 'Sport';

-- Update all records
UPDATE
	public.inventory
SET
	inv_image = REPLACE 
		(inv_image, '/images/', '/images/vehicles/');
UPDATE
	public.inventory
SET
	inv_thumbnail = REPLACE 
		(inv_thumbnail, '/images/', '/images/vehicles/');


-- Task Two - Destroy and Rebuild the Database


-- Update all records
UPDATE
	public.inventory
SET
	inv_image = REPLACE 
		(inv_image, '/images/', '/images/vehicles/');
UPDATE
	public.inventory
SET
	inv_thumbnail = REPLACE 
		(inv_thumbnail, '/images/', '/images/vehicles/');