--//-----------------------------//
-- User and User Bikes Join Table
--//-----------------------------//
create table user_bikes (
	user_bike_id SERIAL primary key,
	mfr_bike_id INTEGER NOT NULL,
	geo_id INTEGER NOT NULL,
	nick_name TEXT,
	image_location TEXT,
	date_created TIMESTAMP NOT NULL DEFAULT now(),
 	date_modified TIMESTAMP
);

ALTER TABLE user_bikes
  ADD COLUMN
    user_id INTEGER REFERENCES users(user_id)
    ON DELETE SET NULL;

--//-----------------------------//
-- positions and notes
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