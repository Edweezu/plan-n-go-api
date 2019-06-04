CREATE TABLE trip (
    id SERIAL PRIMARY KEY,
    trip_name TEXT NOT NULL
);

CREATE TABLE destinations (
    id SERIAL PRIMARY KEY,
    destination_name TEXT NOT NULL,
    destination_date DATE,
    address TEXT,
    notes TEXT,
    trip_id INTEGER REFERENCES trip(id) ON DELETE CASCADE NOT NULL
);

CREATE TABLE list (
    id SERIAL PRIMARY KEY,
    item_name TEXT NOT NULL,
    trip_id INTEGER REFERENCES trip(id) ON DELETE CASCADE NOT NULL
);

CREATE TABLE flights (
    id SERIAL PRIMARY KEY,
    airline TEXT,
    flight_num INT,
    depart_date DATE,
    depart_time TIME,
    arrival_date DATE,
    arrival_time TIME,
    unix_time INT,
    trip_id INTEGER REFERENCES trip(id) ON DELETE CASCADE NOT NULL
);
