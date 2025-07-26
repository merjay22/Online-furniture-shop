import userModel from "../models/userModel.js";

const addToCart = async (req, res) => {
  try {
    const { userId, itemId, quantity } = req.body;

    let userData = await userModel.findById(userId);
    let cartData = userData.cartData || {};

    if (!cartData[itemId]) {
      cartData[itemId] = quantity;
    } else {
      cartData[itemId] += quantity;
    }

    await userModel.findByIdAndUpdate(userId, { cartData });
    res.json({ success: true, message: "Product Added To Cart" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

const removeFromCart = async (req, res) => {
  try {
    const { userId, itemId } = req.body;

    let userData = await userModel.findById(userId);
    let cartData = userData.cartData;

    if (cartData[itemId] > 0) {
      cartData[itemId] -= 1;
    }

    await userModel.findByIdAndUpdate(userId, { cartData });
    res.json({ success: true, message: "Product Removed!" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

const removeAllFromCart = async (req, res) => {
  try {
    const { userId, itemId } = req.body;

    let userData = await userModel.findById(userId);
    let cartData = userData.cartData;

    delete cartData[itemId];

    await userModel.findByIdAndUpdate(userId, { cartData });
    res.json({
      success: true,
      message: "All items of this product have been removed from the cart!",
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

const getCart = async (req, res) => {
  try {
    const { userId } = req.body;

    let userData = await userModel.findById(userId);
    let cartData = userData.cartData;
    res.json({ success: true, cartData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

export { addToCart, removeFromCart, removeAllFromCart, getCart };
