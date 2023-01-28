import { useNavigate } from 'react-router-dom'
import userImage from '../../images/user.png'

function Online({ users }) {
    const navigate = useNavigate()
    let minutes = new Date().getMinutes()

    let onlineUsers = users.filter((user) => user.min < minutes + 5 && user.min > minutes - 5)

    return (
        <>
            {onlineUsers?.map((user) => (
                <div

                    key={user.id}
                    className="online-users">
                    <div className="user-image">
                        <img src={userImage} alt="" />
                        <div className='user-online'></div>
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

export default Online