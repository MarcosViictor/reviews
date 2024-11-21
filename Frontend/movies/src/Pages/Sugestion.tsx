import SideBar from "../components/SideBar";
import SugestionRandom from "../components/SugestionRandom";

const Sugestion : React.FC = () => {
    return (
        <section>
            <SideBar />
            <div>
                <SugestionRandom />           
            </div>
        </section>
    )
};

export default Sugestion;