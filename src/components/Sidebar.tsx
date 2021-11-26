import { useAppSelector } from "../app/hooks";
import { Link } from "react-router-dom";

const Sidebar = () => {

    const storeData = useAppSelector(state => state.dataSet)

    const StudentLinkItems = storeData.map(x => {
        return (
            <>
            <hr/>
                <li key={`li-${x.firstName}`}>
                    <Link to={`students/${x.firstName}`}>
                        {x.firstName}
                    </Link>
                    
                </li>
            </>
        )
    })


    return (
        <nav className="sidebar">
            <div className="sidebar-wrapper">
                <Link to={'/'}>
                    <h4 className="sidebar-home">Homepage</h4>
                </Link>
                <ul>
                    {StudentLinkItems}
                </ul>
            </div>
        </nav>
    )
}

export default Sidebar