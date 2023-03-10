import { useSelector } from 'react-redux';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Loader from './components/Loader';
import ProtectedRoute from './components/ProtectedRoute';
import PublicRoute from './components/PublicRoute';
import AdminBuses from './pages/Admin/AdminBuses';
import AdminUsers from './pages/Admin/AdminUsers';
import BookNow from './pages/BookNow';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  const {loading} = useSelector(state => state.alerts)
  return (
    <div>
      {loading && <Loader /> }
      <BrowserRouter>
        <Routes>
          <Route path = "/" element = {<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path = "/book-now/:id" element = {<ProtectedRoute><BookNow /></ProtectedRoute>} />
          <Route path = "/admin/buses" element = {<ProtectedRoute><AdminBuses /></ProtectedRoute>} />
          <Route path = "/admin/users" element = {<ProtectedRoute><AdminUsers /></ProtectedRoute>} />
          <Route path = "/register" element = {<PublicRoute><Register /></PublicRoute>} />
          <Route path = "/login" element = {<PublicRoute><Login /></PublicRoute>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
