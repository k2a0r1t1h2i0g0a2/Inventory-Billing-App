import express from 'express'
import { addOrder, deleteOrder, getAllOrders } from '../controllers/Order.controller.js'

const router = express.Router()

router.post("/add", addOrder)
router.get("/getall", getAllOrders)
router.delete("/delete/:id",deleteOrder)

export default router