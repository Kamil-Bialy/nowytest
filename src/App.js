import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './App.css';
import StartPage from './pages/StartPage';
import ParticipantsPage from './pages/ParticipantsPage';
import BookingArivePage from './pages/BookingArivePage';
import StoriesPage from './pages/StoriesPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import UserContextProvider from './store/user-context';
import ProtectedRoute from './components/ReactRouter/ProtectedRoute';

function App() {
  return (
    <UserContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<StartPage />} />
          <Route path='/lista-uczestnikow' element={<ParticipantsPage />} />
          <Route path='/potwierdz-przybycie' element={<BookingArivePage />} />
          <Route path='/historie-absolwentow' element={<StoriesPage />} />
          <Route
            path='/logowanie'
            element={
              <ProtectedRoute>
                <LoginPage />
              </ProtectedRoute>
            }
          />
          <Route
            path='/rejestracja'
            element={
              <ProtectedRoute>
                <RegisterPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </UserContextProvider>
  );
}

export default App;
