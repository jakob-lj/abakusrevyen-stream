#! /bin/bash

docker run -p 5432:5432 --name revy-postgres --rm -v revy-1:/var/lib/postgresql/data  -e POSTGRES_PASSWORD=pgpass -d postgres

psql -U postgres -h 0.0.0.0