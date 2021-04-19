import "reflect-metadata";
import app from './app';


const port = 3005
const ip = '0.0.0.0';


app.listen( port,ip, () => {
  console.log( `Server started at port ${port}` );
} );
