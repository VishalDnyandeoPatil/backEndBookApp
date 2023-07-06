const mongoose = require('mongoose');

const bookSchema= mongoose.Schema({
    title:{type: String, require: true},
    author:{type: String, require: true},
    genre:{type: String, enum:['Fiction','Science','Comic'], require: true},
    description:{type: String, require: true},
    price:{type: Number, require: true},
})

const booksModel= mongoose.model('books', bookSchema);

module.exports={booksModel};