import { Col, Empty, Row, Segmented } from 'antd'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import GeneralCard from '../../../components/auth/GeneralCard'
import api from '../../../../axiosInterceptor'
import { apiURL } from '../../../../helper'

const SuggestedVendors = () => {
    const services = useSelector((state) => state?.service?.services)
    const [serviceFilter, setServiceFilter] = useState('All')
    const [suggestedVendors, setSuggestedVendors] = useState([])
    const user = useSelector((state) => state?.user?.user)

    function getVendors() {
        return api.get(`${apiURL}/services/get-services?serviceName=${serviceFilter}`).then((res) => {
            setSuggestedVendors(res.data)
        })
    }

    function getRecommendations() {
        return api.get(`${apiURL}/services/get-recommended-services?userId=${user?.uuid}`).then((res) => {
            setSuggestedVendors(res.data)
        })
    }

    useEffect(() => {
        if (serviceFilter == 'Recommendations') {
            getRecommendations()
        } else {
            getVendors()
        }
    }, [serviceFilter])


    return (
        <div>
            <Segmented
                options={[
                    // 'Recommendations',
                    'All',
                    ...services?.map(item => item.name)
                ]}
                onChange={(value) => {
                    setServiceFilter(value); // string
                }}
            />

            <Row gutter={[24, 24]} className='justify-center mt-5'>
                {
                    suggestedVendors?.length > 0 ?
                        suggestedVendors?.map(item => {
                            return (
                                <Col span={6} key={item}>
                                    <GeneralCard data={item} addVendor={true} />
                                </Col>
                            )
                        })
                        :
                        <Empty />
                }
            </Row>
        </div>
    )
}

export default SuggestedVendors