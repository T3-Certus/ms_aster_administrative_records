import { Router } from "express";
const usersRouter = Router()

usersRouter.get('/demo', (req, res) => res.send("demoooo users") )

export default usersRouter 