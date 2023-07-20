import { useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import BoatCardList from '../../components/boat-card-list/boat-card-list.component';
import SearchBox from '../../components/search-box/search-box.component';
import { AddNewBoatViewContext } from '../../contexts/add-new-boat-view.contexts';
import AddNewBoat from '../../components/add-new-boat/add-new-boat.component';
import { getAllBoats } from '../../utils/boat-app-back/boat-app-back';
import Button from '../../components/button/button.component';

import './home.styles.scss';

const Home = () => {
  const [searchField, setSearchField] = useState('');
  const [boats, setBoats] = useState([]);
  const [filteredBoats, setFilteredBoats] = useState(boats);
  const { newBoatView, setNewBoatView } = useContext(AddNewBoatViewContext);
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.user.currentUser);

  useEffect(() => {
    setNewBoatView(false);
  }, [setNewBoatView]);

  useEffect(() => {
    if (currentUser === null) {
      navigate('/authentication');
    } else {
      fetchData();
    }
  }, [currentUser, navigate, newBoatView]);

  useEffect(() => {
    const newFilteredBoats = boats.filter((boat) => {
      return boat.name.toLocaleLowerCase().includes(searchField);
    });

    setFilteredBoats(newFilteredBoats);
  }, [boats, searchField]);

  const fetchData = async () => {
    try {
      const boats = await getAllBoats();
      setBoats(boats);
    } catch (error) {
      console.error('Failed to fetch status', error);
    }
  };

  const onSearchChange = (event) => {
    const searchFieldString = event.target.value.toLocaleLowerCase();
    setSearchField(searchFieldString);
  };

  const onAddBoat = () => {
    setNewBoatView(!newBoatView);
  };

  return (
    <div className="app">
      <div className="btn-container">
        <Button onClick={onAddBoat} name="Add Boat" />
      </div>
      <SearchBox
        className="boats-search-box"
        onChangeHandler={onSearchChange}
        placeholder="Search boats"
      />
      {newBoatView ? <AddNewBoat /> : <div></div>}
      <BoatCardList boats={filteredBoats} />
    </div>
  );
};

export default Home;
