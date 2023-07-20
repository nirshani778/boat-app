import { Route, Routes } from 'react-router-dom';

import './App.css';
import Home from './routes/home/home.component';
import Navigation from './routes/navigation/navigation.component';
import Authentication from './routes/authentication/authentication.component';
import BoatDetailView from './routes/boat-detail-view/boat-detail-view.component';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="authentication" element={<Authentication />} />
        <Route path="boatDetailView" element={<BoatDetailView />} />
      </Route>
    </Routes>
  );
};

export default App;
