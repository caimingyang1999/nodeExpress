const express = require('express')
const app = express()
const port  = 3000
const router = require('./routers/user')
const bodyParser = require('body-parser')
const cors = require('cors')
const upLoad = require('./routers/upload')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(router)
app.use(upLoad)
app.use(cors())


app.use(express.static('upload'))





app.listen(port,()=>{
    console.log(`服务器已启动,端口${port}`);
})