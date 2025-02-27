import React from 'react'
import { BrowserRouter as Router,Routes,Route,Navigate } from 'react-router-dom'
import Home from './pages/Home/Home'
import Company from './pages/Introduce/Company'
import FloatingIcons from './components/FloatingIcons'
import Members from './pages/Introduce/Members'
import Form from './pages/Form/Form'
import News from './pages/News/News'
import Contact from './pages/Contact/Contact'
const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' exact element={<Home/>}/>
          <Route path='/danhmuc/ve-chung-toi' exact element={<Company/>}/>
          <Route path='/danhmuc/doi-ngu-luat-su' exact element={<Members/>}/>
          <Route path='/danhmuc/bieu-mau' exact element={<Form/>}/>
          <Route path='/danhmuc/tin-tuc' exact element={<News/>}/>
          <Route path='/danhmuc/lien-he' exact element={<Contact/>}/>

        </Routes>
      </Router>
      <FloatingIcons/>
    </div>
  )
}

export default App