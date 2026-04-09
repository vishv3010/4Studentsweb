import Hero from '../components/Hero'
import About from '../components/About'
import Features from '../components/Features'
import HowItWorks from '../components/HowItWorks'
import Stats from '../components/Stats'
import Testimonials from '../components/Testimonials'
import DownloadCTA from '../components/DownloadCTA'

function AnimatedDivider() {
  return <div className="animated-divider max-w-[1200px] mx-auto" />;
}

export default function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <AnimatedDivider />
      <About />
      <AnimatedDivider />
      <HowItWorks />
      <AnimatedDivider />
      <Features />
      <AnimatedDivider />
      <Testimonials />
      <AnimatedDivider />
      <DownloadCTA />
    </>
  )
}
