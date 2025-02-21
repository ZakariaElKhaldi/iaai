import Navbar from './components/layout/Navbar'
import Hero from './components/sections/Hero'
import Programs from './components/sections/Programs'
import Features from './components/sections/Features'
import Contact from './components/sections/Contact'
import Footer from './components/layout/Footer'

function App() {
  return (
    <div className="min-h-screen bg-slate-900">
      <Navbar />
      <main>
        <Hero />
        <Programs />
        <Features />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export default App
