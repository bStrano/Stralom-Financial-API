import {createConnection} from 'typeorm';

console.log('Initializing database module');

createConnection().then( () => {
  console.log('Database ready');
}).catch( err => {
  console.error("Failed to start database", err)
});
