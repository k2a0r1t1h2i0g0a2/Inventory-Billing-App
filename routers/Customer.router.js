import express from "express";
import {
  addCustomer,
  getAllCustomers,
  deleteCustomer,
} from "../controllers/Customer.controller.js";



const router = express.Router();
router.post("/add",addCustomer)
router.get("/getallcustomers", getAllCustomers)
router.delete("/delete/:id",deleteCustomer)
export default router;