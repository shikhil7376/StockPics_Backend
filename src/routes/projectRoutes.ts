import express,{Router} from 'express'
import { uploadImage } from '../controllers/project/uploadData'
import { getData } from '../controllers/project/getData'
const router:Router = express.Router()

router.post('/upload',(req,res,next)=>uploadImage(req,res,next))
router.get('/getData',(req,res,next)=>getData(req,res,next))



export default router