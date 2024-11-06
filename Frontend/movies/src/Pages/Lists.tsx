import CreateList from "../components/CreateListButton"
import Header from "../components/Header"
import ListsContainer from "../components/ListsContainers"
import SideBar from "../components/SideBar"

const Lists = () => {
    return(
        <>
            <SideBar />
            <CreateList />
            <ListsContainer />
            
        </>
    )
}

export default Lists