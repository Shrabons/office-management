const express = require('express')
var cors = require('cors')
const app = express()
const bcrypt = require('bcrypt')
const Employee = require('./Model/employee.js')
const Classtime = require('./Model/classtimeModel.js')
const Siginup = require('./Model/signupModel.js')
const Mainpost = require('./Model/mainpostModel.js')
const Post = require('./Model/postModel.js')
const mongoose = require('mongoose');
const e = require('cors')
mongoose.connect('mongodb+srv://learn:learn123@cluster0.yxoos.mongodb.net/officeManagebd?retryWrites=true&w=majority', ()=>{
    console.log("DB connented !")
})

app.use(cors())
app.use(express.json())



app.post('/postmain', (req, res)=> {
    console.log(req.body)
    const mainpostInfo = {
        name:req.body.name,
        time: req.body.time,
        department: req.body.dep,
        day: req.body.day,
        descripation: req.body.despation
        
    }

    const maindb = new Mainpost(mainpostInfo)
    maindb.save()

})

app.get('/postmain', async (req, res)=> {
    const Data = await Mainpost.find({})
    res.send(Data)

})

// Siginup working function 
app.post('/signup', async (req, res) =>{

    const emailerror = await Siginup.find({email: req.body.email})
    
    if(emailerror[0]){
        res.send(`${req.body.email} Your email already exits !`)
        console.log(`${req.body.email} Your email already exits !`)
    }else {
        bcrypt.hash(req.body.password, 10, function(err, hash){
            const userInfo = {
                username: req.body.username,
                email: req.body.email,
                password: hash,
                cpassword: hash,
            }
        
            const signupDb = new Siginup(userInfo)
            signupDb.save()
        })
    }
  
       
    
        
})

// login function working 
app.post('/login', async (req, res)=>{
    console.log(req.body.password)
    let data = await Siginup.find({email: req.body.email})
 
    if(data[0]){
        bcrypt.compare(req.body.password, data[0].password, function(err, result){
        
            if(result){
                res.send({data: data[0], msg: 'Accound Found !'})
            }else{
                res.send({msg: 'Accound Not Found !'})
            }
        })
    }else{
        res.send({msg: 'Eamil Not Found !'})
    }
   

   
})

app.post('/', (req, res)=>{
    const employers = {
        name: req.body.name,
        time: req.body.time,
        designation: req.body.des,
        dayoff: req.body.week,
    }
    const emp = new Employee(employers)
    emp.save()
})

app.get('/employee', async(req, res)=>{
    const empData = await Employee.find({})
    res.send(empData)
})

// em delet data 
app.delete('/employee/:id', (req, res) => {
    Employee.findByIdAndDelete(req.params.id, (err, docs)=>{
        console.log(err)
        console.log(docs)
    })
})

// em edit data 

app.get('/employee/:id', async (req, res) =>{
    const employer = await Employee.findById(req.params.id)
    res.send(employer)

})

app.put('/employee/:id', (req, res) => {
 
    let updata = {
        name: req.body.name,
        time: req.body.time,
        designation: req.body.des,
        dayoff: req.body.week,
    }
    Employee.findByIdAndUpdate(req.params.id,updata, (err, docs)=>{
        if(err) {
            console.log(err)
        }else{
            console.log(docs)
        }
    })
})

// classitme data post 
app.post('/classtime', (req, res) => {
    console.log(req.body.batch)
    let ctime = {
        batch: req.body.batch,
        time: req.body.time,
        room: req.body.room
    }

    const Classtimedb = new Classtime(ctime)
    Classtimedb.save()
})

app.get('/classDetails', async (req, res)=> {
    let data = await Classtime.find({})
    res.send(data)

})

app.delete('/classDetails/:id',(req,res)=> {
    console.log(req.params.id)
    Classtime.findByIdAndDelete(req.params.id, function(err, docs){
        if(err){
            console.log(err)
        }else{
            console.log(docs)
        }
    })
})

app.get('/classDetails/:id', async (req,res)=> {
    
    let data = await Classtime.findById(req.params.id)
    res.send(data)
})

app.put('/classDetails/:id', (req,res)=> {
    let upClassData = {
        batch: req.body.batch,
        time: req.body.time,
        room: req.body.room,
    }

    Classtime.findByIdAndUpdate(req.params.id,upClassData, (err, docs)=>{
        if(err) {
            console.log(err)
        }else{
            console.log(docs)
        }
    })

})

// post activity working 

app.post('/post', (req, res) => {
    let postData = {
        name: req.body.name,
        time: req.body.time,
        details: req.body.details,
    }

    const postdb = new Post(postData)
    postdb.save()
   
})

app.get('/postdetails', async (req, res) => {
    const allPost = await Post.find({})
    res.send(allPost)
})

app.delete('/postdetails/:id', (req, res) =>{
    Post.findByIdAndDelete(req.params.id, function(err, docs) {
        if(err){
            console.log(err)
        }else{
            console.log(docs)
        }
    })
})

app.get('/postdetails/:id', async (req, res) => {
    
    let datapost = await Post.findById(req.params.id)
    res.send(datapost)

})


app.put('/postdetails/:id', (req, res) => {
    // console.log(req.params.id)
    // console.log(req.body.name)
    // console.log(req.body.time)
    // console.log(req.body.details)
    let upDatatPost = {
        name: req.body.name,
        time: req.body.time,
        details: req.body.details
    }

    Post.findByIdAndUpdate(req.params.id,upDatatPost, function(err, docs){
        if(err){
            console.log(err)
        }else {
            console.log(docs)
        }
    })
})


app.listen('5000', ()=> console.log("server runing port 5000"))