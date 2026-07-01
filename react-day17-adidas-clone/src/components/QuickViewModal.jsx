function QuickViewModal({
  product,
  onClose,
}) {
  if (!product) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <button
          className="close-btn"
          onClick={onClose}
        >
          X
        </button>

        <img
          src={product.image}
          alt={product.name}
        />

        <h2>{product.name}</h2>

        <h3>{product.price}</h3>

        <button>
          ADD TO BAG
        </button>
      </div>
    </div>
  );
}

export default QuickViewModal;