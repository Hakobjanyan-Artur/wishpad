import { memo } from 'react'
import { useDispatch } from 'react-redux'
import userImage from '../../images/user.png'
import { toggleId } from '../../store/slices/userSlices/userSlices'

function Users({ users }) {
    const dispatch = useDispatch()
    let date = new Date()
    let day = date.getDate().toString()
    let mounth = date.getUTCMonth() + 1
    mounth = mounth.toString()
    let hour = date.getHours()
    let minutes = date.getMinutes()


    return (
        <>
            {users?.map((user) => (
                <div
                    onClick={() => dispatch(toggleId(user.id))}
                    key={user?.id}
                    className="home-users">
                    <div className="user-image">
                        <div
                            style={{
                                background: user.mounth === mounth && user.day === day && user.hour === hour && user.minutes <= minutes + 5 && user.minutes >= minutes - 5 ? '' : 'red'
                            }}
                            className='user-online'></div>
                        <img src={userImage} alt="" />
                    </div>
                    <div className='user-home-left'>
                        <h3>{user?.name} {user?.lastname}</h3>
                        <h5>{user?.sity} {user?.homeland}</h5>
                    </div>
                </div>
            ))}
        </>
    )
}

export default memo(Users)