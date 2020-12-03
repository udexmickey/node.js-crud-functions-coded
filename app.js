const Joi = require(`joi`)
const express = require(`express`)
const app     = express();
const Update = require("update");

app.use(express.json())

const courses = [
    { id : 1, name : "Mike 1"},
    { id : 2, name : "Mike 2"},
    { id : 3, name : "Mike 3"}
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

app.get(`/home/api/courses/:id`, (req, res)=>{
    const course = courses.find(student => student.id === parseInt(req.params.id))
    if(!course) return res.status(404).send(`<h1>This Page is down</h1>`)
    res.send(course)
})

app.post(`/home/api/courses`, (req, res)=>{
    const { error } = validateValue(req.body);
    if(error) return res.status(400).send(error.details[0].message)

    const user = {
        id : courses.length + 1,
        name : req.body.name
    }
    courses.push(user);  
    res.send(user)
})

app.put(`/home/api/courses/:id`, (req, res)=>{
    const course = courses.find(student => student.id === parseInt(req.params.id))
    if(!course) return res.status(404).send(`<h1>This Page is down</h1>`)

    const { error } = validateValue(req.body);
    if(error) return res.status(400).send(error.details[0].message)
        
    course.name = req.body.name;
    res.send(course)
})

app.delete(`/home/api/courses/:id`, (req, res) =>{
   const course = courses.find(finder => finder.id === parseInt(req.params.id));

   if(!course) return res.status(404).send("Can't find this item")

    // const myObj = courses.filter(person => person !== course);
    // res.send(myObj);

    const index = courses.indexOf(course)
    courses.splice(index, 1)
    res.send(course)
   
})


const port = process.env.PORT || 3000; 
app.listen(port, () => {
    console.log(`Server is live on port ${port}`)
})

// console.log(Update()); 