import { Card, Row, Col, Typography } from 'antd';
import GeneralCard from '../../components/auth/GeneralCard';

const LatestVendors = () => {
    return (
        <div className='mt-5'>
            <div className='text-center  mb-3'>
                <p className='font-serif text-heading'>Latest Vendors</p>
                <p className='font-sans text-[16px]'>Looking for your wedding vendor dream team? Browse our curated lists of the best wedding vendors and wedding companies.</p>
            </div>
            <div className='w-[50%] justify-content-center mx-auto'>
                <Row gutter={24} className='mx-0'>
                    {[
                        {
                            title: "Venues",
                            image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80",
                            description: "Find your perfect wedding venue"
                        },
                        {
                            title: "Photographers",
                            image: "https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&q=80",
                            description: "Capture every moment"
                        },
                        {
                            title: "Dresses",
                            image: "https://images.unsplash.com/photo-1594552072238-48c865ff5113?auto=format&fit=crop&q=80",
                            description: "Find your dream dress"
                        }
                    ].map((category, index) => (
                        <Col key={index} xs={24} md={8}>
                            <GeneralCard />
                        </Col>
                    ))}
                </Row>
            </div>
        </div>
    )
}

export default LatestVendors