import React from 'react'
import GeneralCard from '../../components/auth/GeneralCard'
import { Col, Row } from 'antd'

const WeddingVenue = () => {

    const items = [1, 2, 3, 4, 5, 6, 7, 8]

    return (
        <div className='py-10 text-center'>
            <p className='font-serif text-heading'>Wedding Venue
            </p>
            <p className='font-sans'>Check out our curated list of extraordinary hotels, private estates, exquisite venues, and restaurants for your wedding day.
            </p>
            <div className='max-w-7xl mx-auto'>
                <Row gutter={[24,24]} className='justify-center mt-5'>
                    {
                        items.map(item => {
                            return (
                                <Col span={6} key={item}>
                                    <GeneralCard />
                                </Col>
                            )
                        })
                    }
                </Row>
            </div>
        </div>
    )
}

export default WeddingVenue