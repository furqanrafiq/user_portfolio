import { Select } from 'antd'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { apiURL } from '../../../helper'

const AllServices = ({ isDisabled, handleService }) => {
    const [services, setAllServices] = useState()

    function getAllServices() {
        return axios.get(`${apiURL}/services/get-all`).then((res) => {
            setAllServices(res.data)
        })
    }

    useEffect(() => {
        getAllServices()
    }, [])


    return (
        <div>
            <Select placeholder="Select a service" className='w-full' disabled={isDisabled}
                loading={!services}
                options={services?.map((item) => ({
                    value: item._id,
                    label: item.name,
                    data: item, 
                }))}
                onChange={(value, option) => {
                    handleService(option.data);
                }}
            />
        </div>
    )
}

export default AllServices