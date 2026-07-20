const ProductCard = ({ product }) => {
  return (
    <div>
      <h3>{product.name}</h3>
      <p>Price: ${product.price}</p>
      <button>View Details</button>
    </div>
  );
};
export default ProductCard;