import { GiSettingsKnobs } from 'react-icons/gi'
import userImages from '../../images/user.png'
import coverImage from '../../images/background.jpg'
import { useSelector } from 'react-redux'
import { selectUsers } from '../../store/slices/userSlices/userSlices'
import { useNavigate } from 'react-router-dom'

function CurrentUser() {
    const { user } = useSelector(selectUsers)
    const navigate = useNavigate()
    return (
        <div

            className="current-user">
            <header
                style={{
                    background: `url(${user?.coverImage ? `https://firebasestorage.googleapis.com/v0/b/artchat-86d4b.appspot.com/o/cover%2F${user.coverImage}?alt=media&token=31846fa8-f67a-463a-947e-59a415c1ec87` : coverImage})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    backgroundPosition: 'bottom',
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
                        <h2>{user?.name} {user?.lastname}</h2>
                    </div>
                    <div className='location'>
                        <h3>Location: {user?.sity ? user?.sity + ',' + user?.homeland : 'Not filled'}</h3>
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
                </div>
            </section>
        </div>
    )
}

export default CurrentUser