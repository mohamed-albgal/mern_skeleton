import  { Router } from 'express'
import authCtrlr from '../controllers/auth.controller'

const router = Router()

router.route('/auth/login')
    .post(authCtrlr.signin)

router.route('/auth/logout')
    .get(authCtrlr.signout)

export default router