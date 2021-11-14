import { useAppSelector } from "../app/hooks";
import { Link } from "react-router-dom";

const Sidebar = () => {

    const storeData = useAppSelector(state => state.dataSet)

    const StudentLinkItems = storeData.map(x => {
        return (
            <li key={`li-${x.firstName}`}>
                <Link to={`students/${x.firstName}`}>
                    {x.firstName}
                </Link>
            </li>
        )
    })


    return (
        <nav className="sidebar">
                <Link to={'/'}>
                    <h4>Back to homepage</h4>
                </Link>
            <ul>
                {StudentLinkItems}
            </ul>
        </nav>
    )
}

export default Sidebar