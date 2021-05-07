import{Schema,model} from 'mongoose'

const articuloSchema = new Schema({
    nombre: {
        type: String,
        required: true,
        trim: true,
        unique: true
     },
     tipo: {
         type: String,
         required: true,
         trim: true
        },
    color: {
        type: String,
        required: true
    },
    url:{
        type: String,
        required:true
    },
    existencias: {
        type: Boolean,
        required: true
    },
    precio: {
        type: Schema.Types.Decimal128,
        required: true
    },
    oferta:{
        type: Boolean,
        required: true
    }

});

export default model('Articulo',articuloSchema)


