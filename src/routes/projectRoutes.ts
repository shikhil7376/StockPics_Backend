import express,{Router} from 'express'
import { uploadImage } from '../controllers/project/uploadData'
import { getData } from '../controllers/project/getData'
import { deleteData } from '../controllers/project/deleteData'

const router:Router = express.Router()

router.post('/upload',(req,res,next)=>uploadImage(req,res,next))
router.get('/getData',(req,res,next)=>getData(req,res,next))
router.delete('/deleteData/:id/:userid',(req,res,next)=>deleteData(req,res,next))


export default router