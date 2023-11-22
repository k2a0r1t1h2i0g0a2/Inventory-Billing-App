import InventoryItem from "../models/Inventory.model.js";
import Category from "../models/Category.model.js";



export const addInventoryItem = async (req, res) => {
  try {
   
      const { name, description, price, quantity, category } = req.body;
        if (!category || !category._id) {
          return res.status(400).json({ message: "Category is required" });
        }
         const validCategory = await Category.findById(category._id);
         if (!validCategory) {
           return res.status(404).json({ message: "Invalid category ID" });
         }
    const inventoryItem = new InventoryItem({
      name,
      description,
      price,
      quantity,
      category: category._id,
    });
    await inventoryItem.save();
    res
      .status(201)
      .json({ message: "Inventory item created successfully", inventoryItem });
  } catch (error) {
    console.error("Error occurred:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};


export const getAllInventoryItems = async (req, res) => {
  try {
    const inventoryItems = await InventoryItem.find();
    res
      .status(200)
      .json({ message: "List of all inventory items", inventoryItems });
  } catch (error) {
    console.error("Error occurred:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const updateInventoryItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, quantity, category } = req.body;
    const inventoryItem = await InventoryItem.findByIdAndUpdate(
      id,
      { name, description, price, quantity, category },
      { new: true }
    );
    res
      .status(200)
      .json({ message: "Inventory item updated successfully", inventoryItem });
  } catch (error) {
    console.error("Error occurred:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};



export const deleteInventoryItem = async (req, res) => {
  try {
    const { id } = req.params;
    await InventoryItem.findByIdAndDelete(id);
    res.status(200).json({ message: "Inventory item deleted successfully" });
  } catch (error) {
    console.error("Error occurred:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

