import mongoose from 'mongoose';
const DependenciasSchema = mongoose.Schema({ 
    Nombre: {type:String,required:true,uniqued:true, maxlenght:15},
    Codigo:{type:String,required:true,uniqued:true},
    Descripcion: {type:String,required:true,maxlenght:500},
    Estado: {type:Number,default:1,required:true,maxlenght:50},
    createAt: {type:Date, default:Date.now}
})
export default mongoose.model('Dependencias',DependenciasSchema);          
