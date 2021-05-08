import mongoose,{ ConnectionOptions } from 'mongoose'


(async() =>{
   try {
       const mongooseOptions: ConnectionOptions = {
        useNewUrlParser: true,
        useFindAndModify: false,
        useCreateIndex:true,  
        useUnifiedTopology: true,
        /*
        auth*/
    }
    //estas dos lineas son para que no salte una advertencia de deprecation Warning
    /*mongoose.set('useNewUrlParser',true);
    mongoose.set('useCreateIndex',true);*/
    const db = await mongoose.connect('mongodb://localhost/tienda', mongooseOptions);
        console.log('connected to:', db.connection.name)
   } catch (error) {
       console.error(error)
   } 
    
      
})()
