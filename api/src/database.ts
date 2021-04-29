import mongoose,{ ConnectionOptions, ConnectOptions } from 'mongoose'


(async() =>{
   try {
       const mongooseOptions: ConnectionOptions = {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        /*
        auth*/
    }
    const db = await mongoose.connect('mongodb://localhost/tienda',mongooseOptions);
        console.log('connected to:', db.connection.name)
   } catch (error) {
       console.error(error)
   } 
    
      
})()
