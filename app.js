const mysql = require('mysql2');
const express = require('express');
const k8s = require('@kubernetes/client-node');


const app = express();
const port = 3000;

const secretNamespace = 'default';
const secretName = 'database-secret';
const secretKey = 'password';


// Define a route to fetch records from the database
app.get('/', (req, res) => {
  
// Create a new KubeConfig instance
const kubeconfig = new k8s.KubeConfig();
kubeconfig.loadFromDefault();
let dbConfig = '';

// Create a new CoreV1Api instance
const k8sApi = kubeconfig.makeApiClient(k8s.CoreV1Api);


// Retrieve the ConfigMap
k8sApi.readNamespacedConfigMap('db-config', 'default')
  .then((response) => {
    dbConfig = JSON.parse(response.body.data['dbConfig.json']);  
    
  readSecretValue(secretNamespace, secretName, secretKey)
  .then(value => {
    const config = {
      host: dbConfig.host,
      port: dbConfig.port,
      user: dbConfig.user,
      password: value,
      database: dbConfig.database
     }; 

     const pool = mysql.createPool(config);
  // Get a connection from the pool
  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error getting database connection:', err);
      res.status(500).send('Error getting database connection');
      return;
    }

    // Execute a query to fetch records from a table
    connection.query('SELECT * FROM tblPersonalDetails', (error, results) => {
      // Release the connection back to the pool
      connection.release();

      if (error) {
        console.error('Error executing database query:', error);
        res.status(500).send('Error executing database query');
        return;
      }

      // Render the retrieved records on a webpage
      res.send( `
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Age</th>
          </tr>
        </thead>
        <tbody>
          ${results.map(record => `
            <tr>
              <td>${record.id}</td>
              <td>${record.name}</td>
              <td>${record.age}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    `);
    });
  });

  })
  .catch(error => {
    console.error('Error:', error);
  });  
    
  })
  .catch((error) => {
    console.error('Error retrieving ConfigMap:', error);
  });  
  
});



// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});



async function readSecretValue(namespace, secretName, key) {
  try {
    // Create a new KubeConfig instance
    const kubeconfig = new k8s.KubeConfig();
    kubeconfig.loadFromDefault();

    const apiClient = kubeconfig.makeApiClient(k8s.CoreV1Api);

    const secret = await apiClient.readNamespacedSecret(secretName, namespace);
    const value = Buffer.from(secret.body.data[key], 'base64').toString();

    return value;
  } catch (error) {
    console.error('Error reading Secret:', error);
    throw error;
  }
};


async function getConfigMapValue(namespace, configMapName, key) {
  try {

    // Create a new KubeConfig instance
  const kubeconfig = new k8s.KubeConfig();
  kubeconfig.loadFromDefault();

    // Create a new CoreV1Api instance
    const k8sApi = kubeconfig.makeApiClient(k8s.CoreV1Api);

    const response = await k8sApi.readNamespacedConfigMap(configMapName, namespace);
    let dbConfig = JSON.parse(response.body.data['dbConfig.json']);  

    return dbConfig;
    
  } catch (error) {
    console.error('Error reading ConfigMap:', error);
    throw error;
  }
};

