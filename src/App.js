import logo from './logo.svg';
import './App.css';
import Nav from './Components/Nav/Nav';
import Gallery from './Components/Gallery/Gallery';

function App() {
  return (
    <>
      <Nav />
      <div className="container text-center">
        <h1>My Runs in pixels</h1>
        <Gallery />
      </div>
    </>
    
  );
}

export default App;
