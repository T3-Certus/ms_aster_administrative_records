import { Router } from "express";
import { getUserAddresses, getUserCarts, getUserData, getUserRoles, postUserRole } from "../controller";
const router = Router()

router.get('/roles', getUserRoles)
router.post('/roles', postUserRole)

router.get('/data', getUserData)

router.get('/carts', getUserCarts)
router.get('/carts/:id', getUserCarts)

router.get('/addresses', getUserAddresses)

export default router 