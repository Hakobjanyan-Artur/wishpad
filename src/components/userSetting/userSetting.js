import { memo, useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { selectUsers } from "../../store/slices/userSlices/userSlices"
import { getDownloadURL, ref, uploadBytesResumable } from "@firebase/storage";
import { db, storage } from "../firebasaConfig/FirebasaConfig";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import image from '../../images/user.png'
import coverImg from '../../images/background.jpg'
import countryData from "../country/country";
import { useNavigate } from "react-router-dom";
import { GiExitDoor } from 'react-icons/gi';


function UserSetting({ avatar, setAvatar, coverImage, setCoverImage, info, setInfo, togglePass, setTogglePass }) {
    const [progress, setProgress] = useState(0)
    const [progressCover, setProgressCover] = useState(0)
    const [img, setImg] = useState('')
    const [cover, setCover] = useState('')
    const { user } = useSelector(selectUsers)
    const [passSymbols, setPassSymbols] = useState(false)
    const [passSymbolChange, setPassSymbolChange] = useState(false)
    const [passLength, setPassLength] = useState(false)
    const [passUppercase, setPassUpperCase] = useState(false)
    const [passLowercase, setPassLowerCase] = useState(false)
    const [passNumbers, setPassNumbers] = useState(false)
    const [passShow, setPassShow] = useState(false)
    const [error, setError] = useState(false)
    const [success, setSuccess] = useState(false)
    const [deleteErr, setDeleteErr] = useState(false)
    const navigate = useNavigate()
    let country = []
    const symbols = ["!", "#", "$", "%", "&", "(", ")", "*", "+", "-", ",", ".", "/", ":", ";", "<", "=", ">", "?", "@", "[", "]", "|", "^", "_", "{", "}", "~", "`"]
    const upperCase = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
    const lowerCase = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "x"]
    const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]

    const exitUser = () => {
        localStorage.removeItem('localUser')
        setTimeout(() => {
            navigate('/')
        }, 500)
    }

    const deleteUser = async (id) => {
        const userDoc = doc(db, "users", id)
        await deleteDoc(userDoc)
        navigate('/')
    }

    const deleteUserSubmit = (e) => {
        e.preventDefault()
        const delEmail = e.target[0].value
        const delPassword = e.target[1].value

        if (delEmail === user.email && delPassword === user.password) {
            deleteUser(user?.id)
        } else {
            setDeleteErr(true)
        }
    }

    const passError = () => {
        if (error) {
            setError(false)
        } else if (success) {
            setSuccess(false)
        }
    }

    const changePasswordSubmit = (e) => {
        e.preventDefault()
        let currentPassword = e.target[0].value
        let nowPassword = e.target[1].value
        let nowPasswordConfirm = e.target[2].value

        if (user.password === currentPassword) {
            if (
                passLength &&
                passLowercase &&
                passUppercase &&
                passNumbers &&
                passSymbolChange &&
                nowPassword === nowPasswordConfirm
            ) {
                const updateUser = async (id) => {

                    const userDoc = doc(db, "users", id)
                    const newFileds = {
                        password: nowPassword
                    }
                    await updateDoc(userDoc, newFileds)
                    setTogglePass(!togglePass)
                }
                updateUser(user.id)
                setSuccess(true)
            } else {
                setError(true)
            }
        }
        else {
            setError(true)
        }

        e.target.reset()
    }
    const pasChange = (e) => {

        if (e.length >= 8) {
            setPassLength(true)
        } else {
            setPassLength(false)
        }
        let upper = []
        let lower = []
        let num = []
        let symbol = []
        upperCase.forEach(el => upper.push(e.includes(el)))
        lowerCase.forEach(el => lower.push(e.includes(el)))
        numbers.forEach(el => num.push(e.includes(el)))
        symbols.forEach(el => symbol.push(e.includes(el)))


        if (upper.includes(true)) {
            setPassUpperCase(true)

        } else {
            setPassUpperCase(false)
        }
        if (lower.includes(true)) {
            setPassLowerCase(true)

        } else {
            setPassLowerCase(false)
        }
        if (num.includes(true)) {
            setPassNumbers(true)

        } else {
            setPassNumbers(false)
        }
        if (symbol.includes(true)) {
            setPassSymbolChange(true)

        } else {
            setPassSymbolChange(false)
        }
    }

    for (const el in countryData.data) {
        country.push(countryData.data[el])
    }

    const changeInfoSubmit = (e) => {
        e.preventDefault()
        const email = e.target[0].value
        const country = e.target[1].value === "Country" ? "" : e.target[1].value
        const city = e.target[2].value

        const updateUser = async (id) => {

            const userDoc = doc(db, "users", id)
            const newFileds = {
                email: email ? email : user.email,
                homeland: country ? country : user.homeland,
                city: city ? city : user.city
            }
            await updateDoc(userDoc, newFileds)
            setInfo(!info)
        }
        updateUser(user?.id)

        e.target.reset()
    }

    const avatarSubmit = (e) => {
        e.preventDefault()
        const file = e.target[0].files[0]
        uploadAvatar(file)
    }
    const coverSubmit = (e) => {
        e.preventDefault()
        const file = e.target[0].files[0]
        uploadCover(file)

    }

    const uploadCover = (file) => {
        if (!file) return
        const storageRef = ref(storage, `/cover/${file.name}`)
        const uploadTask = uploadBytesResumable(storageRef, file)

        const updateUser = async (id) => {

            const userDoc = doc(db, "users", id)
            const newFileds = {
                coverImage: file.name
            }
            await updateDoc(userDoc, newFileds)
        }

        uploadTask.on("state_changed", (snapshot) => {
            const prog = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)

            setProgressCover(prog)
        },
            (err) => {
                console.log('error')
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then(url => setCover(url))
                updateUser(user?.id)
                setCoverImage(!coverImage)
            }
        )
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

    useEffect(() => {
        if (!user) {
            navigate('/')
        }
    }, [])

    return (
        <div className="user-setting">
            <div className="setting-header">
                <h1>Setting user profile</h1>
                <span
                    onClick={() => exitUser()}
                    className="exit-icon">
                    <GiExitDoor />
                </span>
            </div>
            <div className="content">
                <div className="avatar-change">
                    <h2>Change avatar</h2>
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
                <div className="cover-change">
                    <h2>Change cover</h2>
                    <div className="cover-image">
                        <div className="image">
                            <img src={cover ? cover : coverImg} alt="" />
                        </div>
                    </div>
                    <h3>Uploaded {progressCover} %</h3>
                    <h4>Max-size: 1024kb</h4>
                    <form onSubmit={coverSubmit}>
                        <input type="file" />
                        <button>Send</button>
                    </form>
                </div>
                <div className="change-info">
                    <h2>Change-information</h2>
                    <form onSubmit={changeInfoSubmit} className="change-info-form">
                        <div className="email">
                            <h3>Email</h3>
                            <input type="email" />
                        </div>
                        <div className="country">
                            <h3>Country</h3>
                            <select className="select" >
                                <option value="Country">Country</option>
                                {country.map((el) => (
                                    <option value={el.country} key={el.country}>{el.country}</option>
                                ))}
                            </select>
                        </div>
                        <div className="city">
                            <h3>City</h3>
                            <input type="text" />
                        </div>
                        <button>Change</button>
                    </form>
                </div>
                <div className="change-password">
                    <h2>Change-Password</h2>
                    <form onSubmit={changePasswordSubmit}>
                        <div className="current-password">
                            <h3>Current password</h3>
                            <input
                                onFocus={() => passError()}
                                type={passShow ? 'text' : 'password'} />
                        </div>
                        <div className="now-password">
                            <div
                                style={{
                                    display: passSymbols ? 'flex' : 'none'
                                }}
                                className='password-simvols'>
                                <h4>Strong password:</h4>
                                <div className='simvols'>
                                    <div className='simvols-content'>
                                        <span
                                            style={{
                                                backgroundColor: passLength ? 'rgba(68, 121, 251)' : 'grey'
                                            }}
                                            className='range'></span> <h5>8 or more characters</h5>
                                    </div>
                                    <div className='simvols-content'>
                                        <span
                                            style={{
                                                backgroundColor: passUppercase ? 'rgba(68, 121, 251)' : 'grey'
                                            }}
                                            className='range'></span> <h5>Uppercase Latin letters</h5>
                                    </div>
                                    <div className='simvols-content'>
                                        <span
                                            style={{
                                                background: passLowercase ? 'rgba(68, 121, 251)' : 'grey'
                                            }}
                                            className='range'></span> <h5>Lowercase latin letters</h5>
                                    </div>
                                    <div className='simvols-content'>
                                        <span
                                            style={{
                                                background: passNumbers ? 'rgba(68, 121, 251)' : 'grey'
                                            }}
                                            className='range'></span> <h5>Numbers</h5>
                                    </div>
                                    <div className='simvols-content symbol'>
                                        <div className='range-text' >
                                            <span
                                                style={{
                                                    background: passSymbolChange ? 'rgba(68, 121, 251)' : 'grey'
                                                }}
                                                className='range'></span>
                                            <h5>Symbols:</h5>
                                            <div className='sym'>
                                                ({symbols.map(el => <span key={el}>{el}</span>)})
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <h3>Now password</h3>
                            <input
                                onFocus={(e) => setPassSymbols(true)}
                                onBlur={() => setPassSymbols(false)}
                                onChange={(e) => pasChange(e.target.value)}
                                type={passShow ? 'text' : 'password'} />
                        </div>
                        <div className="confirm-now-password">
                            <h3>Confirm Now Password</h3>
                            <input type={passShow ? 'text' : 'password'} />
                            <input
                                onChange={() => setPassShow(!passShow)}
                                type="checkbox" />
                        </div>
                        <button>Change</button>
                    </form>
                    <div className='footer'>
                        <h3
                            style={{
                                display: error ? 'inline-block' : 'none',
                                color: 'red'
                            }}
                        >Error when changing password</h3>
                        <h3
                            style={{
                                color: 'rgba(68, 121, 251)',
                                display: success ? 'block' : 'none'
                            }}
                        >Password changed successfully</h3>
                    </div>
                </div>
                <div className="delete-user">
                    <h2>Delete- user</h2>
                    <form onSubmit={deleteUserSubmit}>
                        <div className="del-email">
                            <h4>Current Email</h4>
                            <input
                                onFocus={() => setDeleteErr(false)}
                                type="email" />
                        </div>
                        <div className="del-password">
                            <h4>Current Password</h4>
                            <input type="password" />
                        </div>
                        <button>Delete</button>
                    </form>
                    <div
                        style={{
                            display: deleteErr ? 'block' : 'none',
                            color: 'red'
                        }}
                        className="delete-error">
                        <h3>Incorrect email or password</h3>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default memo(UserSetting)