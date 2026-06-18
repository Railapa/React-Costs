import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Home } from './components/Pages/Home'
import { Company } from './components/Pages/Company'
import { Contact } from './components/Pages/Contact'
import { NewProject } from './components/Pages/NewProject'
import { NavBar } from './components/Layout/NavBar'
import { Container } from './components/Layout/Container'
import {Footer} from './components/Layout/Footer'
import { Projects } from './components/Pages/Projects'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <NavBar></NavBar>
      <Container customClass='min-height'>
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/projects' element={<Projects />}></Route>
          <Route path='/company' element={<Company />}></Route>
          <Route path='/contact' element={<Contact />}></Route>
          <Route path='/newproject' element={<NewProject />}></Route>
        </Routes>
      </Container>
      <Footer></Footer>
    </BrowserRouter>
  </StrictMode>,
)
