const express = require("express");
const mongoose = require("mongoose");
const Book = require("../model/book");
const router = express.Router();
const auth = require("../middleware/auth");

// router.use(auth);

/**
 * @swagger
 * /api/v1/books:
 *   get:
 *     summary: Get all books
 *     tags: [Books]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: List of books
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Book'
 *       401:
 *         description: Unauthorized
 */
// Get all books
router.get("/api/v1/books", auth, async (req, res) => {
  try {
    const books = await Book.find({});
    res.send(books);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

/**
 * @swagger
 * /api/v1/books:
 *   post:
 *     summary: Create a new book
 *     tags: [Books]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Book'
 *     responses:
 *       201:
 *         description: Book created successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (admin role required)
 */
// Create a new book
router.post("/api/v1/books", auth, async (req, res) => {
  try {
    const bookObj = new Book({
      title: req.body.title,
      author: req.body.author,
      price: req.body.price,
    });
    const books = await bookObj.save();
    res.send(books);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

/**
 * @swagger
 * /api/v1/books/{id}:
 *   put:
 *     summary: Update a book
 *     tags: [Books]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: The book ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Book'
 *     responses:
 *       200:
 *         description: Book updated successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (admin role required)
 */
// Update a book
router.put("/api/v1/books/:bookId", auth, async (req, res) => {
  try {
    const id = Number(req.params.bookId);
    const stdquery = { bookId: id };
    const bookObj = await Book.updateOne(stdquery, req.body);
    res.send(bookObj);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

/**
 * @swagger
 * /api/v1/books/{id}:
 *   delete:
 *     summary: Delete a book
 *     tags: [Books]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: The book ID
 *     responses:
 *       200:
 *         description: Book deleted successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (admin role required)
 */
// Delete a book
router.delete("/api/v1/books/:bookId",auth, async (req, res) => {
  try {
    const id = req.params.bookId;
    const deleteResult = await Book.deleteOne({ bookId: id });
    res.send(deleteResult);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});
 
module.exports = router;