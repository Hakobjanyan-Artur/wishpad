import { GiSettingsKnobs } from 'react-icons/gi'
import { MdCircleNotifications } from 'react-icons/md'
import userImages from '../../images/user.png'
import coverImage from '../../images/background.jpg'
import { useSelector } from 'react-redux'
import { selectUsers } from '../../store/slices/userSlices/userSlices'
import { useNavigate } from 'react-router-dom'
import { memo, useEffect, useState } from 'react'
import { doc, updateDoc } from 'firebase/firestore'
import { db } from '../firebasaConfig/FirebasaConfig'


function CurrentUser() {
    const { user, users } = useSelector(selectUsers)
    const [requestUser, setRequestUser] = useState([])
    const [modalRequest, setModalRequest] = useState(false)
    const navigate = useNavigate()

    const updateUser = async (reqUser) => {

        const userDoc = doc(db, "users", user.id)
        const newFileds = {
            friends: [
                ...user.friends,
                reqUser
            ]
        }
        await updateDoc(userDoc, newFileds)
    }
    const updateRequestUser = async (reqUser) => {

        const userDoc = doc(db, "users", reqUser?.id)
        const newFileds = {
            friends: [
                ...reqUser.friends,
                user
            ]
        }
        await updateDoc(userDoc, newFileds)
    }

    const friendReqDel = async (reqUser) => {

        const userDoc = doc(db, "users", user?.id)
        const newFileds = {
            friendRequest: user.friendRequest.filter(el => el !== reqUser?.id)
        }
        await updateDoc(userDoc, newFileds)
    }


    const accClick = (reqUser) => {
        updateUser(reqUser)
        updateRequestUser(reqUser)
        friendReqDel(reqUser)
        setModalRequest(!modalRequest)
    }

    const rejectClick = (reqUser) => {
        friendReqDel(reqUser)
    }

    const requestUsFunc = () => {
        let reqFriends = []
        let friends = []
        users?.forEach(el => {
            reqFriends.unshift(...el.friendRequest)
        })
        reqFriends.filter(el => {
            users?.forEach(forel => {
                if (forel?.id === el) {
                    friends.unshift(forel)
                }
            })
        })
        setRequestUser([
            ...friends
        ])
    }


    useEffect(() => {
        if (!user) {
            navigate('/')
        }
        if (user?.friendRequest.length > 0) {
            requestUsFunc()
        }

    }, [])

    return (
        <div
            className="current-user">
            <header
                style={{
                    background: `url(${user?.coverImage ? `https://firebasestorage.googleapis.com/v0/b/artchat-86d4b.appspot.com/o/cover%2F${user?.coverImage}?alt=media&token=31846fa8-f67a-463a-947e-59a415c1ec87` : coverImage})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                }}
            >
                <div className='content'>
                    <div className='settings'>
                        <span
                            onClick={() => navigate('/main/dusersetting')}
                            title='Setting'
                            className='setting-icon'>
                            <GiSettingsKnobs />
                        </span>
                    </div>
                    <div className='images'>
                        <img src={user?.avatar ? `https://firebasestorage.googleapis.com/v0/b/artchat-86d4b.appspot.com/o/avatar%2F${user?.avatar}?alt=media&token=14d679a8-2733-45ec-b62e-3de52bc99025` : userImages} alt="" />
                    </div>
                    <div className='name'>
                        <h2>{user?.name}  {user?.lastname}</h2>
                    </div>
                    <div className='location'>
                        <h3>Location: {user?.city ? user?.city + ', ' + user?.homeland : 'Not filled'}</h3>
                        <div
                            onClick={() => setModalRequest(!modalRequest)}
                            className='request-friend'>
                            <div
                                style={{
                                    display: modalRequest ? 'flex' : 'none'
                                }}
                                className='notificate-content'>
                                <h4 className='request-title'>Friend Request</h4>
                                {requestUser.length > 0 ? requestUser?.map((reqUser) => (
                                    <div key={reqUser?.id} className='req-user-content'>
                                        <div
                                            className='req-cont-image'>
                                            <img src={`https://firebasestorage.googleapis.com/v0/b/artchat-86d4b.appspot.com/o/avatar%2F${reqUser?.avatar}?alt=media&token=14d679a8-2733-45ec-b62e-3de52bc99025`} alt="" />
                                        </div>
                                        <div className='user-info'>
                                            <div className='info-content'>
                                                <h5>{reqUser?.name} {reqUser?.lastname}</h5>
                                                <h6>{reqUser?.city} {reqUser?.homeland}</h6>
                                            </div>
                                            <div className='req-btns'>
                                                <button onClick={() => accClick(reqUser)} >Acc</button>
                                                <button onClick={() => rejectClick(reqUser)} >Reject</button>
                                            </div>
                                        </div>
                                    </div>
                                )) : <div className='request-null'><h6>No request</h6></div>

                                }

                            </div>
                            <MdCircleNotifications />
                            <div
                                style={{
                                    display: user?.friendRequest.length === 0 ? 'none' : 'flex'
                                }}
                                className='request-friends-count'>
                                <span className='req-count-cont'>
                                    {user?.friendRequest.length}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <section>
                <div className='section-left'>
                    <h2>Information</h2>
                    <div className='info'>
                        <h3>Date of birth: </h3>
                        <h5>{user?.dateofbirth}</h5>
                    </div>
                    <div className='info'>
                        <h3>Date of registration: </h3>
                        <h5>{user?.dateofreg}</h5>
                    </div>
                    <div className='info'>
                        <h3>Email: </h3>
                        <h5>{user?.email}</h5>
                    </div>
                    <div className='info'>
                        <h3>City: </h3>
                        <h5>{user?.sity ? user?.sity : 'Not filled'}</h5>
                    </div>
                    <div className='info'>
                        <h3>Country</h3>
                        <h5>{user?.homeland ? user?.homeland : 'Not filled'}</h5>
                    </div>
                </div>
                <div
                    onClick={() => navigate('/main/dfriends')}
                    className='section-middle'>
                    <h2>Friends | {user?.friends.length}</h2>
                    <div className='current-user-friends'>
                        {user?.friends.map((friend) => (
                            <div
                                key={friend?.id}
                                className='friend-content'>
                                <div className='fr-cont-left'>
                                    <div className='fr-image'>
                                        <img src={`https://firebasestorage.googleapis.com/v0/b/artchat-86d4b.appspot.com/o/avatar%2F${friend?.avatar}?alt=media&token=14d679a8-2733-45ec-b62e-3de52bc99025`} alt="" />
                                    </div>
                                </div>
                                <div className='fr-cont-right'>
                                    <div className='friend-name'><h4>{friend?.name} {friend?.lastname}</h4></div>
                                    <div className='friend-country'><h6>{friend?.city} {friend?.homeland}</h6></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div
                    onClick={() => navigate('/main/dusermedia')}
                    className='section-right'>
                    <h2>Media | {user?.media.length}</h2>
                    <div className='media'>
                        {user?.media.map((mediaId) => (
                            <div key={mediaId} className='media-img'>
                                <img src={`https://firebasestorage.googleapis.com/v0/b/artchat-86d4b.appspot.com/o/images%2F${user?.id}%2F%20${mediaId}?alt=media&token=96295942-b104-4f9d-b704-60c8e0f76b13`} alt="" />
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}

export default memo(CurrentUser)