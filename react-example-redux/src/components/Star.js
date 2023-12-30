import './Star.css';

const Star = ({ isFavorite, onClick }) => {
  return (
    <div className={`star ${isFavorite ? 'favorite' : ''}`} onClick={onClick}>
      ★
    </div>
  );
};

export default Star;
