import { Route, Routes } from "react-router-dom"
import CurrentUser from "../currentUser/currentUser"
import Friends from "../friends/friends"
import Messenger from "../messenger/messenger"
import Online from "../online/online"
import Search from "../search/search"

function Display({ users }) {
    return (
        <div className="display">
            <Routes>
                <Route path="/" index element={<CurrentUser />} />
                <Route path="/dfriends" index element={<Friends />} />
                <Route path="/dmessenger" element={<Messenger />} />
                <Route path="/donline" element={<Online users={users} />} />
                <Route path="/dsearch" element={<Search users={users} />} />
            </Routes>
        </div>
    )
}

export default Display