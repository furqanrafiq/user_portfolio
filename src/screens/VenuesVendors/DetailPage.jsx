import React, { useEffect, useState } from 'react'
import { ImageGallery } from '../../components/gallery/ImageGallery'
import { Button, Col, Rate, Row } from 'antd'
import { HeartFilled, PhoneOutlined } from '@ant-design/icons'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { apiURL } from '../../../helper'
import ReviewModal from './ReviewModal'

const DetailPage = () => {
    const [service, setService] = useState()
    const [reviews, setReviews] = useState()
    const params = useParams()
    const [isModalOpen, setIsModalOpen] = useState(false)

    function getServiceDetails() {
        return axios.get(`${apiURL}/services/get-service-details?serviceId=${params.serviceId}`).then((res) => {
            setService(res.data)
        })
    }

    function getServiceReviews() {
        return axios.get(`${apiURL}/reviews/get-service-reviews?serviceId=${params.serviceId}`).then((res) => {
            setReviews(res.data)
        })
    }

    useEffect(() => {
        getServiceDetails()
        getServiceReviews()
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
                            <Button type='primary' className="mt-5 w-full border-none h-12 text-base font-medium" onClick={() => setIsModalOpen(true)}>
                                Add Review
                            </Button>
                            <ReviewModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} serviceId={params.serviceId} getServiceReviews={getServiceReviews} />
                        </div>
                    </Col>
                </Row>
            </div>
            <div className='mt-5 w-[75%] mx-auto'>
                <p className='font-serif text-heading'>Reviews</p>
                <div className="flex">
                    <div className="grid grid-cols-3 gap-4">
                        {
                            reviews?.length > 0 ?
                                reviews?.map((item) => {
                                    return (
                                        <div key={item.uuid} className="w-full mx-auto rounded-lg bg-white border border-gray-200 p-5 text-gray-800 font-light mb-6">
                                            <div className="w-full flex mb-4 items-center">
                                                <div className="flex-grow ">
                                                    <h6 className="font-bold text-sm uppercase text-gray-600">{item.userName}</h6>
                                                    <Rate value={item.rating} className='mt-3' />
                                                </div>
                                            </div>
                                            <div className="w-full">
                                                <p className="text-sm leading-tight"><span className="text-lg leading-none italic font-bold text-gray-400 mr-1">"</span>
                                                    {item.description}
                                                    <span className="text-lg leading-none italic font-bold text-gray-400 ml-1">"</span></p>
                                            </div>
                                        </div>
                                    )
                                })
                                :
                                <div className='ml-3'>
                                    <p className='font-sans'>No reviews</p>
                                </div>
                        }
                        {/* <div className="w-full mx-auto rounded-lg bg-white border border-gray-200 p-5 text-gray-800 font-light mb-6">
                            <div className="w-full flex mb-4 items-center">
                                <div className="flex-grow ">
                                    <h6 className="font-bold text-sm uppercase text-gray-600">Stevie Tifft.</h6>
                                    <Rate value={3} className='mt-3' />
                                </div>
                            </div>
                            <div className="w-full">
                                <p className="text-sm leading-tight"><span className="text-lg leading-none italic font-bold text-gray-400 mr-1">"</span>Lorem ipsum, dolor sit amet, consectetur adipisicing elit. Dolore quod necessitatibus, labore sapiente, est, dignissimos ullam error ipsam sint quam tempora vel.<span className="text-lg leading-none italic font-bold text-gray-400 ml-1">"</span></p>
                            </div>
                        </div>
                        <div className="w-full mx-auto rounded-lg bg-white border border-gray-200 p-5 text-gray-800 font-light mb-6">
                            <div className="w-full flex mb-4 items-center">
                                <div className="flex-grow ">
                                    <h6 className="font-bold text-sm uppercase text-gray-600">Stevie Tifft.</h6>
                                    <Rate value={2} className='mt-3' />
                                </div>
                            </div>
                            <div className="w-full">
                                <p className="text-sm leading-tight"><span className="text-lg leading-none italic font-bold text-gray-400 mr-1">"</span>Lorem ipsum, dolor sit amet, consectetur adipisicing elit. Dolore quod necessitatibus, labore sapiente, est, dignissimos ullam error ipsam sint quam tempora vel.<span className="text-lg leading-none italic font-bold text-gray-400 ml-1">"</span></p>
                            </div>
                        </div> */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DetailPage