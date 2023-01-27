import { useSelector } from "react-redux"
import { selectUsers } from "../../store/slices/userSlices/userSlices"


function Home() {
    const { user } = useSelector(selectUsers)
    console.log(user)
    return (
        <>
            <div>Hello</div>
        </>
    )
}

export default Home