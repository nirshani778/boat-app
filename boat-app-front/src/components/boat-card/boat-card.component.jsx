import { Link } from 'react-router-dom';
import './boat-card.styles.scss';

const BoatCard = ({ boat }) => {
  const { id, name, description, imageUrl } = boat;

  return (
    <Link to="/boatDetailView" state={{ from: boat }}>
      <div className="boat-card-container" key={id}>
        <div className="boat-card-img">
          <img alt={`boat ${name}`} src={imageUrl} />
        </div>
        <hr className="splitter" />
        <div className="boat-card-content">
          <h2>{name}</h2>
          <p>{description}</p>
        </div>
      </div>
    </Link>
  );
};

export default BoatCard;
