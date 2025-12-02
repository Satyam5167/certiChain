import express from "express";
import cors from "cors";
import dotenv from "dotenv";


import authRoutes from './routes/authRoutes.js'
import certificateRoutes from './routes/certificateRoutes.js'
import userRoutes from './routes/userRoutes.js'
import emailRoutes from './routes/emailRoutes.js'

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT;

app.use("/api/auth", authRoutes);
app.use('/api/users', userRoutes);
app.use("/api/certificate", certificateRoutes);
app.use("/api/email", emailRoutes);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});