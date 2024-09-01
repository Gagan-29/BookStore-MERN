import express from "express";
import { Book } from "../models/Bookmodel.js";
const router = express.Router();
// create a book

router.post("/", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      res.status(400).send({ message: "Send all the required details" });
    }
    const newBook = {
      title: req.body.title,
      author: req.body.author,
      publishYear: req.body.publishYear,
    };
    const book = await Book.create(newBook);
    res.status(201).send(book);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
});

//route to get all the books

router.get("/", async (req, res) => {
  try {
    const books = await Book.find({});
    res.status(200).send({
      count: books.length,
      data: books,
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

//get one book

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const Singlebook = await Book.findById(id);
    if (!Singlebook) {
      return res.status(404).send({ message: "Book not found" });
    }
    return res.status(201).send(Singlebook);
  } catch (err) {
    res.status(501).send({ message: err.message });
  }
});

//update book

router.put("/:id", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res.status(400).send({ message: "Send all the required details" });
    }

    const { id } = req.params;
    const result = await Book.findByIdAndUpdate(id, req.body);
    if (!result) {
      return res.status(404).send({ message: "book not found" });
    }
    return res.status(200).send({ message: "Book updated Successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: err.message });
  }
});

//delete a book

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const item = await Book.findByIdAndDelete(id);
    if (!item) {
      return res.status(404).send({ message: "Book not found" });
    }
    return res.status(200).send({ message: "Book Deleted Succesfully" });
  } catch (err) {
    console.log(err);
    res.status(501).send({ message: err.message });
  }
});

export default router;
