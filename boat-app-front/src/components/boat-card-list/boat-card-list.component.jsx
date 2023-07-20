import BoatCard from '../boat-card/boat-card.component';
import './boat-card-list.styles.scss';

const BoatCardList = ({ boats }) => (
  <div className="boat-card-list">
    {boats.map((boat) => {
      return <BoatCard key={boat.id} boat={boat} />;
    })}
  </div>
);

export default BoatCardList;
