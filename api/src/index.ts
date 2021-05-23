import app from  './app'
import './dbmongodatabase'
import './dbpostgredatabase'

app.listen(app.get('port'),()=>{
    console.log('server on port', app.get('port'))
});
