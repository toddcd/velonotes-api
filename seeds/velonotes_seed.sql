
INSERT INTO users (user_name, full_name, height,nickname, password)
VALUES
  ('tcdavis', 'Todd Davis', 1.85 , null, '$2a$12$Q6nsqQAFAI3TkvhCTC8CmOBXT/Fi.XxGyhEAu3Jeq2yc3dRq6DVsy')


insert into mfr_bikes (make, model, year)
values ('Specialized', 'Crux', '2019');
insert into mfr_bikes (make, model, year)
values ('Specialized', 'Crux', '2018');
insert into mfr_bikes (make, model, year)
values ('Specialized', 'Tarmac', '2019');
insert into mfr_bikes (make, model, year)
values ('Specialized', 'Roubaix', '2019');
insert into mfr_bikes (make, model, year)
values ('Specialized', 'Camber', '2018');
insert into mfr_bikes (make, model, year)
values ('Felt', 'FX30', '2019');
insert into mfr_bikes (make, model, year)
values ('Chapter2', 'Tere', '2019');
insert into mfr_bikes (make, model, year)
values ('Giant', 'TCX Advanced', '2020');

--Giant TCX Advanced
insert into mfr_bikes_geometry (mfr_bike_id, size , seat_tube_length ,seat_tube_angle,top_tube_length,head_tube_length,head_tube_angle,rake,trail,wheelbase,chainstay,bb_drop,stack,reach,standover)
values(8, 'small',500,73.5,530,130,71,50,68,1014,430,60,540,370,783);

insert into mfr_bikes_geometry (mfr_bike_id, size , seat_tube_length ,seat_tube_angle,top_tube_length,head_tube_length,head_tube_angle,rake,trail,wheelbase,chainstay,bb_drop,stack,reach,standover)
values(8, 'medium',525,73,545,145,71.5,50,65,1019,430,60,556,375,803);

insert into mfr_bikes_geometry (mfr_bike_id, size , seat_tube_length ,seat_tube_angle,top_tube_length,head_tube_length,head_tube_angle,rake,trail,wheelbase,chainstay,bb_drop,stack,reach,standover)
values(8, 'medium-large',545,73,560,160,72,50,62,1030,430,60,572,385,821);

insert into mfr_bikes_geometry (mfr_bike_id, size , seat_tube_length ,seat_tube_angle,top_tube_length,head_tube_length,head_tube_angle,rake,trail,wheelbase,chainstay,bb_drop,stack,reach,standover)
values(8, 'large',555,73,575,175,72.5,50,59,1040,430,60,589,395,832);

insert into mfr_bikes_geometry (mfr_bike_id, size , seat_tube_length ,seat_tube_angle,top_tube_length,head_tube_length,head_tube_angle,rake,trail,wheelbase,chainstay,bb_drop,stack,reach,standover)
values(8, 'xlarge',565,73,590,190,72.5,50,59,1055,430,60,603,406,843);

-- Specialized Crux
insert into mfr_bikes_geometry (mfr_bike_id,size,reach,top_tube_length,stack,wheelbase,chainstay,front_center,bb_drop,bb_height,seat_tube_angle,head_tube_angle,seat_tube_length,head_tube_length,standover,rake)
values(1,'46',366,501,523,1007,425,592,71,281.5,75.5,69.5,470,100,763.5,50);

insert into mfr_bikes_geometry (mfr_bike_id,size,reach,top_tube_length,stack,wheelbase,chainstay,front_center,bb_drop,bb_height,seat_tube_angle,head_tube_angle,seat_tube_length,head_tube_length,standover,rake)
values(1,'49',369,509,540,1007,425,592,71,281.5,75.5,70.5,490,115,781.5,50);

insert into mfr_bikes_geometry (mfr_bike_id,size,reach,top_tube_length,stack,wheelbase,chainstay,front_center,bb_drop,bb_height,seat_tube_angle,head_tube_angle,seat_tube_length,head_tube_length,standover,rake)
values(1,'52',375,534,554,1008,425,593,71,281.5,74,71.5,510,125,794.5,50);

insert into mfr_bikes_geometry (mfr_bike_id,size,reach,top_tube_length,stack,wheelbase,chainstay,front_center,bb_drop,bb_height,seat_tube_angle,head_tube_angle,seat_tube_length,head_tube_length,standover,rake)
values(1,'54',382,550,566,1020,425,605,69,283.5,73.5,71.5,530,140,808.5,50);

insert into mfr_bikes_geometry (mfr_bike_id,size,reach,top_tube_length,stack,wheelbase,chainstay,front_center,bb_drop,bb_height,seat_tube_angle,head_tube_angle,seat_tube_length,head_tube_length,standover,rake)
values(1,'56',388,563,582,1026,425,611,69,283.5,73.25,72,550,155,824.5,50);

insert into mfr_bikes_geometry (mfr_bike_id,size,reach,top_tube_length,stack,wheelbase,chainstay,front_center,bb_drop,bb_height,seat_tube_angle,head_tube_angle,seat_tube_length,head_tube_length,standover,rake)
values(1,'58',395,578,597,1034,425,618,67,285.5,73,72.5,570,170,840.5,50);

insert into mfr_bikes_geometry (mfr_bike_id,size,reach,top_tube_length,stack,wheelbase,chainstay,front_center,bb_drop,bb_height,seat_tube_angle,head_tube_angle,seat_tube_length,head_tube_length,standover,rake)
values(1,'61',402,597,618,1043,425,627,67,285.5,72.5,73,600,190,861.5,50);


insert into user_bikes(user_id, mfr_bike_id, geo_id)
values(1, 8,(select geo_id from mfr_bikes_geometry where "size" = 'large' ))

-- Test Data Bike 1
insert into user_bike_positions(user_bike_id,"name",description,active,stem,stem_angle,handlebar,crank,seat,seat_height,handlebar_reach,handlebar_drop,setback)
values(1,'cyclocross','cross setup',false,100,6,42,175,143,805,595,90,110 );

insert into user_bike_positions(user_bike_id,"name",description,active,stem,stem_angle,handlebar,crank,seat,seat_height,handlebar_reach,handlebar_drop,setback)
values(1,'road','road setup',true,120,6,42,175,143,805,595,110,110 );

insert into user_bike_notes(user_bike_id, note_type, note)
values(1, 'setup','tire pressure at 20psi front and 24psi rear');

insert into user_bike_notes(user_bike_id, note_type, note)
values(1, 'maintenance','replaced chain');

insert into user_bike_notes(user_bike_id, note_type, note)
values(1, 'maintenance','replaced shift cables');

-- Test Data Bike 2
insert into user_bikes(user_id, mfr_bike_id, geo_id)
values(1, 1,(select geo_id from mfr_bikes_geometry where "size" = '58' ));

insert into user_bike_positions(user_bike_id,"name",description,active,stem,stem_angle,handlebar,crank,seat,seat_height,handlebar_reach,handlebar_drop,setback)
values(2,'gravel','gravel setup',false,100,6,42,175,143,805,595,90,110 );

insert into user_bike_positions(user_bike_id,"name",description, active,stem,stem_angle,handlebar,crank,seat,seat_height,handlebar_reach,handlebar_drop,setback)
values(2,'road','rain bike setup',true,120,6,42,175,143,805,595,110,110 );

insert into user_bike_notes(user_bike_id, note_type, note)
values(2, 'setup','installed new full fenders');

insert into user_bike_notes(user_bike_id, note_type, note)
values(2, 'maintenance','replaced rear tire');

insert into user_bike_notes(user_bike_id, note_type, note)
values(2, 'maintenance','replaced bar tape');