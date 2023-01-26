import { Route, Routes } from 'react-router-dom';
import './App.css';
import SignIn from './components/signIn/signIn';
import SignUp from './components/signUp/signUp';

function App() {

  return (
    <div className="App">
      <Routes>
        <Route index element={<SignIn />} />
        <Route path='signup' element={<SignUp />} />
      </Routes>
    </div>
  );
}

export default App;
