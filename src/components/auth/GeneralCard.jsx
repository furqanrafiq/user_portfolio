import React, { useEffect, useState } from 'react'
import weddingVenue from '../../assets/wedding-venue.jpeg'
import { NavLink } from 'react-router-dom'
import { HeartOutlined, PlusOutlined, StarFilled } from '@ant-design/icons'
import { Button } from 'antd'
import api from '../../../axiosInterceptor'
import { apiURL, imageURL } from '../../../helper'
import { useSelector } from 'react-redux'
import { useNotify } from '../../utils/NotificationProvider'

const GeneralCard = ({ data, addVendor }) => {

    const user = useSelector((state) => state?.user?.user)
    const notify = useNotify()

    function addVendorApi() {
        const body = {
            serviceRequestorId: user?.uuid,
            serviceProviderId: data?.userId,
            userServiceId: data?.uuid
        }

        return api.post(`${apiURL}/bookings/add-vendor`, body)
            .then((res) => {
                notify.success({
                    message: 'Success!',
                    description: res.data.msg,
                    placement: 'topRight',
                })
            }).catch((err) => {
                notify.error({
                    message: 'Error!',
                    description: err.response.data.msg,
                    placement: 'topRight',
                })
            })
    }

    return (
        <div className='general-card'>
            <div className='relative'>
                <NavLink to={`/service-details/${data?.uuid}`}>
                    <img className='general-image overlay w-full min-h-[250px]' src={data?.serviceImages?.length > 0 ? imageURL + data?.serviceImages[0]?.imagePath : weddingVenue} />
                </NavLink>
            </div>
            <div className='text-left p-5'>
                <div className='flex justify-between'>
                    <p className='general-heading font-medium mb-3'>{data?.serviceName}</p>
                    <p className='general-heading font-medium mb-3'><StarFilled /> {data?.averageRating ? data?.averageRating?.toFixed(1) : 0}</p>
                </div>
                <div className='flex justify-between'>
                    <div>
                        <p className='font-bold'>{data?.name}</p>
                        <p className='text-[12px] font-medium'>{data?.location}</p>
                    </div>
                    {
                        addVendor &&
                        <div>
                            <Button type='primary' onClick={() => addVendorApi()}><PlusOutlined /> Add Vendor</Button>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default GeneralCard