import { Route, Routes } from "react-router-dom"
import Friends from "../friends/friends"
import Home from "../home/home"
import Messenger from "../messenger/messenger"
import Online from "../online/online"


function Display() {
    return (
        <div className="display">
            <Routes>
                <Route path="/" index element={<Home />} />
                <Route path="/dfriends" element={<Friends />} />
                <Route path="/dmessenger" element={<Messenger />} />
                <Route path="/donline" element={<Online />} />
            </Routes>
        </div>
    )
}

export default Display