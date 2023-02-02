import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { selectUsers, toggleId } from '../../store/slices/userSlices/userSlices'

function Online() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { user } = useSelector(selectUsers)
    let date = new Date()
    let day = date.getDate().toString()
    let mounth = date.getUTCMonth() + 1
    mounth = mounth.toString()
    let hour = date.getHours()
    let minutes = date.getMinutes()
    const { users } = useSelector(selectUsers)

    const clickOnlineUser = (onlineId) => {
        dispatch(toggleId(onlineId))
        navigate('/main/dclickedByUser')
    }


    let onlineUsers = users.filter((user) => user.mounth === mounth && user.day === day && user.hour === hour && user.minutes <= minutes + 5 && user.minutes >= minutes - 5)

    useEffect(() => {
        if (!user) {
            if (!user) {
                navigate('/')
            }
        }
    }, [])


    return (
        <div className='online'>
            {onlineUsers?.map((online) => (
                <div
                    onClick={() => clickOnlineUser(online.id)}
                    key={online?.id}
                    className="online-users">
                    <div className="user-image">
                        <img src={`https://firebasestorage.googleapis.com/v0/b/artchat-86d4b.appspot.com/o/avatar%2F${online?.avatar}?alt=media&token=14d679a8-2733-45ec-b62e-3de52bc99025`} alt="" />
                        <div className='user-online'></div>
                    </div>
                    <div className='online-left'>
                        <div className='name'><h2>{online?.name} {online?.lastname}</h2></div>
                        <div className='country'><h4>{online?.city} {online?.homeland}</h4></div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Online