import express from 'express'
import { createBillFromOrder, deleteBill, getAllBills } from '../controllers/Bill.controller.js'


const router = express.Router()
router.post("/create",createBillFromOrder)
router.get("/get",getAllBills)
export default router
router.delete("/delete/:id",deleteBill)