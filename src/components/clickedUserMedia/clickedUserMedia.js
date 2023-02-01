import { useState } from "react"
import { useSelector } from "react-redux"
import { selectUsers } from "../../store/slices/userSlices/userSlices"
import { AiOutlineFullscreenExit } from 'react-icons/ai'
import MediaItem from "../mediaItem/mediaItem"


function ClickedUserMedia() {
    const { users, id } = useSelector(selectUsers)
    const [modalHidden, setModalHidden] = useState(false)
    const [clickId, setClickId] = useState("")
    let clickedUser

    for (const user of users) {
        if (user.id === id) {
            clickedUser = user
        }
    }

    const modalImg = (id) => {
        setModalHidden(true)
        setClickId(id)
    }

    return (
        <div className="clicked-user-media">
            <div
                style={{
                    display: modalHidden ? 'flex' : 'none'
                }}
                className="modal-image">
                <span
                    onClick={() => setModalHidden(false)}
                    className='exit'>
                    <AiOutlineFullscreenExit />
                </span>
                <MediaItem clickId={clickId} />
            </div>
            <div className='media'>
                {clickedUser?.media.map((mediaId) => (
                    <div
                        onClick={() => modalImg(mediaId)}
                        key={mediaId}
                        className='media-img'>
                        <img src={`https://firebasestorage.googleapis.com/v0/b/artchat-86d4b.appspot.com/o/images%2F${clickedUser?.id}%2F%20${mediaId}?alt=media&token=96295942-b104-4f9d-b704-60c8e0f76b13`}
                            alt="" />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ClickedUserMedia