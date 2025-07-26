import express from "express";
import authMiddleware from "../middleware/auth.js";
import {
  placeOrder,
  getAllOrders,
  updateOrderStatus,
  getOrderById,
  userOrders,
  deleteOrder,
} from "../controllers/orderController.js";

const orderRouter = express.Router();

orderRouter.post("/placed", authMiddleware, placeOrder);
orderRouter.get("/all", authMiddleware, getAllOrders);
orderRouter.put("/update/:orderId", authMiddleware, updateOrderStatus);
orderRouter.get("/track/:orderId", authMiddleware, getOrderById);
orderRouter.post("/usersorder", authMiddleware, userOrders);
orderRouter.delete("/deleteOrder/:orderId", deleteOrder);

export default orderRouter;
