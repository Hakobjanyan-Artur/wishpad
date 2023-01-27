import { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import logo from '../../images/logo.jpg'
import { toggleUsers } from '../../store/slices/userSlices/userSlices'

function SignIn({ users }) {
    const navigate = useNavigate()
    const formRef = useRef(null)
    const [checkbox, setCheckbox] = useState(false)
    const [error, setError] = useState(false)
    const dispatch = useDispatch()
    const currentUser = JSON.parse(localStorage.getItem('currentUser')) || null

    useEffect(() => {
        if (currentUser) {
            navigate('home')
        }
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        const email = formRef.current[0].value
        const password = formRef.current[1].value
        for (const user of users) {
            if (user.email === email && user.password === password && !checkbox) {
                dispatch(toggleUsers(user))
                navigate('home')
                break
            } else if (user.email === email && user.password === password && checkbox) {
                localStorage.setItem('currentUser', JSON.stringify(user))
                navigate('home')
            } else {
                setError(true)
                break
            }
        }
        formRef.current.reset()
    }

    return (
        <div className='sign-in'>
            <div className="container">
                <div className="sign-in-content">
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
                            <h1 className='right-title'>Authorization</h1>
                            <form ref={formRef} onSubmit={handleSubmit}>
                                <div className='email'>
                                    <h5>Email</h5>
                                    <input
                                        onChange={() => setError(false)}
                                        type="email"
                                        placeholder='Enter your email' />
                                </div>
                                <div className='password'>
                                    <h5>Password</h5>
                                    <input
                                        onChange={() => setError(false)}
                                        type="password"
                                        placeholder='Password' />
                                    <div className='check'>
                                        <input onChange={() => setCheckbox(!checkbox)} className='checkbox' type="checkbox" />
                                        <h5>Remember me</h5>
                                    </div>
                                </div>
                                <h3
                                    style={{
                                        display: error ? 'block' : 'none'
                                    }}
                                    className='error'>Wrong email or password</h3>
                                <div className='btns'>
                                    <button className='right-btn'>Sign In</button>
                                    <span onClick={() => navigate('signup')} className='left-btn'>Sign up</span>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignIn