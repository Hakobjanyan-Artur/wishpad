import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import SignIn from './components/signIn/signIn';
import SignUp from './components/signUp/signUp';
import { collection, onSnapshot } from 'firebase/firestore'
import { db } from './components/firebasaConfig/FirebasaConfig';
import Main from './components/main/main';
import { useDispatch } from 'react-redux';
import { toggleUsers } from './store/slices/userSlices/userSlices';

function App() {
  const [users, setUsers] = useState([])
  const usersRef = collection(db, "users")
  const dispatch = useDispatch()


  const usersToggle = async () => {
    await onSnapshot(usersRef, (snapShot) => {
      let users = []
      snapShot.forEach((doc) => users.push({ ...doc.data(), id: doc.id }))
      setUsers(users)
      dispatch(toggleUsers(users))
    })
  }
  useEffect(() => {
    usersToggle()
  }, [])

  return (
    <div className="App">
      <Routes>
        <Route index element={<SignIn users={users} />} />
        <Route path='signup' element={<SignUp />} />
        <Route path='/main/*' element={<Main users={users} />} />
      </Routes>
    </div>
  );
}

export default App;
