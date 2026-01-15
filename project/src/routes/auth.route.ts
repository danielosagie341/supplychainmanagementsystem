import express from 'express';
import {
    signup,
    verify,
    login,
    resendVerification,
    forgotPassword,
    resetPassword,
    logOut,
    updatePassword,

} from '../controllers/auth.controller'
import MiddlewareService from '../middlewares/auth.middleware';

const router = express.Router();

router.post('/signup', signup)

router.post('/verify', verify)

router.post('/login', login)

router.post('/resendverification', resendVerification)

router.post('/forgotpassword', forgotPassword)

router.post('/resetpassword', resetPassword)

router.post('/logout', logOut)


router.use(MiddlewareService.protect)
router.post('/updatepassword', updatePassword)


export default router;