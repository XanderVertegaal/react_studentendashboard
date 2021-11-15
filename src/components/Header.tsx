import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGraduationCap } from "@fortawesome/free-solid-svg-icons"

function Header() {
    return (
        <header className="top-header">
            <FontAwesomeIcon icon={faGraduationCap} />
            <h1>StudentDashboard</h1>
        </header>
    )
}

export default Header