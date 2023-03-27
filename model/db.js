const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.localdb, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Database connected');
})
.catch((error) => {
  console.log('Error connecting to database:', error.message);
});

