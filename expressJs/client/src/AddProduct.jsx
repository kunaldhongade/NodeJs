import axios from "axios";
import React, { useState } from "react";
const AddProduct = () => {
  const [product, setProduct] = useState({});

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(product);
    addProduct(product);
  };

  const addProduct = async (product) => {
    const res = await axios.post("/products", product);

    console.log(res.data);
  };

  const requiredProp = [
    "title",
    "description",
    "brand",
    "category",
    "thumbnail",
  ];

  return (
    <form className="form-horizontal" onSubmit={handleSubmit}>
      <fieldset>
        {/* Form Name */}
        <legend>Add Product</legend>
        {/* Text input */}
        <div className="form-group">
          <label htmlFor="title" className="col-md-8 control-label">
            Title{" "}
            {requiredProp.includes("title") && (
              <span style={{ color: "red" }}> *</span>
            )}
          </label>
          <div className="col-md-8">
            <input
              type="text"
              id="title"
              name="title"
              placeholder="title"
              className="form-control input-md"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="description" className="col-md-8 control-label">
            description
          </label>
          <div className="col-md-8">
            <input
              type="text"
              id="description"
              name="description"
              placeholder="description"
              className="form-control input-md"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="price" className="col-md-8 control-label">
            Price
          </label>
          <div className="col-md-8">
            <input
              id="price"
              name="price"
              type="text"
              className="form-control input-md"
              placeholder="discount percentage"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="form-group">
          <label
            htmlFor="discountPercentage"
            className="col-md-8 control-label"
          >
            Discount
          </label>
          <div className="col-md-8">
            <input
              id="discountPercentage"
              name="discountPercentage"
              type="text"
              className="form-control input-md"
              placeholder="discount percentage"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="rating" className="col-md-8">
            Rating
          </label>
          <div className="col-md-8">
            <input
              type="text"
              className="form-control input-md"
              name="rating"
              id="rating"
              placeholder="rating"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="brand" className="col-md-8">
            Brand
          </label>
          <div className="col-md-8">
            <input
              type="text"
              className="form-control input-md"
              id="brand"
              name="brand"
              placeholder="Enter Brand Name eg. Apple"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="category" className="col-md-8 control-label">
            Category
          </label>
          <div className="col-md-8">
            <select
              name="category"
              id="category"
              className="form-control input-md"
              defaultValue="defaultSelect"
              onChange={handleChange}
            >
              <option value="defaultSelect" hidden>
                Please Select Category
              </option>
              <option value="smartphones">smartphones</option>
              <option value="laptops">laptops</option>
              <option value="fragrances">fragrances</option>
              <option value="skincare">skincare</option>
              <option value="groceries">groceries</option>
              <option value="home-decoration">home-decoration</option>
            </select>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="thumbnail" className="col-md-8">
            Thumbnail
          </label>
          <div className="col-md-8">
            <input
              type="text"
              onChange={handleChange}
              name="thumbnail"
              id="thumbnail"
              className="form-control input-md"
              placeholder="Enter URL for thumbnail img"
            />
          </div>
        </div>
        <div className="form-group">
          <div className="col-md-8">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </div>
      </fieldset>
    </form>
  );
};

export default AddProduct;
