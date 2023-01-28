import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import SignIn from './components/signIn/signIn';
import SignUp from './components/signUp/signUp';
import { collection, onSnapshot } from 'firebase/firestore'
import { db } from './components/firebasaConfig/FirebasaConfig';
import { useDispatch } from 'react-redux';
import { toggleUsers } from './store/slices/userSlices/userSlices';
import Main from './components/main/main';
import Home from './components/home/home';
import Friends from './components/friends/friends';
import Display from './components/display/display';
const currentUser = JSON.parse(localStorage.getItem('currentUser')) || null

function App() {
  const [users, setUsers] = useState([])
  const usersRef = collection(db, "users")
  const dispatch = useDispatch()

  const usersToggle = async () => {
    onSnapshot(usersRef, (snapShot) => {
      let users = []
      snapShot.forEach((doc) => users.push({ ...doc.data(), id: doc.id }))
      setUsers(users)
    })
  }

  useEffect(() => {
    usersToggle()
    if (currentUser) {
      dispatch(toggleUsers(currentUser))
    }

  }, [])

  return (
    <div className="App">
      <Routes>
        <Route index element={<SignIn users={users} />} />
        <Route path='signup' element={<SignUp />} />
        <Route path='main/*' element={<Main />} />
      </Routes>
    </div>
  );
}

export default App;
