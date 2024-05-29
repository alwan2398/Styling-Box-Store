import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import CategoryPage from './pages/CategoryPage'
import Home from './pages/Home'
import ProductAll from './pages/ProductAll'
import ProductDetail from './pages/ProductDetail'

const App = () => {
  return (
    <>
      <Router>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/ProductAll' element={<ProductAll/>}/>
          <Route path='/product/:id' element={<ProductDetail/>}/>
          <Route path='/category/:category' element={<CategoryPage/>}/>
        </Routes>
        <Footer/>
      </Router>
    </>
  )
}

export default App