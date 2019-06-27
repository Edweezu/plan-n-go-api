ALTER TABLE IF EXISTS destinations
    DROP COLUMN trip_id;

ALTER TABLE IF EXISTS flights
    DROP COLUMN trip_id;;

ALTER TABLE IF EXISTS packing_list
    DROP COLUMN trip_id;;


DROP TABLE IF EXISTS destinations;
DROP TABLE IF EXISTS flights;
DROP TABLE IF EXISTS packing_list;
DROP TABLE IF EXISTS trip;

-- ALTER TABLE IF EXISTS trip
--     DROP COLUMN flights_id;

-- ALTER TABLE IF EXISTS trip
--     DROP COLUMN destinations_id;

-- ALTER TABLE IF EXISTS trip
--     DROP COLUMN list_id;

-- DROP TABLE IF EXISTS trip;
-- DROP TABLE IF EXISTS destinations;
-- DROP TABLE IF EXISTS list;
-- DROP TABLE IF EXISTS flights;
