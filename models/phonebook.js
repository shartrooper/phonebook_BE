const mongoose = require('mongoose')
var uniqueValidator = require('mongoose-unique-validator');

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log(`Database connected successfully`))
    .catch(err => console.log(err));

const phoneSchema = new mongoose.Schema({
    name: {type:String,required: 'true',minlength: 3, unique: 'true'},
    number: {type:String,required: 'true',minlength: 8}
})

phoneSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

phoneSchema.plugin(uniqueValidator)
module.exports = mongoose.model('Person', phoneSchema)