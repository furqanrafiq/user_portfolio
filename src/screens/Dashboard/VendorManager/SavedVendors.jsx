import { useEffect, useState } from 'react'
import { Select, Space, Table, Tag } from 'antd';
import { apiURL } from '../../../../helper';
import { useSelector } from 'react-redux';
import { useNotify } from '../../../utils/NotificationProvider';
import api from '../../../../axiosInterceptor';

const SavedVendors = ({ key }) => {

  const user = useSelector((state) => state?.user?.user)
  const notify = useNotify()
  const [data, setData] = useState([])
  const [events, setEvents] = useState([])

  function setEventForBooking(eventId, bookingId) {
    const body = {
      eventId,
      bookingId
    }
    return api.post(`${apiURL}/bookings/set-booking-event`, body)
      .then((res) => {
        notify.success({
          message: 'Success!',
          description: res.data.msg,
          placement: 'topRight',
        });
        getSavedVendors()
      })
  }

  function sendRequestToVendor(bookingId) {
    const body = {
      bookingId
    }
    return api.post(`${apiURL}/bookings/send-request-to-vendor`, body)
      .then((res) => {
        notify.success({
          message: 'Success!',
          description: res.data.msg,
          placement: 'topRight',
        })
        getSavedVendors()
      })
      .catch((err) => {
        notify.error({
          message: 'Error!',
          description: err.response.data.msg,
          placement: 'topRight',
        })
      })
  }

  const columns = [
    {
      title: 'Service Type',
      dataIndex: 'serviceName',
      key: 'serviceName',
      render: (_, record) => (
        <p>{record?.ServiceDetails?.serviceName}</p>
      )
    },
    {
      title: 'Service Price',
      dataIndex: 'price',
      key: 'price',
      render: (_, record) => (
        <p>{record?.ServiceDetails?.price}</p>
      )
    },
    {
      title: 'Event',
      dataIndex: 'event',
      key: 'event',
      render: (_, record) => (
        <Select placeholder="Select Event"
          options={events?.map((item) => ({
            value: item.uuid,
            label: item.eventType
          }))}
          disabled={record?.isRejected || record?.isApproved}
          value={record?.EventDetails?.uuid}
          className='w-full'
          onChange={(eventId) => setEventForBooking(eventId, record?.uuid)}
        />
      )
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          {
            !record.isRequestSent && !record.isApproved && !record.isRejected ?
              <Tag color='blue' className='hover:cursor-pointer' onClick={() => sendRequestToVendor(record.uuid)}>Send Request</Tag>
              :
              record.isRequestSent && !record.isApproved && !record.isRejected ?
                <Tag color='blue' className='hover:cursor-pointer' onClick={() => sendRequestToVendor(record.uuid)}>Pending</Tag>
                :
                record.isRequestSent && record.isApproved && !record.isRejected ?
                  <Tag color='green' className='hover:cursor-pointer' onClick={() => sendRequestToVendor(record.uuid)}>Approved</Tag>
                  :
                  <Tag color='red' className='hover:cursor-pointer' onClick={() => sendRequestToVendor(record.uuid)}>Rejected</Tag>
          }
          <Tag color='purple' className='hover:cursor-pointer'>View Service</Tag>
        </Space>
      ),
      //   render: (_, record) => (
      //     !record?.IsApproved && !record?.IsRejected ?
      //         <Tag color='purple' className='hover:cursor-pointer'>Pending</Tag>
      //         :
      //         record?.IsApproved ?
      //             <Tag color='green' className='hover:cursor-pointer'>Accepted</Tag>
      //             :
      //             <Tag color='red' className='hover:cursor-pointer'>Rejected</Tag>
      // )
    },
  ];

  function getSavedVendors() {
    return api.get(`${apiURL}/bookings/get-saved-vendors?userId=${user?.uuid}`)
      .then((res) => setData(res.data))
  }

  function getUserEvents() {
    return api.get(`/events/get-user-events?userId=${user?.uuid}`)
      .then((res) => setEvents(res.data))
  }

  useEffect(() => {
    getUserEvents()
    getSavedVendors()
  }, [])


  return (
    <div>
      <Table columns={columns} dataSource={data} />
    </div>
  )
}

export default SavedVendors