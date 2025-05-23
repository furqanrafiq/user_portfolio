import { Row, Col, Button } from 'antd';
import GeneralCard from '../../components/auth/GeneralCard';
import dashboard from '../../assets/our-tools.png'
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ArrowRightOutlined } from '@ant-design/icons';


const OurTools = () => {
    const user = useSelector((state) => state?.user?.user)

    return (
        <div className='my-10 w-[75%] mx-auto text-center flex flex-col justify-center'>
            <p className='font-serif text-heading mb-5'>How Our Free Online Wedding Planner Works</p>
            <p className='font-sans mb-5'>Plan your dream wedding with ease! Start using our wedding planner online free today - it’s like having your own virtual wedding assistant to guide you every step of the way. From budgeting and checklists to inspiration and vendor connections, we make planning stress-free and fun. Whether you're just starting or finalizing the details, Loverly has everything you need in one place.
            </p>
            <NavLink to={user?.uuid ? '/dashboard/home' : '/login'}>
                <Button type='primary'
                    className="border-none text-base font-medium p-5 mb-6"
                    size="small"
                >
                    Set Up Dashboard <ArrowRightOutlined rotate={315}/>
                </Button>
            </NavLink>
            <img src={dashboard} className='w-[80%] mx-auto' />
        </div>
    )
}

export default OurTools