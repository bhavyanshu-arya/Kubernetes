Database-layer contains code/sql to initialize database with the dummy data and docker file to containerize the database layer.

Node-App folder contains code to access database layer by accessing database configuration using config maps and password using kubernetes secrets. It also contains Docker 
file to containerize the node application.

Yaml-Files folder contains all the yaml files used to deploy the docker images on Kubernetes and build all the kubernetes objects required for deployement.
