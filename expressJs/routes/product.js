const express = require("express");
const productRouter = express.Router();
const productController = require("../controller/product");

productRouter.get("/ssr", productController.getAllProductsSSR);
productRouter.get("/ssr/add", productController.getAddForm);

// C R U D
// REST API is standard for API
// we do not have states in rest api
// Create Read Update Delete

// Create POST
productRouter.post("/", productController.createUser); // this is route

// Read GET /product
productRouter.get("/", productController.getAllProducts);

// READ GET /product/:id
productRouter.get("/:id", productController.getProduct);

// Update PUT /product/:id
// put is used to override
productRouter.put("/:id", productController.replaceProduct);

// Update PATCH /product/:id
// put is used to update new thing and do not touch old thing
// it only replace thing that is mentioned
productRouter.patch("/:id", productController.updateProduct);

// Delete DELETE /product/:id
// we cannot delete anything
productRouter.delete("/:id", productController.deleteProduct);

productRouter.get("/", (req, res) => {
  res.json({ type: "GET" });
}); // after sending response we need to end it it will not go further

productRouter.post("/", (req, res) => {
  res.json({ type: "POST" });
});

productRouter.put("/", (req, res) => {
  res.json({ type: "PUT" });
});

productRouter.patch("/", (req, res) => {
  res.json({ type: "PATCH" });
});

productRouter.delete("/", (req, res) => {
  res.json({ type: "DELETE" });
});

productRouter.get("/demo", (req, res) => {
  // res.send(`<h1>Hello</h1>`)
  // res.sendFile('./index.html', { root: __dirname })
  // in express we can directly send file using sendFile
  // we need to send absolute path of file
  res.json(products);
  // res.sendStatus(404)
  // res.status(404).json({ message: "Page Not Found" })
});

module.exports = productRouter;
