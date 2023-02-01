import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { selectUsers } from "../../store/slices/userSlices/userSlices"


function Search() {
    const { user } = useSelector(selectUsers)
    const navigate = useNavigate()

    useEffect(() => {
        if (!user) {
            navigate('/')
        }
    }, [])
    return (
        <div className="search">
            <h1>Search</h1>
        </div>
    )
}

export default Search