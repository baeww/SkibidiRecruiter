import { Link } from "react-router-dom";

export default function Header() {
    return (<>
        <nav className="header">
          <p id="logo">ApplicAgent</p>
          <div className="header-links">
            {/* <Link to="/" className="header-link" onClick={() => window.scroll(0, 0)}>Home</Link> */}
            <Link to="/login" className="header-link" onClick={() => window.scroll(0, 0)}>Log-In</Link>
            {/* <Link to="/chat" className="header-link" onClick={() => window.scroll(0, 0)}>Chat</Link> */}
          </div>
        </nav>
        <div id="header-spacer"></div>
    </>)
}