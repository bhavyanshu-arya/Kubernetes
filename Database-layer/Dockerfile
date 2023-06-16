FROM mysql:latest

# Copy the initialization script to the image
COPY init.sql /docker-entrypoint-initdb.d/

# Make the script executable
RUN chmod +x /docker-entrypoint-initdb.d/init.sql

# Set the entrypoint command to start the database server
ENTRYPOINT ["docker-entrypoint.sh"]

# Specify the CMD to run the database server
CMD ["mysqld"]



