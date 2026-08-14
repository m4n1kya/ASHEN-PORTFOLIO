import Footer from "./sections/Footer";
import Contact from "./sections/Contact";
import TechStack from "./sections/TechStack";
import Experience from "./sections/Experience";
import Hero from "./sections/Hero";
import ShowcaseSection from "./sections/ShowcaseSection";
import LogoShowcase from "./sections/LogoShowcase";
import FeatureCards from "./sections/FeatureCards";
import Navbar from "./components/NavBar";
import Loader from "./components/Loader";
import AmbientSound from "./components/AmbientSound";
import ParticleCursor from "./components/ParticleCursor";
import SplashScreen from "./components/SplashScreen";

const App = () => (
  <>
    <SplashScreen />
    <ParticleCursor />
    <AmbientSound />
    <Loader />
    <Navbar />
    <Hero />
    <FeatureCards />
    <Experience />
    <ShowcaseSection />
    <LogoShowcase />
    <TechStack />
    <Contact />
    <Footer />
  </>
);

export default App;
