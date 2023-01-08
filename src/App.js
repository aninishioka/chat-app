import './App.css';
import CurrentChat from './Components/CurrentChat';
import Sidebar from './Components/Sidebar';

function App() {
  return (
    <div className="app">
      {/* sidebar */}
      <Sidebar></Sidebar>

      {/* current conversation */}
      <CurrentChat></CurrentChat>
    </div>
  );
}

export default App;
