import logo from './logo.svg';
import './App.css';
import DefApiFetch from './components/DefApiFetch';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <DefApiFetch />
      </header>
    </div>
  );
}

export default App;
