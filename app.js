const Joi = require(`joi`)
const express = require(`express`)
const app     = express();
const Update = require("update");

app.use(express.json())

const courses = [
    { id : 1, name : "Mike"},
    { id : 2, name : "Mike2"},
    { id : 3, name : "Mike3"}
]

function validateValue(course){
    const schema = {
        name : Joi.string().min(3).required()
    }
   return Joi.validate(course, schema)
}

app.get(`/`, (req, res) => {
    res.send(`Hello world`)
})

app.get(`/home/api`, (req, res)=>{
    res.send(courses)
})

app.post(`/home/api/courses`, (req, res)=>{
    const { error } = validateValue(req.body);
    if(error){
        res.status(400).send(error.details[0].message)
        return;
    }
    const user = {
        id : courses.length + 1,
        name : req.body.name
    }
    courses.push(user);  
    res.send(user)
})

app.put(`/home/api/courses/:id`, (req, res)=>{
    const { error } = validateValue(req.body);
    if(error){
        res.status(400).send(error.details[0].message)
        return;
    }
    const idCard = req.body.id;
    courses.name = req.body.name;
    res.send(idCard)
})

app.get(`/home/api/courses/:id`, (req, res)=>{
    const meme = courses.find(student => student.id === parseInt(req.params.id))
    if(!meme) res.status(404).send(`<h1>This Page is down</h1>`)
    res.send(meme)
})


app.get(`/home/api/:month/:day`, (req, res)=>{
    res.send(req.query)
})

const port = process.env.PORT || 3000; 
app.listen(port, () => {
    console.log(`Server is live on port ${port}`)
})

// console.log(Update()); 