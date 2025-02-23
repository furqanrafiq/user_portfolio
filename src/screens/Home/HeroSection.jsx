import { Input, Button, Card } from 'antd';
import heroSectionImg from '../../assets/herosection1.png'

const { Search } = Input;

const HeroSection = () => {
  return (
    <div className="relative">
      <div className="absolute inset-0" style={{ background: heroSectionImg }}>
        <div className="absolute inset-0" ></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="text-center">
          <p className="text-black font-serif mb-6 text-heading">
            Plan Your Perfect Wedding
          </p>
          <p className="text-black text-xl max-w-lg mx-auto">
            Everything you need to plan your special day, all in one place.
          </p>
          <div className="mt-10">
            <Card
              className="max-w-2xl mx-auto"
              styles={{ body: { padding: '1rem' } }}
            >
              <Search
                placeholder="Search for vendors, venues, or inspiration"
                enterButton={<Button type="primary" className="bg-pink-500">Search</Button>}
                size="large"
              />
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeroSection