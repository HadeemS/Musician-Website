import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './Layout'
import Home from '../pages/Home'
import Music from '../pages/Music'
import Videos from '../pages/Videos'
import Tour from '../pages/Tour'
import Links from '../pages/Links'
import Contact from '../pages/Contact'
import Privacy from '../pages/Privacy'
import NotFound from '../pages/NotFound'

function App() {
  // Get base path from Vite config or default to '/Musician-Website/' for GitHub Pages
  const basePath = import.meta.env.BASE_URL || '/Musician-Website/'

  return (
    <BrowserRouter basename={basePath}>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/music" element={<Music />} />
          <Route path="/videos" element={<Videos />} />
          <Route path="/tour" element={<Tour />} />
          <Route path="/links" element={<Links />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default App


