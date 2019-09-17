const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('required password to fetch current data')
  process.exit(1)
}
else if (process.argv.length > 3 && process.argv.length !== 5) {
  console.log('some Arguments are missing: either password, Person\'s name and number as strings (if separated by space, add double quotes)')
  process.exit(1)
}

const sendData = { name: process.argv[3], number: process.argv[4] }
const password = process.argv[2]
const url =
  `mongodb+srv://sharkantropo:${password}@mongomarko-gzrof.gcp.mongodb.net/phone-app?retryWrites=true&w=majority`
mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true })

const phoneSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Person = mongoose.model('Person', phoneSchema)


if (sendData.name) {
  //Add person
  const person = new Person({
    name: sendData.name,
    number: sendData.number
  })

  person.save().then(res => {
    console.log('number saved in phonebook database!')
    mongoose.connection.close()
  })
}
else {
  Person.find({}).then(result => {
    console.log('Phonebook:')
    result.forEach(person => console.log(`${person.name} ${person.number}`))
    mongoose.connection.close()
  })
}