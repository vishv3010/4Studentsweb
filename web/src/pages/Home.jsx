import Hero from '../components/Hero'
import About from '../components/About'
import Features from '../components/Features'
import HowItWorks from '../components/HowItWorks'
import Stats from '../components/Stats'
import FAQ from '../components/FAQ'
import DownloadCTA from '../components/DownloadCTA'
import SEO from '../components/SEO'

function AnimatedDivider() {
  return <div className="animated-divider max-w-[1200px] mx-auto" />;
}

export default function Home() {
  return (
    <>
      <SEO
        title="4Students — The Campus Super App"
        description="The ultimate college super-app. Buy and sell textbooks & gear, find teammates and roommates, and challenge rival colleges. Free for verified college students."
        canonical="https://4students.in/"
      />
      <Hero />
      <Stats />
      <AnimatedDivider />
      <About />
      <AnimatedDivider />
      <HowItWorks />
      <AnimatedDivider />
      <Features />
      <AnimatedDivider />
      <FAQ />
      <AnimatedDivider />
      <DownloadCTA />
    </>
  )
}
