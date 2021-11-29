import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGraduationCap } from "@fortawesome/free-solid-svg-icons"
import React from "react"

const Header: React.FC = () => (
        <header className="top-header">
            <h1><FontAwesomeIcon icon={faGraduationCap} /> StudentDashboard</h1>
        </header>
    )

export default Header