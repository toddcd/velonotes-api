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