CREATE TABLE trip (
    id SERIAL PRIMARY KEY,
    trip_name TEXT NOT NULL,
    city TEXT NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE NOT NULL
);

CREATE TABLE destinations (
    id SERIAL PRIMARY KEY,
    destination_name TEXT NOT NULL,
    destination_date DATE,
    address TEXT,
    destination_notes TEXT,
    trip_id INTEGER REFERENCES trip(id) ON DELETE CASCADE NOT NULL
);

CREATE TABLE packing_list (
    id SERIAL PRIMARY KEY,
    item_name TEXT NOT NULL,
    list_notes TEXT,
    checked BOOLEAN,
    trip_id INTEGER REFERENCES trip(id) ON DELETE CASCADE NOT NULL
);

CREATE TABLE flights (
    id SERIAL PRIMARY KEY,
    airline TEXT NOT NULL,
    flight_num INT,
    depart_date DATE NOT NULL,
    depart_time TIME ,
    seats TEXT,
    flight_notes TEXT,
    unix_time INT,
    trip_id INTEGER REFERENCES trip(id) ON DELETE CASCADE NOT NULL
);
