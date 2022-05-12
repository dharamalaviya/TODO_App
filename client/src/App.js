import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ItemsDisplay from './components/ItemsDisplay'


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path='/' element={<ItemsDisplay />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
