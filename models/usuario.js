import mongoose from 'mongoose';

const UsuarioSchema = mongoose.Schema({
    Nombre: {type:String,required:false,maxlenght:50},
    Email: {type:String,uniqued:true,maxlenght:50},
    Password: {type:String,required:true},
    Rol:{type:String,required:false,maxlenght:20},
    Estado: {type:Number,default:1,required:true,maxlenght:50},
    CreateAt: {type:Date, default:Date.now}

})

export default mongoose.model('Usuario',UsuarioSchema);