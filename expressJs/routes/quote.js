const express = require("express");
const quoteRouter = express.Router();
const quoteController = require("../controller/quote");

quoteRouter
  .get("/ssr", quoteController.getAllQuotesSSR)
  .get("/ssr/add", quoteController.getAddQuoteForm)
  .post("/", quoteController.createQuote)
  .get("/", quoteController.getAllQuotes)
  .get("/:id", quoteController.getQuote)
  .delete("/:id", quoteController.deleteQuote)
  .put("/:id", quoteController.replaceQuote)
  .patch("/:id", quoteController.updateQuote);

module.exports = quoteRouter;
