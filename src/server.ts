import express from 'express'
import app from './app';

const port = process.env.PORT || 3007
const ip = '0.0.0.0';

// start the Express server
app.listen( port, () => {
  console.log( `Server started at port ${port}` );
} );
