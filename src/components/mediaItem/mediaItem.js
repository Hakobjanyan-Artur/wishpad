import { memo, useState } from 'react';
import { FcPrevious, FcNext } from 'react-icons/fc'
import { useSelector } from 'react-redux';
import { selectUsers } from '../../store/slices/userSlices/userSlices';

function MediaItem({ clickId }) {
    const { user } = useSelector(selectUsers)
    const [id, setId] = useState("")

    const nextPhoto = () => {

        let idx = user.media.indexOf(clickId)

        for (let i = 0; i < user.media.length; i++) {
            if (user.media[idx + 1] === undefined) {
                setId(clickId)
            } else {
                setId(user.media[idx + 1])
            }
        }
    }

    const prevPhoto = () => {

        let idx = user.media.indexOf(clickId)

        for (let i = 0; i < user.media.length; i++) {
            if (user.media[idx - 1] === undefined) {
                setId(clickId)
            } else {
                setId(user.media[idx - 1])
            }
        }
    }

    return (
        <div className="media-item">
            <div
                onClick={() => prevPhoto()}
                className='modal-left'><FcPrevious /></div>
            <div className='modal-middle'>
                <img src={`https://firebasestorage.googleapis.com/v0/b/artchat-86d4b.appspot.com/o/images%2F${user?.id}%2F%20${id ? id : clickId}?alt=media&token=96295942-b104-4f9d-b704-60c8e0f76b13`} alt="" />
            </div>
            <div
                onClick={() => nextPhoto()}
                className='modal-right'><FcNext /></div>
        </div>
    )

}

export default memo(MediaItem)