const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const bookSchema = new mongoose.Schema({
  title: { type: String },
  author: { type: String },
  price: { type: Number },
});

bookSchema.plugin(AutoIncrement, { inc_field: "bookId" });

const Book = mongoose.model("Book", bookSchema);
module.exports = Book;