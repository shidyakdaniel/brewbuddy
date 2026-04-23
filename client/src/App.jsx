import { Navigate, Route, Routes } from 'react-router-dom';

import Layout from './components/Layout.jsx';
import { AuthProvider, useAuth } from './context/AuthContext.jsx';
import Home from './pages/Home.jsx';
import BeerDetail from './pages/BeerDetail.jsx';
import Favorites from './pages/Favorites.jsx';
import Recommendations from './pages/Recommendations.jsx';
import Tried from './pages/Tried.jsx';
import Stores from './pages/Stores.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';

function RequireAuth({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="card small">Loading...</div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default function App() {
  return (
    <AuthProvider>
      <Layout>
        <Routes>
          <Route
            path="/"
            element={
              <RequireAuth>
                <Home />
              </RequireAuth>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/beers/:id"
            element={
              <RequireAuth>
                <BeerDetail />
              </RequireAuth>
            }
          />
          <Route
            path="/favorites"
            element={
              <RequireAuth>
                <Favorites />
              </RequireAuth>
            }
          />
          <Route
            path="/tried"
            element={
              <RequireAuth>
                <Tried />
              </RequireAuth>
            }
          />
          <Route
            path="/recommendations"
            element={
              <RequireAuth>
                <Recommendations />
              </RequireAuth>
            }
          />
          <Route
            path="/stores"
            element={
              <RequireAuth>
                <Stores />
              </RequireAuth>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </AuthProvider>
  );
}
