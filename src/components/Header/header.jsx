import '../../assets/css/header/header.css';
import { useOutletContext } from "react-router-dom";

const Header = ({ title = 'Titulo', subtitle = null, className = '', ...props }) => {
  const { toggleSidebar, isMobile } = useOutletContext();

  return (
    <header
      className={`${className} p-3 bg-white border-bottom position-relative`}
      {...props}
    >
      <div className="container-fluid d-flex align-items-center">
        {isMobile && (
          <button
            className="toggle-button-mobile position-absolute start-0 top-50 translate-middle-y"
            onClick={toggleSidebar}
            aria-label="Toggle Sidebar"
          >
            ☰
          </button>
        )}
        <div className="ms-5">
          <h2 className="mb-1 title-header">{title}</h2>
          {subtitle && (
            <p className="small mb-0 subtitle-header">{subtitle}</p>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
