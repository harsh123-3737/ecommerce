import express from "express";
import "dotenv/config";
import connectDB from "./database/db.js";
import userRoutes from "./routes/userRoutes.js";
import productRoute from "./routes/productRoute.js";
import cartRoute from "./routes/cartRoute.js";
import orderRoute from "./routes/orderRoute.js";
import cors from "cors";
const app = express();

const PORT = process.env.PORT || 3000;

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://my-frontend-ecofrindly.vercel.app",
      "https://ecommerce-three-zeta-53.vercel.app",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"], // Add this
  }),
);

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/product", productRoute);
app.use("/api/v1/cart", cartRoute);
app.use("/api/v1/orders", orderRoute);
//http://localhost:10000/api/v1/user/register
app.get("/", (req, res) => {
  res.send("Backend API is running...");
});

app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port ${PORT}`);
});
