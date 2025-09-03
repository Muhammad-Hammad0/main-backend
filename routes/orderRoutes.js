import express from "express"
import {isAuth} from '../middleware/isAuth.js'
import { allOrder, placeOrder, updateStatus, userOrder } from "../controller/orderController.js"
import Order from "../model/orderModel.js"
import adminAuth from '../middleware/adminAuth.js'

const orderRoutes = express.Router()


//for user

orderRoutes.post("/placeorder" , isAuth , placeOrder)
orderRoutes.post("/userorder" , isAuth , userOrder)


//for Admin

orderRoutes.post("/list" ,adminAuth,allOrder )
orderRoutes.post("/status" ,adminAuth,updateStatus )




export default orderRoutes