import { Link } from 'react-router-dom';
import { authService } from '../../api';
import reactLogo from '../../assets/react.svg';
import viteLogo from '/vite.svg';
import './Home.css';

const Home = () => {
  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank" rel="noreferrer">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <p>
          Edit <code>src/pages/Home/Home.tsx</code> and save to test HMR
        </p>
        <div className="nav-links">
          {authService.isAuthenticated() ? (
            <Link to="/dashboard" className="nav-link dashboard-link">
              Go to Dashboard
            </Link>
          ) : (
            <>
              <Link to="/login" className="nav-link login-link">
                Go to Login Page
              </Link>
              <Link to="/signup" className="nav-link signup-link">
                Go to Sign Up Page
              </Link>
            </>
          )}
        </div>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
};

export default Home;
