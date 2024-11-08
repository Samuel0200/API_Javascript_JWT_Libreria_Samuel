import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotend from 'dotenv';

// App creation
const app = express();

// Load the environment variables
dotend.config();


// Connection to MongoDB using mongoose
mongoose
  .connect(
    process.env.CONNECTION
  )
  .then(async () => {
    console.log('Conectado a la base de datos.');
  })
  .catch((err) => {
    console.log('Hubo un error en la conexion!');
    console.log(err);
  });

// Enable CORS
app.use(cors());
// Enable JSON body parsing
app.use(express.json());

// Define the app routes
import userRoute from './routes/User.js';
import authRoute from './routes/Auth.js';
import bookRoute from './routes/Book.js';
import reservationRoute from './routes/Reservation.js';


app.use('/user', userRoute);
app.use('/login', authRoute);
app.use('/book', bookRoute);
app.use('/reservation', reservationRoute);

// Endpoint 404
app.use((req, res) => {
  res.status(404).json({ message: 'No encontrado.' });
});

// Start the server
app.listen(8080, () => {
  console.log("Server is running on port 8080");
});
