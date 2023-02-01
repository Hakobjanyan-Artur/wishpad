import { memo, useEffect, useState } from 'react'
import { BiBookAdd } from 'react-icons/bi'
import { AiOutlineFullscreenExit } from 'react-icons/ai'
import { MdDeleteForever, MdDeleteSweep } from 'react-icons/md'
import { db, storage } from '../firebasaConfig/FirebasaConfig'
import { ref, uploadBytes, deleteObject, getStorage, listAll, getDownloadURL } from 'firebase/storage'
import { useSelector } from 'react-redux'
import { selectUsers } from '../../store/slices/userSlices/userSlices'
import { v4 } from 'uuid'
import { doc, updateDoc } from 'firebase/firestore'
import MediaItem from '../mediaItem/mediaItem'

function UserMedia({ addimg, setAddImg, info, setInfo }) {
    const { user } = useSelector(selectUsers)
    // const [imgList, setImgList] = useState([])
    const [clickId, setClickId] = useState("")
    const [mousEnter, setMousEnter] = useState(true)
    const [modalHidden, setModalHidden] = useState(false)

    const delUserImg = () => {

        //------------Delete-------------

        const deleteImage = async () => {
            const storage = getStorage();

            // Create a reference to the file to delete
            const desertRef = ref(storage, `https://firebasestorage.googleapis.com/v0/b/artchat-86d4b.appspot.com/o/images%2F${user?.id}%2F%20${clickId}?alt=media&token=96295942-b104-4f9d-b704-60c8e0f76b13`);

            // Delete the file
            await deleteObject(desertRef).then(() => {
                alert('image Deleted')
                setModalHidden(false)
            }).catch((error) => {
                alert('Error deleted')
            });

        }

        //----------------------------

        let delId
        for (const id of user.media) {
            if (id === clickId) {
                delId = id
            }
        }

        const updateUser = async (id) => {

            const userDoc = doc(db, "users", id)
            const newFileds = {
                media: [
                    ...user?.media.filter((el) => el !== delId)
                ]
            }
            await updateDoc(userDoc, newFileds)
            deleteImage()
            setInfo(!info)
        }
        updateUser(user?.id)
    }

    const modalImg = (id) => {
        setModalHidden(true)
        setClickId(id)
    }

    // const imgListRef = ref(storage, `images/${user?.id}/`)

    const imgListUpload = (e) => {
        const img = e.target.files[0]
        if (img === null) return
        const idName = v4()
        const imgRef = ref(storage, `images/${user?.id}/ ${img.name + idName}`)
        uploadBytes(imgRef, img).then(() => {
            alert('img uploaded')

            const updateUser = async (id) => {

                const userDoc = doc(db, "users", id)
                const newFileds = {
                    media: [
                        ...user.media,
                        img.name + idName
                    ],
                }
                await updateDoc(userDoc, newFileds)
            }
            setTimeout(() => {
                updateUser(user?.id)
                setAddImg(!addimg)
            }, 1000)
        })

    }

    // useEffect(() => {
    //     if (imgListRef) {
    //         listAll(imgListRef).then((res) => {
    //             res.items.forEach((item) => {
    //                 getDownloadURL(item).then((url) => {
    //                     setImgList((prev) => [
    //                         ...prev,
    //                         {
    //                             id: v4(),
    //                             url: url
    //                         }
    //                     ])
    //                 })
    //             })
    //         })
    //     }
    // }, [addimg])

    return (
        <div className="user-media">
            <div
                style={{
                    display: modalHidden ? 'flex' : 'none'
                }}
                className="modal-image">
                <div
                    onClick={() => delUserImg()}
                    onMouseEnter={() => setMousEnter(false)}
                    onMouseLeave={() => setMousEnter(true)}
                    className='option'>
                    <span className='option-icon'> {mousEnter ? <MdDeleteForever /> : <MdDeleteSweep />}</span>
                </div>
                <span
                    onClick={() => setModalHidden(false)}
                    className='exit'>
                    <AiOutlineFullscreenExit />
                </span>
                <MediaItem clickId={clickId} />
            </div>
            <label
                onChange={(e) => imgListUpload(e)}
                htmlFor='file'>
                <div className='add-media'>
                    <BiBookAdd />
                    <input type="file" id='file' hidden />
                </div>
            </label>
            <div className='media'>
                {user?.media.map((mediaId) => (
                    <div
                        onClick={() => modalImg(mediaId)}
                        key={mediaId}
                        className='media-img'>
                        <img src={`https://firebasestorage.googleapis.com/v0/b/artchat-86d4b.appspot.com/o/images%2F${user?.id}%2F%20${mediaId}?alt=media&token=96295942-b104-4f9d-b704-60c8e0f76b13`}
                            alt="" />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default memo(UserMedia)