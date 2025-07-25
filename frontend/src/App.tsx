import { Signup } from './pages/Signup';
import { Signin } from './pages/Signin';
import { Dashboard } from './pages/Dashboard';
import  LandingPage  from './pages/LandingPage';
import PublicBrain from './pages/PublicBrain';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {

  return (
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/brain/:shareLink" element={<PublicBrain />} />
      </Routes>
      </BrowserRouter>
    
  )
}

export default App