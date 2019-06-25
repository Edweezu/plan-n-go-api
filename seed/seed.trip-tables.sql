TRUNCATE flights, destinations, list, trip RESTART IDENTITY CASCADE;

INSERT INTO trip (trip_name, city, start_date, end_date, notes, user_id) VALUES 
('Los Angeles', 'Los Angeles', '2019-06-22', '2019-06-25', 'Lets go LA!', 1),
('San Francisco', 'San Francisco', '2019-07-20', '2019-07-24', 'San Francisco is the best!', 1),
('New York', 'New York', '2019-08-15', '2019-08-21', 'Bring a jacket to NY', 2)
;

INSERT INTO flights (airline, flight_num, depart_date, depart_time, arrival_date, arrival_time, flight_notes, trip_id) VALUES 
(
    'United', 123, '2019-06-20', '07:00', '2019-06-22', '10:00', 'LA Notes', 1
),
(
    'Southwest', 234, '2019-07-20', '08:00', '2019-06-22', '10:00', 'SF Notes', 2
),
(
    'Delta', null, '2019-08-15', '13:00', '2019-08-16', '11:00', 'New York Notes', 3
);

INSERT INTO list (item_name, list_notes, trip_id) VALUES 
('toothpaste', 'dont forget', 1),
('ibuprofen', 'dont get sick', 2),
('Inhaler', 'very important', 3);

INSERT INTO destinations (destination_name, destination_date, address, destination_notes, trip_id) VALUES 
('Disneyland', '2019-06-21', '1313 Disneyland Dr, Anaheim, CA 92802', 'Its going to be cold', 1),
('Golden Gate', '2019-07-21', 'Golden Gate Bridge, San Francisco, CA', 'not foggy today thankfully', 2),
('Statue of Liberty', '2019-08-16', 'New York, NY 10004', 'insane crowds', 3);