import { Route, Routes } from "react-router-dom"
import ClickedByUser from "../clickedByUser/clickedByUser"
import ClickedUserMedia from "../clickedUserMedia/clickedUserMedia"
import CurrentUser from "../currentUser/currentUser"
import Friends from "../friends/friends"
import Messenger from "../messenger/messenger"
import Online from "../online/online"
import Search from "../search/search"
import UserMedia from "../usermedia/userMedia"
import UserSetting from "../userSetting/userSetting"

function Display({ users, setAvatar, avatar, coverImage, setCoverImage, info, setInfo, togglePass, setTogglePass, addimg, setAddImg }) {
    return (
        <div className="display">
            <Routes>
                <Route path="/" index element={<CurrentUser />} />
                <Route path="/dfriends" index element={<Friends />} />
                <Route path="/dmessenger" element={<Messenger />} />
                <Route path="/donline" element={<Online users={users} />} />
                <Route path="/dsearch" element={<Search users={users} />} />
                <Route path="/dclickedByUser" element={<ClickedByUser users={users} />} />
                <Route path="/dclickedUserMedia" element={<ClickedUserMedia users={users} />} />
                <Route path="/dusermedia" element={<UserMedia info={info} setInfo={setInfo} addimg={addimg} setAddImg={setAddImg} />} />
                <Route path="/dusersetting" element={<UserSetting info={info} setInfo={setInfo} togglePass={togglePass} setTogglePass={setTogglePass} coverImage={coverImage} setCoverImage={setCoverImage} avatar={avatar} setAvatar={setAvatar} />} />
            </Routes>
        </div>
    )
}

export default Display