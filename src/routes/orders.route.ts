import { Router } from "express";
import { getOrderStates, postOrderState } from "../controller/orders_states.controller";
import { getUserOrders } from "../controller/user_orders.controller";

const router = Router()

router.get("/states", getOrderStates)
router.post("/states", postOrderState)

router.get("/history", getUserOrders)

export default router