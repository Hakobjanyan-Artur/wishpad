import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import logo from '../../images/logo.jpg'

function SignUp() {
    const [genderinp, setGenderinp] = useState(true)
    const navigate = useNavigate()
    const formRef = useRef(null)

    const handleSubmit = (e) => {
        e.preventDefault()
        const name = formRef.current[0].value
        const lastname = formRef.current[1].value
        const email = formRef.current[2].value
        const date = formRef.current[3].value
        const password = formRef.current[4].value
        const confirmPassword = formRef.current[5].value
        const gender = genderinp === true ? 'Male' : 'Female'

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
                                    <h5>Name</h5>
                                    <input type="text" placeholder='Enter your name' />
                                </div>
                                <div className='last-name'>
                                    <h5>Last Name</h5>
                                    <input type="text" placeholder='Enter your lastName' />
                                </div>
                                <div className='email'>
                                    <h5>Email</h5>
                                    <input type="email" placeholder='Enter your email' />
                                </div>
                                <div className='date'>
                                    <h5>Date of Birth</h5>
                                    <input type="date" />
                                </div>
                                <div className='password'>
                                    <h5>Password</h5>
                                    <input type="password" placeholder='Password' />
                                </div>
                                <div className='confirm-password'>
                                    <h5>Confirm Password</h5>
                                    <input type="password" placeholder='Confirm Password' />
                                </div>
                                <div className='gender'>
                                    <h5>Gender</h5>
                                    <div className='gender-input'>
                                        Male:<input onChange={() => setGenderinp(!genderinp)} defaultChecked type="radio" value="man" name='gender' />
                                        Female:<input onChange={() => setGenderinp(!genderinp)} type="radio" value="woman" name='gender' />
                                    </div>
                                </div>
                                <button className='right-btn'>Sign Up</button>
                            </form>
                            <span onClick={() => navigate('/')} className='left-btn'>Sign in</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignUp