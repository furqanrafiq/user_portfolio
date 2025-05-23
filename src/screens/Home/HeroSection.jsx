import { Input, Button, Card } from 'antd';
import heroSectionImg from '../../assets/herosection1.png'
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

const { Search } = Input;

const HeroSection = () => {
  const user = useSelector((state) => state?.user?.user)

  return (
    <div className="relative hero-section">
      <img className='hero-section-image' />
      {/* <div className="absolute inset-0" >
        <div className="absolute inset-0" ></div>
      </div> */}

      <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="text-center">
          <p className='font-serif text-[20px]'>Simple. Organized. Stress-Free.</p>
          <p className="text-black font-serif mb-6 text-[32px]">
            Plan Your Perfect Wedding
          </p>
          <NavLink to={user?.uuid ? '/dashboard/home' : '/login'}>
            <Button type='primary'
              className="border-none text-base font-medium p-5 mb-6"
              size="small"
            >
              Start Planning
            </Button>
          </NavLink>
          {/* <p className="text-black text-xl max-w-lg">
            Everything you need to plan your special day, all in one place.
          </p> */}
          {/* <div className="mt-10">
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
          </div> */}
        </div>
      </div>
    </div>
  )
}

export default HeroSection