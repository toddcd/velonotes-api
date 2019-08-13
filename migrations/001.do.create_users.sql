drop table IF EXISTS user_bike_positions;
drop table IF EXISTS user_bike_notes;
drop table IF EXISTS user_bikes;
drop table IF EXISTS mfr_bikes_geometry;
drop table IF EXISTS mfr_bikes;
drop table IF EXISTS users

--//-----------------------------//
-- User info
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



