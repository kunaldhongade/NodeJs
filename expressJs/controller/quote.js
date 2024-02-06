const { Quote } = require("../model/Quote");
const ejs = require("ejs");
const path = require("path");

exports.getAllQuotesSSR = async (req, res) => {
  const quotes = await Quote.find();

  ejs.renderFile(
    path.resolve(__dirname, "../pages/quotes.ejs"),
    { quotes },
    (err, str) => {
      if (err) {
        console.error(err);
        res.status(500).json(err);
      } else {
        res.status(200).send(str);
      }
    }
  );
};

exports.getAddQuoteForm = async (req, res) => {
  ejs.renderFile(
    path.resolve(__dirname, "../pages/addQuote.ejs"),
    (err, str) => {
      if (err) {
        console.error(err);
        res.status(500).json(err);
      } else {
        res.status(200).send(str);
      }
    }
  );
};

exports.createQuote = async (req, res) => {
  try {
    const quote = new Quote(req.body);
    await quote.save();
    res.status(201).json(quote);
  } catch (error) {
    if (error.code === 11000) {
      console.error("Duplicate key error. Document already exists!");
      res.status(400).json(error);
    } else {
      console.error("An error occurred:", error);
      res.status(400).json(error);
    }
  }
};

exports.getAllQuotes = async (req, res) => {
  try {
    const quotes = await Quote.find();
    res.status(200).json(quotes);
  } catch (error) {
    console.error(error);
    res.status(500).json(error, req);
  }
};
exports.getQuote = async (req, res) => {
  try {
    const id = req.params.id;
    const quote = await Quote.findById(id);
    res.status(200).json(quote);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
};
exports.deleteQuote = async (req, res) => {
  try {
    const id = req.params.id;
    const quote = await Quote.findByIdAndDelete(id);
    res.status(200).json(quote);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
};
exports.replaceQuote = async (req, res) => {
  try {
    const id = req.params.id;
    const doc = await Quote.findOneAndReplace({ _id: id }, req.body, {
      new: true,
    });
    res.status(200).json(doc);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
};
exports.updateQuote = async (req, res) => {
  try {
    const id = req.params.id;
    const doc = await Quote.findOneAndUpdate({ _id: id }, req.body, {
      new: true,
    });
    res.status(200).json(doc);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
};
