import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { selectSearch } from "../../store/slices/searchUsers/searchUsers"
import { selectUsers } from "../../store/slices/userSlices/userSlices"


function Search() {
    const { user, users } = useSelector(selectUsers)
    const selectTxt = useSelector(selectSearch)
    const navigate = useNavigate()

    let searchUser
    if (selectTxt) {
        searchUser = users?.filter(filterUser => {
            let n = filterUser.lastname.toLowerCase() + filterUser.name.toLowerCase()
            let m = filterUser.name.toLowerCase() + filterUser.lastname.toLowerCase()
            if (n.includes(selectTxt.replaceAll(' ', ''))) {
                return n.includes(selectTxt.replaceAll(' ', ''))
            } else if (m.includes(selectTxt.replaceAll(' ', ''))) {
                return m.includes(selectTxt.replaceAll(' ', ''))
            }

        })
    }

    useEffect(() => {
        if (!user) {
            navigate('/')
        }
    }, [])

    return (
        <div className="search">
            {searchUser?.map((searchUs) => (
                <div key={searchUs?.id} className="search-content">
                    <div className="search-left">
                        <div className="search-images">
                            <img src={`https://firebasestorage.googleapis.com/v0/b/artchat-86d4b.appspot.com/o/avatar%2F${searchUs?.avatar}?alt=media&token=14d679a8-2733-45ec-b62e-3de52bc99025`} alt="" />
                        </div>
                    </div>
                    <div className="search-right">
                        <div className="search-name"><h2>{searchUs?.name} {searchUs?.lastname}</h2></div>
                        <div className="search-country"><h4>{searchUs?.city} {searchUs?.homeland}</h4></div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Search