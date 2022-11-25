import { Router } from "express";
import { deleteUserData, getUserAddresses, getUserCarts, getUserData, getUserRoles, postUserRole, putUserData, putUserRole } from "../controller";
const router = Router()

router.get('/roles', getUserRoles)
router.post('/roles', postUserRole)
router.put('/roles/:id', putUserRole)

router.get('/data', getUserData)
router.put('/data/:userId', putUserData)
router.delete('/data/:userId', deleteUserData)

router.get('/carts/:id', getUserCarts)

router.get('/addresses', getUserAddresses)

export default router 