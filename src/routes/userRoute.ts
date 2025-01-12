import express,{Router} from 'express'
import { registerUser } from '../controllers/auth/registerUser'
import { verifyUser } from '../controllers/auth/verifyUser'
import { loginUser } from '../controllers/auth/loginUser'
import { resendOtp } from '../controllers/auth/resendOtp'
import { ResetPasswordOtp,ResetPassword } from '../controllers/auth/resetPassword'


const router:Router = express.Router()

router.post('/sign-up',(req,res,next)=>registerUser(req,res,next))
router.patch('/verify',(req,res,next)=>verifyUser(req,res,next))
router.patch('/resend',(req,res,next)=>resendOtp(req,res,next))
router.post('/login',(req,res,next)=>loginUser(req,res,next))
router.post('/resetotp',(req,res,next)=>ResetPasswordOtp(req,res,next))
router.post('/resetpassword',(req,res,next)=>ResetPassword(req,res,next))

export default router