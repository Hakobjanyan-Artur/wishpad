import { useSelector } from "react-redux"
import { selectUsers } from "../../store/slices/userSlices/userSlices"
import { BiSearchAlt2 } from 'react-icons/bi';
import { useEffect, useRef, } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../navbar/navbar";
import Display from "../display/display";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebasaConfig/FirebasaConfig";
import Users from "../users/users";


function Main({ users }) {
    const { user } = useSelector(selectUsers)
    const navigate = useNavigate()
    const leftRef = useRef(null)
    const middleRef = useRef(null)

    const updateUser = async (id) => {
        let date = new Date()
        let day = date.getDate().toString()
        let mounth = date.getUTCMonth() + 1
        mounth = mounth.toString()
        let hour = date.getHours()
        let minutes = date.getMinutes()

        const userDoc = doc(db, "users", id)
        const newFileds = {
            mounth: mounth,
            day: day,
            hour: hour,
            minutes: minutes
        }
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
            }, 60000)
        }

    }, [])

    return (
        <div className="main">
            <div className="container">
                <div className="main-container">
                    <div ref={leftRef} className="left">
                        <div className="header">
                            <div className="title">
                                <h2>Wish-Pad</h2>
                            </div>
                            <div className="search">
                                <span className="search-icon">
                                    <BiSearchAlt2 />
                                </span>
                                <input
                                    onFocus={() => navigate('/main/dsearch')}
                                    placeholder="Search users..."
                                    type="text" />
                            </div>
                            <div className="left-navbar">
                                <Navbar />
                            </div>
                        </div>
                        <div className="left-display">
                            <Users users={users} />
                        </div>
                    </div>
                    <div ref={middleRef} className="middle">
                        <div className="header">
                            <h2>{user?.name} {user?.lastname}</h2>
                        </div>
                        <div className="section">
                            <Display users={users} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Main