import { Route, Routes } from "react-router-dom"
import CurrentUser from "../currentUser/currentUser"
import Friends from "../friends/friends"
import Messenger from "../messenger/messenger"
import Online from "../online/online"
import Search from "../search/search"
import UserMedia from "../usermedia/userMedia"
import UserSetting from "../userSetting/userSetting"

function Display({ users, setAvatar, avatar }) {
    return (
        <div className="display">
            <Routes>
                <Route path="/" index element={<CurrentUser />} />
                <Route path="/dfriends" index element={<Friends />} />
                <Route path="/dmessenger" element={<Messenger />} />
                <Route path="/donline" element={<Online users={users} />} />
                <Route path="/dsearch" element={<Search users={users} />} />
                <Route path="/dusermedia" element={<UserMedia />} />
                <Route path="/dusersetting" element={<UserSetting avatar={avatar} setAvatar={setAvatar} />} />
            </Routes>
        </div>
    )
}

export default Display