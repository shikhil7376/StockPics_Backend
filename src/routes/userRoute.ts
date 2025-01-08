import express,{Router} from 'express'
import { registerUser } from '../controllers/auth/registerUser'
import { verifyUser } from '../controllers/auth/verifyUser'
import { loginUser } from '../controllers/auth/loginUser'

const router:Router = express.Router()

router.post('/sign-up',(req,res,next)=>registerUser(req,res,next))
router.patch('/verify',(req,res,next)=>verifyUser(req,res,next))
router.post('/login',(req,res,next)=>loginUser(req,res,next))


export default router