import { Input, Button, Card } from 'antd';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

const { Search } = Input;

const AboveFooter = () => {
  const user = useSelector((state) => state?.user?.user)

  return (
    <div className="relative above-footer my-10">
      <img className='above-footer-image' />
      {/* <div className="absolute inset-0" >
        <div className="absolute inset-0" ></div>
      </div> */}

      <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="text-center">
          <p className="text-black font-serif text-[32px]">
            Start Using Our Free Wedding Planning Software!
          </p>
          <p className="text-black font-sans mb-6">
            Start using the ultimate free online wedding planner free and simplify your wedding planning with personalized recommendations
          </p>
          <NavLink to={user?.uuid ? '/dashboard/home' : '/login'}>
            <Button type='primary'
              className="border-none text-base font-medium p-5 mb-6"
              size="small"
            >
              Start Planning
            </Button>
          </NavLink>
        </div>
      </div>
    </div>
  )
}

export default AboveFooter