import "./Product.css";

const Product = ({
  _id,
  title,
  thumbnail,
  price,
  discountPercentage,
  rating,
  handleClick,
}) => {
  const oldPrice = () => {
    const res = Math.floor(price / (1 - discountPercentage / 100));
    return res;
  };

  return (
    <>
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-3">
            <div className="card">
              <div className="image-container">
                <div className="first">
                  <div className="d-flex justify-content-between align-items-center">
                    <span className="discount">{discountPercentage}%</span>
                    <span className="wishlist" onClick={() => handleClick(_id)}>
                      <i className="fa fa-heart-o"></i>
                    </span>
                  </div>
                </div>

                <img
                  src={thumbnail}
                  className="img-fluid rounded thumbnail-image"
                  alt="thumbnail"
                />
              </div>

              <div className="product-detail-container p-2">
                <div className="d-flex justify-content-between align-items-center">
                  <h5 className="dress-name">{title}</h5>

                  <div className="d-flex flex-column mb-2">
                    <span className="new-price">
                      {" "}
                      <>&#8377;</>
                      {price}
                    </span>
                    <small className="old-price text-right">
                      {" "}
                      <>&#8377;</> {oldPrice()}
                    </small>
                  </div>
                </div>

                <div className="d-flex justify-content-between align-items-center pt-1">
                  <div>
                    <i className="fa fa-star-o rating-star"></i>
                    <span className="rating-number"> {rating}</span>
                  </div>

                  <span className="buy">BUY +</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;
