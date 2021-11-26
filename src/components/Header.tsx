import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGraduationCap } from "@fortawesome/free-solid-svg-icons"

function Header() {
    return (
        <header className="top-header">
            <h1><FontAwesomeIcon icon={faGraduationCap} /> StudentDashboard</h1>
        </header>
    )
}

export default Header