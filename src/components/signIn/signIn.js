import logo from '../../images/logo.jpg'

function SignIn() {
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
                            <form>
                                <div className='email'>
                                    <h5>Email</h5>
                                    <input type="email" placeholder='Enter your email' />
                                </div>
                                <div className='password'>
                                    <h5>Password</h5>
                                    <input type="password" placeholder='Password' />
                                </div>
                                <div className='btns'>
                                    <button className='right-btn'>Sign In</button>
                                    <span className='left-btn'>Sign up</span>
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