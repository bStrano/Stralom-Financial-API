import mongoose from 'mongoose';

console.log('Initializing MongoDB database module');

mongoose.connect(process.env.MONGODB_URL, {useNewUrlParser: true, useUnifiedTopology: true}).then( () => {
  console.log("MongoDB connected.")
}).catch( e => {
  console.error.bind(console, 'Failed to initialize MongoDB', e);
});


