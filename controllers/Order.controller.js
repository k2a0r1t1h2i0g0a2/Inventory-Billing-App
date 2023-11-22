import Order from "../models/Order.model.js";
import InventoryItem from "../models/Inventory.model.js";
import Customer from "../models/Customer.model.js";




export const addOrder = async (req, res) => {
  try {
    const { customer: customerId, items } = req.body;
      console.log("Received Customer ID:", customerId);
    let total = 0;

    const customer = await Customer.findById(customerId);
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }
    const populatedCustomer = {
      _id: customer._id,
      name: customer.name,
      email: customer.email,
      address: customer.address,
      phoneNumber: customer.phoneNumber,
    };

    const itemDetails = [];
    for (let i = 0; i < items.length; i++) {
      const item = await InventoryItem.findById(items[i].item);
      if (!item) {
        return res.status(404).json({ message: "Item not found" });
      }
      const { name, price, quantity } = item;
      if (items[i].quantity > quantity) {
        return res
          .status(400)
          .json({ message: "Insufficient quantity for the item" });
      }
      const itemTotal = price * items[i].quantity;
      total += itemTotal;
      itemDetails.push({
        name,
        price,
        quantity: items[i].quantity,
        itemTotal,
      });
    }
for (let i = 0; i < items.length; i++) {
  const item = await InventoryItem.findById(items[i].item);
  item.quantity -= items[i].quantity;
  await item.save();
}
    const order = new Order({
      customer: customer._id,
      user: req.user._id,
      items,
      total,
    });
    await order.save();

    res.status(201).json({
      message: "Order placed successfully",
      customer: populatedCustomer,
      items: itemDetails,
      total,
    });
  } catch (error) {
    console.error("Error occurred:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};


export const getAllOrders = async (req, res) => {
  try {
    console.log("User ID:", req.user._id);

    const orders = await Order.find({ user: req.user._id 
    })
      .populate("customer")
      .populate("items.item", "name price");
        console.log("Fetched Orders:", orders);
console.log(typeof req.user._id);

    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json({ message: "List of all orders for the user", orders });
  } catch (error) {
    console.error("Error occurred:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    console.error("Error occurred:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};