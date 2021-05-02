import app from  './app'
import './mongodatabase'

app.listen(app.get('port'),()=>{
    console.log('server on port', app.get('port'))
})
