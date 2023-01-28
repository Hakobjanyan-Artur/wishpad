import userImage from '../../images/user.png'

function Home({ users }) {
    let minutes = new Date().getMinutes()
    setInterval(() => {
        minutes = new Date().getMinutes()
    }, 60000 * 6)

    return (
        <>
            {users?.map((user) => (
                <div key={user?.id} className="home-users">
                    <div className="user-image">
                        <div
                            style={{
                                background: user.min >= minutes + 5 || user.min <= minutes - 5 ? 'red' : ''
                            }}
                            className='user-online'></div>
                        <img src={userImage} alt="" />
                    </div>
                    <div className='user-home-left'>
                        <h3>{user?.name} {user?.lastname}</h3>
                        <h5>{user?.sity} {user?.homeland}</h5>
                    </div>
                </div>
            ))}
        </>
    )
}

export default Home