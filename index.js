require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const app = express()
const cors = require('cors')
const Person = require('./models/phonebook')
app.use(cors())

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

app.use(bodyParser.json())

app.use(express.static('build'))

morgan.token('body', function getBody(req) {
    return req.method === 'POST' ? JSON.stringify(req.body) : 'none';
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))


//let persons =
//    [
//        { name: 'Arto Hellas', number: '012-345 6781', id: 1 },
//        { name: 'Betty Bebop', number: '(789) 234 5678', id: 2 },
//        { name: 'Dave Watson', number: '234-567-8988', id: 3 },
//        { name: 'Mariah Roboto', number: '(432)3335566', id: 4 },
//        { name: 'IP man', number: '456-896-4445', id: 5 }
//    ]

//const generateRandId = () => {
//    return persons.length > 0
//        ?
//        (() => {
//            let flag = true, newId = 0
//            do {
//                newId = Math.floor(Math.random() * 500)
//                for (let i = 0; i < persons.length; i++) {
//                    flag = persons[i]['id'] === newId
//                    if (flag) {
//                        break
//                    }
//                }
//            }
//            while (flag)
//            return newId
//        })()
//        : Math.floor(Math.random() * 500)
//}

app.get('/api/persons', (req, res) => {
    Person.find({}).then(people => {
        res.json(people.map(person => person.toJSON()))
    })
})

app.get('/info', (req, res) => {
    let curtime = new Date().toString()
    Person.find({}).then(people => {
        res.send(`<p>phonebook has info for ${people.length} people</p><div>${curtime}</div>`)
    })
})

app.get('/api/persons/:id', (request, response) => {
    Person.findById(request.params.id).then(person => {
        response.json(person.toJSON())
    }).catch(err => response.status(404).end())
})

app.delete('/api/persons/:id', (request, response) => {   
    Person.findByIdAndDelete(request.params.id)
        .then(result => {
            console.log('Person from requested id was succesfully deleted')
            response.status(204).end()
        })
        .catch(err => response.status(404).end())
    //const id = Number(request.params.id)
    //console.log(id);
    //persons = persons.filter(pr => pr.id !== id)
})


app.post('/api/persons', (request, response) => {

    const body = request.body

    if (!body.name || !body.number) {
        return response.status(400).json({
            error: 'Missing name or number'
        })
    }
    //else if (!(persons.filter(person => person.name === body.name).length === 0))          
    else {
        Person.find({ name: body.name })
            .then(res => {
                return res.length === 0
                    ?
                    (() => {
                        const person = new Person({
                            name: body.name,
                            number: body.number,
                            //id: generateRandId()
                        });

                        person.save().then(savedPerson => {
                            response.json(savedPerson.toJSON())
                        })

                        //persons = persons.concat(person)
                        //return response.json(person)
                    })()
                    : response.status(400).json({
                        error: 'The name already exists in the phonebook'
                    })
            })
            .catch(err => response.status(404).end())
    }
})

