import express,{Router} from 'express'
import { uploadImage } from '../controllers/project/uploadData'
import { getData } from '../controllers/project/getData'
import { deleteData } from '../controllers/project/deleteData'
import { editData } from '../controllers/project/editData'
import { verifyUser } from '../middleware/verifyUser'
import updateImageOrder from '../controllers/project/updateImageOrder'

const router:Router = express.Router()

router.post('/upload',verifyUser,(req,res,next)=>uploadImage(req,res,next))
router.get('/getData',verifyUser,(req,res,next)=>getData(req,res,next))
router.delete('/deleteData/:id',verifyUser,(req,res,next)=>deleteData(req,res,next))
router.put('/update',verifyUser,(req,res,next)=>editData(req,res,next))
router.put("/update-image-order",verifyUser, updateImageOrder);

export default router