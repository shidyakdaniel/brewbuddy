import { Navigate, Route, Routes } from 'react-router-dom';

import Layout from './components/Layout.jsx';
import Home from './pages/Home.jsx';
import BeerDetail from './pages/BeerDetail.jsx';
import Favorites from './pages/Favorites.jsx';
import Recommendations from './pages/Recommendations.jsx';
import Tried from './pages/Tried.jsx';
import Stores from './pages/Stores.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/beers/:id" element={<BeerDetail />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/tried" element={<Tried />} />
        <Route path="/recommendations" element={<Recommendations />} />
        <Route path="/stores" element={<Stores />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  );
}
