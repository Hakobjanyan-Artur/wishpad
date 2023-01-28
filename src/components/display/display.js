import { Route, Routes } from "react-router-dom"
import Friends from "../friends/friends"
import Home from "../home/home"
import Messenger from "../messenger/messenger"
import Online from "../online/online"


function Display({ users }) {
    return (
        <div className="display">
            <Routes>
                <Route path="/" index element={<Home users={users} />} />
                <Route path="/dfriends" element={<Friends />} />
                <Route path="/dmessenger" element={<Messenger />} />
                <Route path="/donline" element={<Online users={users} />} />
            </Routes>
        </div>
    )
}

export default Display