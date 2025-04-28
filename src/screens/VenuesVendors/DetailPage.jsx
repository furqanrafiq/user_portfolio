import React, { useEffect, useState } from 'react'
import { ImageGallery } from '../../components/gallery/ImageGallery'
import { Button, Col, Row } from 'antd'
import { HeartFilled, PhoneOutlined } from '@ant-design/icons'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { apiURL } from '../../../helper'

const DetailPage = () => {
    const [service, setService] = useState()
    const params = useParams()

    function getServiceDetails() {
        return axios.get(`${apiURL}/services/get-service-details?serviceId=${params.serviceId}`).then((res) => {
            setService(res.data)
        })
    }

    useEffect(() => {
        getServiceDetails()
    }, [params])

    return (
        <div className='container mx-auto my-10'>
            <div className='text-center'>
                <p style={{ border: "1px solid darkgrey", width: "fit-content", borderRadius: "20px", padding: "10px", margin: "0px auto" }} className='font-sans'>{service?.serviceName}</p>
                <p className='font-serif text-heading'>Lisbon, Portugal</p>
                <p className='font-sans text-[16px]'>Lisbon, Portugal</p>
            </div>
            <div className='mt-5 w-[50%] mx-auto'>
                <ImageGallery images={service?.images} />
            </div>
            <div className='mt-5 w-[75%] mx-auto'>
                <Row className='justify-between' gutter={24}>
                    <Col md={12}>
                        <p className='font-serif text-heading'>About Pestana Palace Lisboa</p>
                        <p className='font-sans text-[16px]'>This 5-star hotel in Lisbon is close to the city's main monuments, such as the Tower of Belém, the Belém Cultural Centre, the Jerónimos Monastery, the MAAT –Museum of Art, Architecture and Technology, and the Lisbon Convention Centre. It is also 5 minutes from the CUF Tejo Hospital. With two swimming pools, indoor (25 degrees) and outdoor, a spa and lush gardens complete with plants designated as "National Monuments", this is the perfect hotel for your stay.</p>
                    </Col>
                    <Col md={8}>
                        <div className='bg-white rounded p-5 font-sans'>
                            <p className='font-serif text-[20px] mb-5'>About Pestana Palace Lisboa</p>
                            <p><PhoneOutlined /> (+123) 456789</p>
                            <p><PhoneOutlined /> (+123) 456789</p>
                            <Button type='primary' className="mt-5 w-full border-none h-12 text-base font-medium">
                                <HeartFilled />
                                Add Vendor
                            </Button>
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    )
}

export default DetailPage