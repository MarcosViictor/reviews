import Header from "../components/Header"
import SideBar from "../components/SideBar";
import OverviewContainer from "../components/OverviewContainer";

const Overview : React.FC = () => {

    

    return (
      <>
        <SideBar />
        <Header />
        <div className="">
          <OverviewContainer />
        
        </div>
      </>
        
    )
}

export default Overview