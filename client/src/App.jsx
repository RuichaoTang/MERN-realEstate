import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import Profile from './pages/Profile'
import About from './pages/About'
import Home from './pages/Home'
import Header from './components/Header'
import Footer from './components/Footer'
import PrivateRoute from './components/PrivateRoute'
import CreateListing from './pages/CreateListing'
import ShowListings from './pages/ShowListings'
import Search from './pages/Search'

export default function App() {
  return (
    <BrowserRouter>
    <Header />
      <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/sign-in' element={<Signin />} />
      <Route path='/about' element={<About />} />
      <Route path='/sign-up' element={<Signup />} />
      <Route path='/listing/:listingId' element={<ShowListings/>} />
      <Route path='/search/' element={<Search/>}/>
      <Route element={<PrivateRoute/>}>
        <Route path='/profile' element={<Profile />} />
        <Route path='/create-listing' element={<CreateListing/>}/>
      </Route>
      </Routes>
      <Footer/>
    </BrowserRouter>
    //test#
  )
}
