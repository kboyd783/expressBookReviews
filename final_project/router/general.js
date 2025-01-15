const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
    public_users.post("/register", (req,res) => {
        const { username, password } = req.body;
        if (!username || !password) {
          return res.status(400).json({ message: "Username and password are required" });
        }
        if (users.find((user) => user.username === username)) {
          return res.status(409).json({ message: "Username already exists" });
        }
        users.push({ username, password });
        return res.status(201).json({ message: "User registered successfully" });
    });
    

// Get the book list available in the shop
public_users.get('/',function (req, res) {
    console.log("Here is your list of books")
    const getBooks = Object.values(books)
    res.status(300).send(JSON.stringify(getBooks, null, 4));
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  const isbn = req.params.isbn;
    res.send(books[isbn]);
  
 });
  

public_users.get("/author/:author", function (req, res) {
    const authorName = req.params.author;
    const bookKeys = Object.keys(books);
  
    // filter upon author
    const chosenBooks = bookKeys
      .filter((key) => books[key].author.toLowerCase() === authorName.toLowerCase()
      )
      .map((key) => books[key]);
  
    if (chosenBooks.length > 0) {
      return res.status(200).json(chosenBooks);
    } else {
      return res.status(404).json({ message: "No books found for the author you entered" });
    }
  });

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
 
    const bookTitle = req.params.title;

    const chosenTitle = bookTitle.filter((title) => books.title === bookTitle);
    
        if (chosenTitle.length > 0){
          return res.status(200),json(chosenTitle)

        }else{
          return res.status(404),json({message: "There are no books with that title"})
     }

});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  const isbn = req.params.isbn;
  if (books[isbn]) {
    const reviews = books[isbn].reviews;
    return res.status(200).send(reviews);
  } else {
    return res.status(404).json({ message: "Book not found with the provided ISBN" });
  }
});
  

module.exports.general = public_users;
