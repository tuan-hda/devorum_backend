#!/bin/bash
# This script adds Semantic Release as a development dependency in the root directory of each microservice.

# List of microservice directories (replace with your directory names)
MICROSERVICES=("boilerplate" "proxy" "users" "community" "upload")

for microservice in "${MICROSERVICES[@]}"
do
  # Change to the microservice directory
  cd "$microservice"
  
  # Install Semantic Release as a dev dependency
  npm install semantic-release --save-dev

  # Return to the root directory
  cd ..
done
