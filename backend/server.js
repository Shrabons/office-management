const express = require('express')
var cors = require('cors')
const app = express()
const Employee = require('./Model/employee.js')
const Classtime = require('./Model/classtimeModel.js')
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://learn:learn123@cluster0.yxoos.mongodb.net/officeManagebd?retryWrites=true&w=majority', ()=>{
    console.log("DB connented !")
})

app.use(cors())
app.use(express.json())

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
  
    console.log(req.body.room)
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

app.listen('5000', ()=> console.log("server runing port 5000"))