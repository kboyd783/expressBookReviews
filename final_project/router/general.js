const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
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
  
// Get book details based on author
//public_users.get('/author/:author',function (req, res) {
   //const getAuthor = req.params.author.keys;
   //res.send(getAuthor);
  //return res.status(300).json({message: "Yet to be implemented"});
///});

public_users.get("/author/:author", function (req, res) {
    const authorName = req.params.author;
    const bookKeys = Object.keys(books);
  
    // filter upon author
    const filteredBooks = bookKeys
      .filter(
        (key) => books[key].author.toLowerCase() === authorName.toLowerCase()
      )
      .map((key) => books[key]);
  
    if (filteredBooks.length > 0) {
      return res.status(200).json(filteredBooks);
    } else {
      return res.status(404).json({ message: "No books found for the author you entered" });
    }
  });

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.general = public_users;
