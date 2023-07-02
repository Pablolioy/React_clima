import logo from './logo.svg';
import './App.css';

import Buscador from './Components/Buscador';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Buscador/>
      </header>
    </div>
  );
}

export default App;
