import express, { Router } from 'express'
import authController from '../controllers/auth.controller'
import userCtrlr from '../controllers/user.controller'

const router = express.Router()

router.route('/api/users')
    .get(userCtrlr.list)
    .post(userCtrlr.create)

    //need to authorize requests to these routes, see block below this
// router.route('/api/users/:userId')
//     .get(userCtrlr.read)
//     .put(userCtrlr.update)
//     .delete(userCtrlr.remove)

//users must be authenticated and authorized to do certain things
router.route('/api/users/:userId')
.get(authController.requireSignin, userCtrlr.read)
.put(authController.requireSignin, authController.hasAuthorization, userCtrlr.update)
.delete(authController.requireSignin, authController.hasAuthorization, userCtrlr.remove)
    
router.param('userId', userCtrlr.userByID)

export default router


/*
routes that go to the root, first come here to be routed to 
/api/users OR /api/users/<userId>
if they fall in either bucket, they're further routed to some functionality in the controller based
 on if they're put, get or delete methods
 */