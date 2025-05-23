import { Card, Row, Col, Typography, Empty } from 'antd';
import GeneralCard from '../../components/auth/GeneralCard';
import api from '../../../axiosInterceptor';
import { apiURL } from '../../../helper';
import { useEffect, useState } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const responsive = {
    superLargeDesktop: {
        // the naming can be any, depends on you.
        breakpoint: { max: 4000, min: 3000 },
        items: 5
    },
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 3
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1
    }
};

const LatestVendors = () => {
    const [suggestedVendors, setSuggestedVendors] = useState([])

    function getVendors() {
        return api.get(`${apiURL}/services/get-services?serviceName=All`).then((res) => {
            setSuggestedVendors(res.data)
        })
    }

    useEffect(() => {
        getVendors()
    }, [])

    return (
        <div className='my-10'>
            <div className='text-center  mb-3'>
                <p className='font-serif text-heading'>Latest Vendors</p>
                <p className='font-sans text-[16px]'>Looking for your wedding vendor dream team? Browse our curated lists of the best wedding vendors and wedding companies.</p>
            </div>
            <div className='w-[50%] justify-content-center mx-auto'>
                <Carousel responsive={responsive} partialVisible="false">
                    {
                        suggestedVendors?.length > 0 ?
                            suggestedVendors?.map(item => {
                                return (
                                    <div key={item} className='gap-4'>
                                        <GeneralCard data={item} />
                                    </div>
                                )
                            })
                            :
                            <Empty />
                    }
                </Carousel>
                {/* <Row gutter={24} className='mx-0'>
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
                </Row> */}
            </div>
        </div>
    )
}

export default LatestVendors