import { useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import logo from '../../images/logo.jpg'
import { addNewUser } from '../../store/slices/addUsers/addUsers'


function SignUp() {
    const [genderinp, setGenderinp] = useState(true)
    const [nameErr, setNameErr] = useState(false)
    const [lastnameErr, setLastNameErr] = useState(false)
    const [passSymbols, setPassSymbols] = useState(false)
    const [passSymbolChange, setPassSymbolChange] = useState(false)
    const [passLength, setPassLength] = useState(false)
    const [passUppercase, setPassUpperCase] = useState(false)
    const [passLowercase, setPassLowerCase] = useState(false)
    const [passNumbers, setPassNumbers] = useState(false)
    const [passShow, setPassShow] = useState(false)
    const [error, setError] = useState(false)
    const [success, setSuccess] = useState(false)
    const symbols = ["!", "#", "$", "%", "&", "(", ")", "*", "+", "-", ",", ".", "/", ":", ";", "<", "=", ">", "?", "@", "[", "]", "|", "^", "_", "{", "}", "~", "`"]
    const upperCase = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
    const lowerCase = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "x"]
    const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
    const navigate = useNavigate()
    const formRef = useRef(null)
    const dispatch = useDispatch()

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


    const handleSubmit = (e) => {
        e.preventDefault()
        const name = formRef.current[0].value
        const lastname = formRef.current[1].value
        const email = formRef.current[2].value
        const dateofbirth = formRef.current[3].value
        const password = formRef.current[4].value
        const confirmPassword = formRef.current[6].value
        const gender = genderinp === true ? 'Male' : 'Female'

        function dateReg() {
            let time = new Date()
            let d = time.getDate().toString()
            let m = time.getUTCMonth() + 1
            m = m.toString()
            let y = time.getFullYear().toString()
            let h = time.getHours().toString()
            let min = time.getMinutes().toString()

            if (h.length < 2) { h = '0' + h }
            if (min.length < 2) { min = '0' + min }
            if (m.length < 2) { m = '0' + m }
            return d + '.' + m + '.' + y + ' ' + h + ':' + min

        }

        if (!nameErr && !lastnameErr &&
            email &&
            dateofbirth &&
            password === confirmPassword &&
            passLength &&
            passLowercase &&
            passUppercase &&
            passNumbers &&
            passSymbolChange) {
            dispatch(addNewUser({
                name: name,
                lastname: lastname,
                email: email,
                dateofbirth: dateofbirth,
                password: password,
                gender: gender,
                dateofreg: dateReg(),
                friends: [],
                avatar: {},
                media: [],
                messenger: [],
                city: '',
                homeland: '',
            }))
            setSuccess(true)
            setTimeout(() => {
                navigate('/')
            }, 1500)
        } else {
            setError(true)
        }
        formRef.current.reset()
        setPassLength(false)
        setPassUpperCase(false)
        setPassLowerCase(false)
        setPassNumbers(false)
        setPassSymbolChange(false)
    }

    return (
        <div className='sign-up'>
            <div className="container">
                <div className="sign-up-content">
                    <div className="desctop">
                        <div className="left">
                            <div className='left-header'>
                                <div className="logo">
                                    <img src={logo} alt="Logo Wish-Pad" />
                                </div>
                            </div>
                            <div className='left-section'>
                                <h2 className='title'>Welcome</h2>
                                <h1 className='name'>Wish-Pad</h1>
                                <h3 className='about'>Platform for easy communication</h3>
                            </div>
                        </div>
                        <div className="right">
                            <h1 className='right-title'>Registration</h1>
                            <form ref={formRef} onSubmit={handleSubmit}>
                                <div className='name'>
                                    <h4>Name</h4>
                                    <h5
                                        style={{
                                            display: nameErr ? 'block' : 'none',
                                            color: 'red'
                                        }}
                                    >at least 3 characters</h5>
                                    <input
                                        onChange={(e) => e.target.value.length < 3 ? setNameErr(true) : setNameErr(false)}
                                        type="text"
                                        placeholder='Enter your Name' />
                                </div>
                                <div className='last-name'>
                                    <h4>Last Name</h4>
                                    <h5
                                        style={{
                                            display: lastnameErr ? 'block' : 'none',
                                            color: 'red'
                                        }}
                                    >at least 3 characters</h5>
                                    <input
                                        onChange={(e) => e.target.value.length < 3 ? setLastNameErr(true) : setLastNameErr(false)}
                                        type="text"
                                        placeholder='Enter your lastName' />
                                </div>
                                <div className='email'>
                                    <h4>Email</h4>
                                    <h5>Email exists</h5>
                                    <input type="email" placeholder='Enter your email' />
                                </div>
                                <div className='date'>
                                    <h4>Date of Birth</h4>
                                    <input type="date" />
                                </div>
                                <div className='password'>
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
                                    <h4>Password</h4>
                                    <input
                                        onFocus={(e) => setPassSymbols(true)}
                                        onBlur={() => setPassSymbols(false)}
                                        onChange={(e) => pasChange(e.target.value)}
                                        type={passShow ? 'text' : 'password'}
                                        placeholder='Password' />
                                    <div className='show-pass'>
                                        <input onChange={() => setPassShow(!passShow)} type="checkbox" />
                                        <h5>Show Password</h5>
                                    </div>
                                </div>
                                <div className='confirm-password'>
                                    <h4>Confirm Password</h4>
                                    <input type={passShow ? 'text' : 'password'} placeholder='Confirm Password' />
                                </div>
                                <div className='gender'>
                                    <h4>Gender</h4>
                                    <div className='gender-input'>
                                        Male:<input onChange={() => setGenderinp(!genderinp)} defaultChecked type="radio" value="man" name='gender' />
                                        Female:<input onChange={() => setGenderinp(!genderinp)} type="radio" value="woman" name='gender' />
                                    </div>
                                </div>
                                <button className='right-btn'>Sign Up</button>
                            </form>
                            <div className='footer'>
                                <span onClick={() => navigate('/')} className='left-btn'>Sign in</span>
                                <h3
                                    style={{
                                        display: error ? 'inline-block' : 'none'
                                    }}
                                >Registration Error</h3>
                                <h3
                                    style={{
                                        color: 'rgba(68, 121, 251)',
                                        display: success ? 'block' : 'none'
                                    }}
                                >registration completed successfully</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignUp