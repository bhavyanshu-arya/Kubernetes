Database-layer contains code/sql to initialize database with the dummy data and docker file to containerize the database layer.

Node-App folder contains code to access database layer by accessing database configuration using config maps and password using kubernetes secrets. It also contains Docker 
file to containerize the node application.

Yaml-Files folder contains all the yaml files used to deploy the docker images on Kubernetes and build all the kubernetes objects required for deployement.

Git repository : https://github.com/bhavyanshu-arya/Kubernetes

URL for Service API tier : http://35.202.143.230/

Docker Images in the assignment were pushed to google-cloud, link to the images : 

1) gcr.io/kubernetes-389110/nagp-app-node
2) gcr.io/kubernetes-389110/nagp-app-database

This Google container registry has been made public for evaluation and should be accessible to any logged-in account to google cloud. Let me know if you face any issue while accessing.

Images are deployed to docker hub as well for evaluation purpose only , these were not used in the assignment yaml files :

1) https://hub.docker.com/repository/docker/bhavyanshuarya/kubernetes_assignment_database/general
2) https://hub.docker.com/repository/docker/bhavyanshuarya/kubernetes_assignment_node/general


Role (Role , RoleBinding, RoleSecret) yaml files were used to provide access to the default namespaces.
