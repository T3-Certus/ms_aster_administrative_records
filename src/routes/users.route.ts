import { Router } from "express";
import { getUserAddresses, getUserCarts, getUserData, getUserRoles, postUserRole, putUserRole } from "../controller";
const router = Router()

router.get('/roles', getUserRoles)
router.post('/roles', postUserRole)
router.put('/roles/:id', putUserRole)

router.get('/data', getUserData)

router.get('/carts', getUserCarts)
router.get('/carts/:id', getUserCarts)

router.get('/addresses', getUserAddresses)

export default router 