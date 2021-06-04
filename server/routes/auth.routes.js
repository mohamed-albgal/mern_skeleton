import express, { Router } from 'express'
import authCtrlr from '../controllers/auth.controller'

const router = express.Router()

router.route('/auth/login')
    .post(authCtrlr.signin)

router.route('/auth/signout')
    .get(authCtrlr.signout)

export default router