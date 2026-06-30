import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Home } from './components/Pages/Home'
import { NewProject } from './components/Pages/NewProject'
import { NavBar } from './components/Layout/NavBar'
import { Container } from './components/Layout/Container'
import { Footer } from './components/Layout/Footer'
import { Projects } from './components/Pages/Projects'
import { Project } from './components/Pages/Project'
import { ThemeProvider } from './components/Layout/ThemeContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <BrowserRouter>
        <NavBar></NavBar>
        <Container customClass='min-height'>
          <Routes>
            <Route path='/' element={<Home />}></Route>
            <Route path='/projects' element={<Projects />}></Route>
            <Route path='/newproject' element={<NewProject />}></Route>
            <Route path='/project/:id' element={<Project />}></Route>
          </Routes>
        </Container>
        <Footer></Footer>
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>,
)
