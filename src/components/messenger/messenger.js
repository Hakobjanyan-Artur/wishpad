import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { selectUsers } from "../../store/slices/userSlices/userSlices"


function Messenger() {
    const { user } = useSelector(selectUsers)
    const navigate = useNavigate()

    useEffect(() => {
        if (!user) {
            navigate('/')
        }
    }, [])
    return (
        <div className="messenger">
            <h1>Messenger</h1>
        </div>
    )
}

export default Messenger