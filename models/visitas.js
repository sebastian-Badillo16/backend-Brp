import mongoose from 'mongoose';

const VisitasSchema = mongoose.Schema({
    Asunto:{type:String,required:true,maxlenght:50},
    CodigoD:{type: mongoose.Schema.Types.ObjectId,ref:'dependencias',required:true},    
    Nombre: {type:String,required:true,maxlenght:10}, 
    Cedula: {type:String,required:true,maxlenght:12},
    Ciudad: {type:String,maxlenght:10},
    foto: {type:String}, 
    CreateAt: {type:Date, default:Date.now}
      
}) 
 
export default mongoose.model('Visitas',VisitasSchema);
    
  