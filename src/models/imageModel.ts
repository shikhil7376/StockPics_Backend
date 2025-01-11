import { Schema, model, Types } from 'mongoose';


const imageSchema = new Schema({
    description: {
      type: String,
      required: true, 
      trim: true, 
    },
    url: {
      type: String,
      required: true, 
      trim: true, 
    },
    userId: {
      type: Types.ObjectId, 
      ref: 'User', 
      required: true, 
    },
  }, { timestamps: true });
  
  // Create and export the Image model
  const ImageModel = model('Image', imageSchema);
  
  export default ImageModel;