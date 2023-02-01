import { GiSettingsKnobs } from 'react-icons/gi'
import userImages from '../../images/user.png'
import coverImage from '../../images/background.jpg'
import { useSelector } from 'react-redux'
import { selectUsers } from '../../store/slices/userSlices/userSlices'
import { useNavigate } from 'react-router-dom'
import { memo } from 'react'

function CurrentUser() {
    const { user } = useSelector(selectUsers)
    const navigate = useNavigate()
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