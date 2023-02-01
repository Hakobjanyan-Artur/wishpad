import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { selectUsers } from "../../store/slices/userSlices/userSlices"

function Friends() {
    const navigate = useNavigate()
    const { user } = useSelector(selectUsers)

    useEffect(() => {
        if (!user) {
            navigate('/')
        }
    }, [])
    return (
        <div className="friends">
            <h1>Friends</h1>
        </div>
    )
}

export default Friends