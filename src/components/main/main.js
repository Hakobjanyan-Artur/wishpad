import { useSelector } from "react-redux"
import { selectUsers } from "../../store/slices/userSlices/userSlices"
import { BsHouseDoor } from 'react-icons/bs';
import { FiUsers } from 'react-icons/fi';
import { BiSearchAlt2, BiRegistered } from 'react-icons/bi';
import { FaRegUser, FaBirthdayCake } from 'react-icons/fa';
import { GiSettingsKnobs } from 'react-icons/gi';
import { MdOutlineAttachEmail } from 'react-icons/md';
import { useEffect, useRef, } from "react";
import userDefaultImg from '../../images/user.png'
import { useNavigate } from "react-router-dom";
import Navbar from "../navbar/navbar";
import Display from "../display/display";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebasaConfig/FirebasaConfig";


function Main({ users, setOnline }) {
    const { user } = useSelector(selectUsers)
    const navigate = useNavigate()
    const leftRef = useRef(null)
    const middleRef = useRef(null)
    const rightRef = useRef(null)

    const userClick = () => {
        leftRef.current.style.display = 'none'
        rightRef.current.style.display = 'block'
        rightRef.current.style.width = '40%'
        middleRef.current.style.width = '60%'
    }
    const mainClick = () => {
        leftRef.current.style.display = 'block'
        rightRef.current.style.display = 'none'
    }

    const updateUser = async (id) => {
        const minutes = new Date().getMinutes()
        const userDoc = doc(db, "users", id)
        const newFileds = { min: minutes }
        await updateDoc(userDoc, newFileds)
    }

    useEffect(() => {

        if (!user) {
            navigate('/')
        }
        if (user) {
            updateUser(user.id)
            setInterval(() => {
                updateUser(user.id)
            }, 60000 * 3)
        }

    }, [])

    return (
        <div className="main">
            <div className="container">
                <div className="main-container">
                    <div ref={leftRef} className="left">
                        <div className="header">
                            <span
                                onClick={userClick}
                                className="user-icon">
                                <FaRegUser />
                            </span>
                            <div className="title">
                                <h2>Wish-Pad</h2>
                            </div>
                            <div className="search">
                                <span className="search-icon">
                                    <BiSearchAlt2 />
                                </span>
                                <input
                                    placeholder="Search users..."
                                    type="text" />
                            </div>
                            <div className="left-navbar">
                                <Navbar />
                            </div>
                        </div>
                        <div className="left-display">
                            <Display users={users} />
                        </div>
                    </div>
                    <div ref={middleRef} className="middle">
                        <div className="header">
                            <h2>Artur Hakobjanyan</h2>
                        </div>
                        <div className="section">

                        </div>
                    </div>
                    <div ref={rightRef} className="right">
                        <span
                            onClick={mainClick}
                            className="main-icon">
                            <BsHouseDoor />
                        </span>
                        <div className="settings">
                            <span
                                className="setting">
                                <GiSettingsKnobs />
                            </span>
                        </div>
                        <div className="user-image">
                            <div className="image">
                                <img src={userDefaultImg} alt="" />
                            </div>
                            <h3>{user?.name} {user?.lastname}</h3>
                            <h5>Country: {user?.homeland}</h5>
                            <h5>City: {user?.sity}</h5>
                        </div>
                        <div className="user-info">
                            <span className="friends user-info-icons">
                                <FiUsers /> <h4>Friends: </h4> <h5>{user?.friends.length}</h5>
                            </span>
                            <span className="email user-info-icons">
                                <MdOutlineAttachEmail /> <h4>Email: </h4> <h5>{user?.email}</h5>
                            </span>
                            <span className="birth user-info-icons">
                                <FaBirthdayCake /> <h4>Birth-Day: </h4> <h5>{user?.dateofbirth}</h5>
                            </span>
                            <span className="birth user-info-icons">
                                <BiRegistered /> <h4>Reg-Date: </h4> <h5>{user?.dateofreg}</h5>
                            </span>
                        </div>
                        <div className="media">
                            {user?.media.map((image) => (
                                <div key={image?.id} className="user-media-image">
                                    <img src={image?.img} alt="" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Main