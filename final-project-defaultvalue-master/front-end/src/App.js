import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'


import Header from './components/headerComponent/header'
import Footer from './components/footerComponent/footer'
import Home from './components/pages/Home'
import  Projects from './components/pages/Projects'
import Resume from './components/pages/Resume'


function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <div className="container">
          <Route exact path="/" component={Home}/>
          <Route exact path="/resume" component={Resume}/>
          <Route exact path="/projects" component={Projects}/>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
