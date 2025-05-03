import {Navbar, Footer, Loader, Transaction, Services, LandingPage} from './components';

function App() {

  return (
    <div className='min-h-screen'>
      <div className='gradient-bg-welcome'>
        {/* <Navbar /> */}
        <LandingPage />
      </div>
      <Services />
      <Transaction />
      <Footer />
    </div>
  )
}

export default App
