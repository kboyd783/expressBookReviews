const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();
const axios = require('axios');

public_users.post("/register", (req,res) => {
        const { username, password } = req.body;
        if (!username || !password) {
          return res.status(400).json({ message: "Username and password are required" });
        }
        if (users.find((user) => user.username === username)) {
          return res.status(409).json({ message: "Username already exists" });
        }
        users.push({ username, password });
        return res.status(201).json({ message: "User registered successfully. Now you can login." });
    });
    

// Get the book list available in the shop
public_users.get('/',function (req, res) {
    console.log("Here is your list of books")
    const getBooks = Object.values(books)
    res.status(300).send(JSON.stringify(getBooks, null, 4));
});

public_users.get('/books',function(req, res) {
    const get_books = new Promise((resolve, reject) =>{
        resolve(res.send(JSON.stringify({books}, null, 4)));
    });

    get_books.then(() => console.log("Promise for Task 10 resolved"));
}); 
    

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  const isbn = req.params.isbn;
    res.send(books[isbn]);
  
 });

 public_users.get('/books/isbn/:isbn',function(req, res) {
    const get_isbn = new Promise((resolve, reject) =>{
    const isbn = req.params.isbn;
        if(req.params.isbn <=10){
        resolve(res.send(JSON.stringify({isbn}, null, 4)));    
        } 
        else{
            reject(res.send('ISBN not found'));
        } 
        
    });

    get_isbn.then(() => console.log("Promise for Task 11 resolved"));
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


  public_users.get('/books/author/:author',function (req, res) {

    const get_books_author = new Promise((resolve, reject) => {

    let booksbyauthor = [];
    let isbns = Object.keys(books);
    isbns.forEach((isbn) => {
      if(books[isbn]["author"] === req.params.author) {
        booksbyauthor.push({"isbn":isbn,
                            "title":books[isbn]["title"],
                            "reviews":books[isbn]["reviews"]});
      resolve(res.send(JSON.stringify({booksbyauthor}, null, 4)));
      }


    });
    reject(res.send("The mentioned author does not exist "))
        
    });

    get_books_author.then(function(){
            console.log("Promise is resolved");
   }).catch(function () { 
                console.log('The mentioned author does not exist');
  });

  });

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
 
  const titleName = req.params.title;
  const bookKeys = Object.keys(books);

  // filter books based on the provided title
  const filteredBooks = bookKeys
    .filter((key) =>
      books[key].title.toLowerCase().includes(titleName.toLowerCase())
    )
    .map((key) => books[key]);

  if (filteredBooks.length > 0) {
    return res.status(200).json(filteredBooks);
  } else {
    return res
      .status(404)
      .json({ message: "No books found with the provided title" });
  }
});

public_users.get('/books/title/:title', function(req,res){
    const get_title = new PromiseRejectionEvent((resolve,reject) => {
    const title = req.params.title;
    
        if (req.params.title <= 10){
        resolve(res.send(books[title]));    
        }

        else{
            reject(res.send('Title not found'));
        }
    });
    get_title.
    then(function(){
        console.log("Promise for Task 13 is resolved");
    }).
        catch(function () {
            console.log('Title not found');
        });
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
