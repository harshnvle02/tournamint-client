import React, { useState } from 'react';
import './Sidebar.css';
import MenuIcon from '@mui/icons-material/Menu';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import AssessmentIcon from '@mui/icons-material/Assessment';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../Context/AuthConntext';

const Sidebar = () => {
  const {logout} = useContext(AuthContext);
  const [extended, setExtended] = useState(false);
  const navigate = useNavigate();

  const showLive = () => {
    navigate('/addtournament/host-home');
  };

  const addTournament = () => {
    navigate('/addtournament/add');
  }

  const participateClickHandler = () => {
    navigate('/addtournament/participate');
  }

  const performanceClickHnadler = () => {
    navigate('/addtournament/performance');
  }
  
  const logOutClickhandler = () => {
    logout();
    navigate('/addtournament/login');
  }
  
  return (
    <div className={`sidebar-container ${extended ? 'extended' : ''}`}>
      <div className="sidebar-content">
        <div className="sidebar-toggle" onClick={() => setExtended((prev) => !prev)}>
          <MenuIcon className="menu-icon" />
          {extended && <p className="sidebar-text">Menu</p>}
        </div>

        <div className="sidebar-item" onClick={showLive}>
          <LiveTvIcon className="sidebar-icon" />
          {extended && <p className="sidebar-text">Your Tournaments</p>}
        </div>

        <div className="sidebar-item" onClick={addTournament}>
          <AddCircleIcon className="sidebar-icon" />
          {extended && <p className="sidebar-text">Add tournament</p>}
        </div>
        <div className="sidebar-item" onClick={participateClickHandler}>
          <HowToRegIcon className="sidebar-icon" />
          {extended && <p className="sidebar-text">Participate</p>}
        </div>
        <div className="sidebar-item" onClick={performanceClickHnadler}>
          <AssessmentIcon className="sidebar-icon" />
          {extended && <p className="sidebar-text">Team Statistics</p>}
        </div>
        <div className="sidebar-item" onClick={logOutClickhandler}>
          <ExitToAppIcon className="sidebar-icon" />
          {extended && <p className="sidebar-text">Log Out</p>}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
