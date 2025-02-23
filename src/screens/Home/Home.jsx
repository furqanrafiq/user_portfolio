import HeroSection from "./HeroSection"
import LatestVendors from "./LatestVendors"
import OurTools from "./OurTools"

const Home = () => {
    return (
        <div>
            <HeroSection />
            <OurTools />
            <LatestVendors />
            <HeroSection />
        </div>
    )
}

export default Home