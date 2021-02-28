#! /bin/bash

docker stop revy-postgres
docker volume rm revy-1
docker volume create revy-1