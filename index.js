import express from "express";
import cors from "cors";
import connectDB from "./database/Dbconfig.js";
import userRouter from "./routers/User.router.js";
import customerRouter from "./routers/Customer.router.js";
import { isAuthenticated } from "./middleware/Auth.middleware.js";
import categoryRouter from "./routers/Category.router.js";
import inventoryRouter from "./routers/Inventory.router.js";
import orderRouter from "./routers/Order.router.js";
import billRouter from "./routers/Bill.router.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const port = process.env.PORT;
connectDB()
app.use(cors())
app.use(express.json())
app.use("/api/user", userRouter)
app.use("/api/customer", isAuthenticated, customerRouter)
app.use("/api/category", categoryRouter)
app.use("/api/inventory", inventoryRouter)
app.use("/api/order", isAuthenticated, orderRouter)
app.use("/api/bill",isAuthenticated,billRouter)
app.listen(port, () => {
    console.log("App is listening with port",port);
})


