drop table mfr_bikes_geometry


--//-----------------------------//
-- Step One: User info
--//-----------------------------//
CREATE TABLE users (
  user_id SERIAL PRIMARY KEY,
  user_name TEXT NOT NULL UNIQUE,
  full_name TEXT NOT NULL,
  password TEXT NOT NULL,
  nickname TEXT,
  height numeric,
  inseam numeric,
  date_created TIMESTAMP NOT NULL DEFAULT now(),
  date_modified TIMESTAMP
);

--//-----------------------------//
-- Step Two: User and User Bikes Join Table
--//-----------------------------//
create table user_bikes (
	user_bike_id SERIAL primary key,
	mfr_bike_id INTEGER NOT NULL,
	geo_id INTEGER NOT NULL,
	date_created TIMESTAMP NOT NULL DEFAULT now(),
 	date_modified TIMESTAMP
);

ALTER TABLE user_bikes
  ADD COLUMN
    user_id INTEGER REFERENCES users(user_id)
    ON DELETE SET NULL;

   select * from user_bikes
--//-----------------------------//
-- Step 3: User Bikes, positions and notes
--//-----------------------------//
create table user_bike_positions (
 	position_id SERIAL primary key,
 	name text,
 	description text,
 	active boolean,
 	stem numeric,
 	stem_angle numeric,
 	handlebar numeric,
 	handlebar_bend text,
 	crank numeric,
 	crank_q numeric,
 	seat numeric,
 	seat_height numeric,
 	handlebar_reach numeric,
 	handlebar_drop numeric,
 	setback numeric,
	date_created TIMESTAMP NOT NULL DEFAULT now(),
 	date_modified TIMESTAMP
);

ALTER TABLE user_bike_positions
  ADD COLUMN
    user_bike_id INTEGER REFERENCES user_bikes(user_bike_id)
    ON DELETE SET NULL;

create table user_bike_notes (
	note_id SERIAL primary key,
 	note_type text,
 	note text,
 	date_created TIMESTAMP NOT NULL DEFAULT now(),
 	date_modified TIMESTAMP
);

ALTER TABLE user_bike_notes
  ADD COLUMN
    user_bike_id INTEGER REFERENCES user_bikes(user_bike_id)
    ON DELETE SET NULL;

--//-----------------------------//
--Manufacturer Bikes and Geometry
--//-----------------------------//
create table mfr_bikes (
	mfr_bike_id SERIAL PRIMARY KEY,
	make text not null,
	model text not null,
	year text not null,
	date_created TIMESTAMP NOT NULL DEFAULT now(),
  	date_modified TIMESTAMP
);

create table mfr_bikes_geometry (
	geo_id SERIAL PRIMARY KEY,
	size text not null,
	reach numeric,
	stack numeric,
	top_tube_length numeric,
	head_tube_length numeric,
	head_tube_angle numeric,
	seat_tube_length numeric,
	seat_tube_angle numeric,
	wheelbase numeric,
	chainstay numeric,
	front_center numeric,
	bb_drop numeric,
	bb_height numeric,
	standover numeric,
	fork_length numeric,
	rake numeric,
	trail numeric,
	date_created TIMESTAMP NOT NULL DEFAULT now(),
  	date_modified TIMESTAMP
);

ALTER TABLE mfr_bikes_geometry
  ADD COLUMN
    mfr_bike_id INTEGER REFERENCES mfr_bikes(mfr_bike_id)
    ON DELETE SET NULL;
