import Customer from "../models/Customer.model.js";

export const addCustomer = async (req, res) => {
  try {
    const { name, email, phoneNumber ,address} = req.body;
    if (!name || !email || !phoneNumber || !address) {
      return res
        .status(400)
        .json({ error: "Name, email, and phone number are required fields." });
    }

     const newCustomer = new Customer({
       name,
       email,
       phoneNumber,
       address,
       user: req.user._id,
     });
    await newCustomer.save();
    res.status(201).json({ message: "Customer added successfully." ,newCustomer});

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};


export const getAllCustomers = async (req, res) => {
  try {
        
      const customers = await Customer.find({ user: req.user._id });
          console.log("Fetched Customers:", customers);


       if (customers.length === 0) 
      {
            return res.status(404).json({message:"No customers found for this user"})
      }
      
        res.status(200).json({ message: "list all customers for the user", data:customers })
    } catch (error) {
        console.error("Error occurred:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

export const deleteCustomer = async (req, res) => {
  try {
     const customer = await Customer.findByIdAndDelete(req.params.id);
     if (!customer) {
       return res.status(404).json({ message: "Customer not found" });
     }
     res.status(200).json({ message: "Customer deleted successfully" });
  } catch (error) {
     console.error("Error occurred:", error);
     res.status(500).json({ error: "Internal server error" });
  }
}

