import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { selectUsers, toggleId } from "../../store/slices/userSlices/userSlices"

function Friends() {
    const navigate = useNavigate()
    const { user } = useSelector(selectUsers)
    const dispatch = useDispatch()

    const clickFriendUser = (friendId) => {
        dispatch(toggleId(friendId))
        navigate('/main/dclickedByUser')
    }

    useEffect(() => {
        if (!user) {
            navigate('/')
        }
    }, [])

    return (
        <div className="friends">
            {user?.friends.map((friend) => (
                <div
                    onClick={() => clickFriendUser(friend.id)}
                    className="friends-content">
                    <div className="fr-left">
                        <div className="fr-images">
                            <img src={`https://firebasestorage.googleapis.com/v0/b/artchat-86d4b.appspot.com/o/avatar%2F${friend?.avatar}?alt=media&token=14d679a8-2733-45ec-b62e-3de52bc99025`} alt="" />
                        </div>
                    </div>
                    <div className="fr-right">
                        <div className="frined-name"><h2>{friend?.name} {friend?.lastname}</h2></div>
                        <div className="friend-country"><h4>{friend?.City} {friend?.country}</h4></div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Friends