import { useSelector } from "react-redux"
import { selectUsers } from "../../store/slices/userSlices/userSlices"
import coverImage from '../../images/background.jpg'
import userImages from '../../images/user.png'
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"


function ClickedByUser() {
    const { id, users, user } = useSelector(selectUsers)
    const [clickedUser, setClickedUser] = useState(null)
    const navigate = useNavigate()


    useEffect(() => {

        if (users) {
            for (const userId of users) {
                if (userId?.id === id) {
                    setClickedUser(userId)
                }
            }
        }
    }, [])



    useEffect(() => {
        if (!user) {
            navigate('/')
        }
    }, [])

    return (
        <div className="click-by-user">
            <header
                style={{
                    backgroundImage: `url(${clickedUser?.coverImage ? `https://firebasestorage.googleapis.com/v0/b/artchat-86d4b.appspot.com/o/cover%2F${clickedUser?.coverImage}?alt=media&token=31846fa8-f67a-463a-947e-59a415c1ec87` : coverImage})`,
                }}
            >
                <div className='click-user-content'>
                    <div className='click-user-images'>
                        <img src={clickedUser?.avatar ? `https://firebasestorage.googleapis.com/v0/b/artchat-86d4b.appspot.com/o/avatar%2F${clickedUser?.avatar}?alt=media&token=14d679a8-2733-45ec-b62e-3de52bc99025` : userImages} alt="" />
                    </div>
                    <div className='click-user-name'>
                        <h2>{clickedUser?.name}  {clickedUser?.lastname}</h2>
                    </div>
                    <div className='click-user-location'>
                        <h3>Location: {clickedUser?.city ? clickedUser?.city + ', ' + clickedUser?.homeland : 'Not filled'}</h3>
                    </div>
                </div>
            </header>
            <section>
                <div className='click-user-section-left'>
                    <h2>Information</h2>
                    <div className='click-user-info'>
                        <h3>Date of birth: </h3>
                        <h5>{clickedUser?.dateofbirth}</h5>
                    </div>
                    <div className='click-user-info'>
                        <h3>Date of registration: </h3>
                        <h5>{clickedUser?.dateofreg}</h5>
                    </div>
                    <div className='click-user-info'>
                        <h3>Email: </h3>
                        <h5>{clickedUser?.email}</h5>
                    </div>
                    <div className='click-user-info'>
                        <h3>City: </h3>
                        <h5>{clickedUser?.sity ? clickedUser?.sity : 'Not filled'}</h5>
                    </div>
                    <div className='click-user-info'>
                        <h3>Country</h3>
                        <h5>{clickedUser?.homeland ? clickedUser?.homeland : 'Not filled'}</h5>
                    </div>
                </div>
                <div
                    className='click-user-section-middle'>
                    <h2>Friends | {clickedUser?.friends.length}</h2>
                </div>
                <div
                    onClick={() => navigate('/main/dclickedUserMedia')}
                    className='click-user-section-right'>
                    <h2>Media | {clickedUser?.media.length}</h2>
                    <div className='click-user-media'>
                        {clickedUser?.media.map((mediaId) => (
                            <div key={mediaId} className='click-user-media-img'>
                                <img src={`https://firebasestorage.googleapis.com/v0/b/artchat-86d4b.appspot.com/o/images%2F${clickedUser?.id}%2F%20${mediaId}?alt=media&token=96295942-b104-4f9d-b704-60c8e0f76b13`} alt="" />
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}

export default ClickedByUser