import { useSelector } from "react-redux"
import { selectUsers } from "../../store/slices/userSlices/userSlices"
import { BsHouseDoor } from 'react-icons/bs';
import { FiUsers } from 'react-icons/fi';
import { TbBrandMessenger } from 'react-icons/tb';
import { HiOutlineStatusOnline } from 'react-icons/hi';
import { BiSearchAlt2 } from 'react-icons/bi';
import { FaRegUser } from 'react-icons/fa';
import { GiSettingsKnobs } from 'react-icons/gi';
import { useRef } from "react";
import userDefaultImg from '../../images/user.png'


function Main() {
    const { user } = useSelector(selectUsers)
    const leftRef = useRef(null)
    const middleRef = useRef(null)
    const rightRef = useRef(null)

    const userClick = () => {
        leftRef.current.style.display = 'none'
        rightRef.current.style.display = 'block'
        middleRef.current.style.width = '100%'
    }
    const mainClick = () => {
        leftRef.current.style.display = 'block'
        rightRef.current.style.display = 'none'
        middleRef.current.style.width = '100%'
    }

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
                            <div className="navbar">
                                <span className="icons"><BsHouseDoor /></span>
                                <span className="icons"><FiUsers /></span>
                                <span className="icons"><TbBrandMessenger /></span>
                                <span className="icons"><HiOutlineStatusOnline /></span>
                            </div>
                        </div>
                    </div>
                    <div ref={middleRef} className="middle">
                        <div className="header">
                            <h2>Artur Hakobjanyan</h2>
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
                            <h3>Name</h3>
                            <h5>Country: Arm</h5>
                            <h5>City: Goris</h5>
                        </div>
                        <div className="user-info">

                        </div>
                        <div className="media"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Main