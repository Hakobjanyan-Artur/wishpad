import { useState } from "react"
import { useSelector } from "react-redux"
import { selectUsers } from "../../store/slices/userSlices/userSlices"
import { getDownloadURL, ref, uploadBytesResumable } from "@firebase/storage";
import { db, storage } from "../firebasaConfig/FirebasaConfig";
import { doc, updateDoc } from "firebase/firestore";
import image from '../../images/user.png'

function UserSetting({ avatar, setAvatar }) {
    const [progress, setProgress] = useState(0)
    const [img, setImg] = useState('')
    const { user } = useSelector(selectUsers)

    const avatarSubmit = (e) => {
        e.preventDefault()
        const file = e.target[0].files[0]
        uploadAvatar(file)
    }


    const uploadAvatar = (file) => {
        if (!file) return
        const storageRef = ref(storage, `/avatar/${file.name}`)
        const uploadTask = uploadBytesResumable(storageRef, file)

        const updateUser = async (id) => {

            const userDoc = doc(db, "users", id)
            const newFileds = {
                avatar: file.name
            }
            await updateDoc(userDoc, newFileds)
        }

        uploadTask.on("state_changed", (snapshot) => {
            const prog = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)

            setProgress(prog)
        },
            (err) => {
                console.log('error')
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then(url => setImg(url))
                updateUser(user?.id)
                setAvatar(!avatar)
            }
        )
    }
    return (
        <div className="user-setting">
            <h1>Setting user profile</h1>
            <div className="avatar-change">
                <div className="avatar-image">
                    <div className="image">
                        <img src={img ? img : image} alt="" />
                    </div>
                </div>
                <h3>Uploaded {progress} %</h3>
                <h4>Max-size: 1024 kb</h4>
                <form onSubmit={avatarSubmit}>
                    <input type="file" />
                    <button>Send</button>
                </form>
            </div>
        </div>
    )
}

export default UserSetting