import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  
// For Admin 
  const userData = JSON.parse(localStorage.getItem('user'));
  const isAdmin =
  userData &&
  userData.email === 'dar@gmail.com' &&
  userData.password === '12345';

  
  if (!localStorage.getItem('token')) {
    setTimeout(() => {
      navigate('/login');
    }, 5);
  }

  function logout() {
    localStorage.clear();
    navigate('/login');
  }

  const handleFeedBackSubmissionClick = () => {
    navigate('/feedback');
  };
  const handleUserClick = () => {
    navigate('/user');
  };

  const handleFeedBackListingClick = () => {
    navigate('/feedback/listing');
  };
  const handleAdminFeedBackListingClick = () => {
    navigate('/admin/feedback/listing');
  };

  const handleHomeClick = () => {
    navigate('/');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          <img src="/images/logo.png" alt="" style={{ width: '105px' }} />
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <i className="fas fa-bars"></i>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
           
            {isAdmin ? (
              <>
                <li className="nav-item">
                  <a className="nav-link" href="" onClick={handleUserClick}>
                    Users
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="" onClick={handleAdminFeedBackListingClick}>
                    Feedback Items
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="" onClick={logout}>
                    Sign Out
                  </a>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <a className="nav-link" href="" onClick={handleFeedBackSubmissionClick}>
                    Feedback Submission
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="" onClick={handleFeedBackListingClick}>
                    Feedback Listing
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="" onClick={logout}>
                    Sign Out
                  </a>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
