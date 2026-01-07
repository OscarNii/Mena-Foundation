import { useEffect, useState } from 'react';
import { Navbar } from './components/Navbar';
import { Carousel } from './components/Carousel';
import { About } from './components/About';
import { Gallery } from './components/Gallery';
import VideoSection from './components/VideoSection';
import { DonationForm } from './components/DonationForm';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { WhatsAppButton } from './components/WhatsAppButton';
import Splash from './components/Splash';

function App() {
  const [showSplash, setShowSplash] = useState(true);

  if (showSplash)
    return (
      <Splash
        duration={3000}
        fadeDuration={600}
        onFinish={() => setShowSplash(false)}
      />
    );

  return (
    <div className="min-h-screen">
      <Navbar />
      <Carousel />
      <About />
      <Gallery />
      <VideoSection />
      <DonationForm />
      <Contact />
      <Footer />
      <WhatsAppButton />
    </div>
  );
}

export default App;
