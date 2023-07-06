const {booksModel}= require('../models/bookModel')
const express = require('express');

const routerBook= express.Router();

routerBook.get('/allBooks', async(req,res)=>{
    try {
        // const allBooksData = await booksModel.find();
        
        const { genre } = req.query;
        let filterBooksData = {};
        if (genre) {
            filterBooksData = { genre };
        }
        const allBooksData = await booksModel.find(filterBooksData).sort({price:1});
        res.send(allBooksData);  

    } 
    catch (error) {
        res.status(500).send({error:error.message})
    }
})

routerBook.post('/bookAdd', async(req,res)=>{
    try {
        const{title,author,genre,description,price}= req.body;
        const alreadyBooksthere = await booksModel.findOne({title});
        
        if(alreadyBooksthere){
            return res.status(400).json({message:"Book is alrady there Please check the data"})
        }
        else{
            const bookAdd = new booksModel({title,author,genre,description,price})
            await bookAdd.save();
            res.send({message:"Book Sucessfully add on database"})
        }
    } 
    catch (error) {
        res.status(500).send({message:'Book not added please check add data', error:error.message});
    }
})

routerBook.delete("/bookDelete/:id", async (req, res) => {

    const ID = req.params.id;
    try {
      await booksModel.findByIdAndDelete({ _id: ID });
      res.send({ msg: "Book deleted successfully" });
    } catch (err) {
      res.send({ msg: "Cannot delete the book", error: err.message });
    }
  });


module.exports={routerBook}

