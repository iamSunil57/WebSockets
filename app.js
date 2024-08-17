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

// socket.emit("hi", {
//   greeting: "Hello! How are you?",
// });
// console.log("Someone has connected.");

// socket.on("sendData", (data) => {
//   if (data) {
//To give response to specific user:
//     io.to(socket.id).emit("response", "Thank you, your data is received.");
//     socket.emit("response", "Thank you, your data is received.");

//To give response to all connected user:
//     io.emit("response", "Thank you, your data is received.");

//   }
// });

// socket.on("disconnect", () => {
//   console.log("User Disconnected");
// });

// CRUD
io.on("connection", (socket) => {
  console.log("A user connected");

  // addBook:
  socket.on("addBook", async (data) => {
    try {
      if (data) {
        const { bookName, bookPrice } = data;
        const newBook = await Book.create({
          bookName,
          bookPrice,
        });

        //To give response:
        socket.emit("response", {
          status: 200,
          message: "Book created successfully.",
          data: newBook,
        });
      }
    } catch (error) {
      socket.emit("response", {
        status: 500,
        message: "Something went wrong.",
      });
    }
  });

  //getBook:
  socket.on("getBooks", async () => {
    try {
      const books = await Book.find();
      // console.log(books);
      socket.emit("response", {
        status: 200,
        message: "book fetched successfully.",
        data: books,
      });
    } catch (error) {
      socket.emit("response", {
        status: 500,
        message: "Something went wrong.",
      });
    }
  });

  //updateBook:
  socket.on("updateBook", async (data) => {
    try {
      if (data) {
        const { bookName, bookPrice, bookId } = data;
        const updatedBook = await Book.findByIdAndUpdate(
          bookId,
          {
            bookName,
            bookPrice,
          },
          //To set new data:
          {
            new: true,
          }
        );
        socket.emit("response", {
          status: 200,
          message: "Book updated successfully.",
          data: updatedBook,
        });
      }
    } catch (error) {
      socket.emit("response", {
        status: 500,
        message: "Something went wrong.",
      });
    }
  });

  //deleteBook
  socket.on("deleteBook", async (data) => {
    try {
      if (data) {
        const { bookId } = data;
        const deleteBook = await Book.findByIdAndDelete(bookId);
        socket.emit("response", {
          status: 200,
          message: "Book deleted successfully.",
        });
      }
    } catch (error) {
      socket.emit("response", {
        status: 500,
        message: "something went wrong.",
      });
    }
  });
});
