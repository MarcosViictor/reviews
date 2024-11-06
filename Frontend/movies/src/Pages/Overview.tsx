// import Header from "../components/Header"
import SideBar from "../components/SideBar";
import OverviewContainer from "../components/OverviewContainer";
import Comments from "../components/Comments";

const Overview : React.FC = () => {

    

    return (
      <>
        <SideBar />
        {/* <Header /> */}
        <div>
          <OverviewContainer />
          <Comments />
        
        </div>
      </>
        
    )
}

export default Overview