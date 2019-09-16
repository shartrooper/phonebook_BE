const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const app = express()
const cors = require('cors')

app.use(cors())

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

app.use(bodyParser.json())
morgan.token('body', function getBody(req) {
    return req.method === 'POST'? JSON.stringify(req.body): 'none';
})
app.use(morgan('method :url :status :res[content-length] - :response-time ms :body'))


let persons =
    [
        { name: 'Arto Hellas', number: '012-345 6781', id: 1 },
        { name: 'Betty Bebop', number: '(789) 234 5678', id: 2 },
        { name: 'Dave Watson', number: '234-567-8988', id: 3 },
        { name: 'Mariah Roboto', number: '(432)3335566', id: 4 },
        { name: 'IP man', number: '456-896-4445', id: 5 }
    ]

const generateRandId = () => {
    return persons.length > 0
        ?
        (() => {
            let flag = true, newId = 0
            do {
                newId = Math.floor(Math.random() * 500)
                for (let i = 0; i < persons.length; i++) {
                    flag = persons[i]['id'] === newId
                    if (flag) {
                        break
                    }
                }
            }
            while (flag)
            return newId
        })()
        : Math.floor(Math.random() * 500)
}

app.get('/api/persons', (req, res) => {
    res.json(persons)
})

app.get('/', (req, res) => {
    let curtime = new Date().toString()
    res.send(`<p>phonebook has info for ${persons.length} people</p><div>${curtime}</div>`)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)

    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    console.log(id);
    persons = persons.filter(pr => pr.id !== id)
    response.status(204).end()
})

app.post('/api/persons', (request, response) => {

    const body = request.body

    if (!body.name || !body.number) {
        return response.status(400).json({
            error: 'Missing name or number'
        })
    }
    else if (!(persons.filter(person => person.name === body.name).length === 0)) {
        return response.status(400).json({
            error: 'The name already exists in the phonebook'
        })
    }
    else {
        const person = {
            name: body.name,
            number: body.number,
            id: generateRandId()
        }

        persons = persons.concat(person)

        return response.json(person)
    }
})

