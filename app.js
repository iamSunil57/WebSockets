const express = require("express");
const app = express();
const { Server } = require("socket.io");
const connectToDatabase = require("./database");
const Book = require("./model/bookModel");

connectToDatabase();

const server = app.listen(4000, () => {
  console.log("Server has started at port 4000");
});

const io = new Server(server);

// CRUD
io.on("connection", (socket) => {
  console.log("A user connected");
  // addBook

  // socket.on('addBook',async (data)=>{
  //     try {
  //         if(data){
  //             const {bookName,bookPrice} = data
  //             const newBook = await Book.create({
  //                 bookName,
  //                 bookPrice
  //             })
  //             socket.emit("response",{status : 200, message : "Book created successfully",data:newBook})
  //         }
  //     } catch (error) {
  //         socket.emit("response",{status : 500, message : "Something went wrong"})
  //     }
  // })

  // // getBooks
  // socket.on("getBooks",async ()=>{
  //     try {
  //         const books = await Book.find()
  //         console.log(books)
  //         socket.emit("response",{status : 200, message:"Book fetched",data:books})
  //     } catch (error) {
  //         socket.emit("response",{status : 500, message : "Something went wrong"})
  //     }
  // })

  // //updateBook
  // socket.on("updateBook",async (data)=>{
  //     try {
  //         if(data){
  //             const {bookName,bookPrice,bookId} = data
  //            const updatedBook  = await Book.findByIdAndUpdate(bookId,{
  //                bookName,
  //                bookPrice
  //             },{
  //                 new : true
  //             })
  //             socket.emit("response",{status : 200, message:"Book updated",data:updatedBook})
  //         }
  //     } catch (error) {
  //         socket.emit("response",{status : 500, message : "Something went wrong"})
  //     }
  // })

  // // deleteBook
  // socket.on("deleteBook",async(data)=>{
  //     try {
  //         if(data){
  //             const {bookId} = data
  //             await Book.findByIdAndDelete(bookId)
  //             socket.emit("response",{status : 200, message:"Book deleted"})

  //         }
  //     } catch (error) {
  //         socket.emit("response",{status : 500, message : "Something went wrong"})

  //     }
  // })
});
