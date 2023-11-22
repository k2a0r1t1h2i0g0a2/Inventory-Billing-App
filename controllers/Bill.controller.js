import Bill from "../models/Bill.model.js";
import Order from "../models/Order.model.js";


export const createBillFromOrder = async (req, res) => {
  try {
    const { orderId } = req.body;
    const order = await Order.findById(orderId).populate('customer items.item');

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    const populatedCustomer = {
      _id: order.customer._id,
      name: order.customer.name,
      email: order.customer.email,
      address: order.customer.address,
      phonenumber: order.customer.phonenumber,
    };

    const items = order.items.map((item) => {
      return {
        product: item.item._id,
        quantity: item.quantity,
        price: item.item.price,
      };
    });

    const totalAmount = items.reduce((total, item) => total + item.quantity * item.price, 0);

    const bill = new Bill({
      order: orderId,
      user: req.user._id,
      customer: order.customer._id,
      items,
      totalAmount,
    });
    await bill.save();

    res.status(201).json({ message: 'Bill created successfully', bill: { _id: bill._id, order: bill.order, customer: populatedCustomer, items: bill.items, totalAmount: bill.totalAmount, date: bill.date, __v: bill.__v } });
  } catch (error) {
    console.error('Error occurred:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


export const getAllBills = async (req, res) => {
  try {
    const bills = await Bill.find({ user: req.user._id }).populate(
      "customer",
      "name email address phonenumber"
    );;
    res.status(200).json({message:"List of all bills", bills});
  } catch (error) {
    console.error("Error occurred:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};


export const deleteBill = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBill = await Bill.findByIdAndDelete(id);
    if (!deletedBill) {
      return res.status(404).json({ message: "Bill not found" });
    }
    res.status(200).json({ message: "Bill deleted successfully" });
  } catch (error) {
    console.error("Error occurred:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};