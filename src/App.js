import logo from './logo.svg';
import './App.css';
import Router from "./Router";
import Navbar from './containers/common/Navbar';
import Sidebar from './containers/common/Sidebar';
import Footer from './containers/common/Footer';

function App() {
  return (
      <div className="wrapper">
            <nav className="main-header navbar navbar-expand navbar-white navbar-light">
            <Navbar />
            </nav>
            <Sidebar />
            <div className="content-wrapper">
            <Router />
            </div>
            <footer className="main-footer">
            <Footer />
            </footer>
            
        </div>
  );
}

export default App;
