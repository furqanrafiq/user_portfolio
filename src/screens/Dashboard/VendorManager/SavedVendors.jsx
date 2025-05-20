import { useEffect, useState } from 'react'
import { Select, Space, Table, Tag } from 'antd';
import { apiURL } from '../../../../helper';
import { useSelector } from 'react-redux';
import { useNotify } from '../../../utils/NotificationProvider';
import api from '../../../../axiosInterceptor';
import { Navigate, NavLink } from 'react-router-dom';
import VendorPaymentDetailsModal from './VendorPaymentDetailsModal';

const SavedVendors = ({ key }) => {

  const user = useSelector((state) => state?.user?.user)
  const notify = useNotify()
  const [data, setData] = useState([])
  const [events, setEvents] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [vendorId, setVendorId] = useState(null)
  const [bookingId, setBookingId] = useState(null)
  const [loading, setLoading] = useState(false)

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
    setLoading(true)
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
        setLoading(false)
        getSavedVendors()
      })
      .catch((err) => {
        notify.error({
          message: 'Error!',
          description: err.response.data.msg,
          placement: 'topRight',
        })
        setLoading(false)
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
              <Tag color='blue' className='hover:cursor-pointer' onClick={() => sendRequestToVendor(record.uuid)}>{loading ? 'Sending...' : 'Send Request'}</Tag>
              :
              record.isRequestSent && !record.isApproved && !record.isRejected ?
                <Tag color='blue' className='hover:cursor-pointer'>Pending</Tag>
                :
                record.isRequestSent && record.isApproved && !record.isRejected ?
                  <Tag color='green' className='hover:cursor-pointer'>Approved</Tag>
                  :
                  <Tag color='red' className='hover:cursor-pointer'>Rejected</Tag>
          }

          {
            record?.isApproved && (
              !record.isPaymentSent ?
                <Tag color='blue' className='hover:cursor-pointer' onClick={() => { setIsModalOpen(true); setVendorId(record.serviceProviderId); setBookingId(record.uuid) }}>Send Payment</Tag>
                :
                record.isPaymentSent && !record.isPaymentReceived ?
                  <Tag color='purple'>Payment Sent</Tag>
                  :
                  <Tag color='green' className='hover:cursor-pointer'>Payment Done</Tag>
            )
          }
          <NavLink to={`/service-details/${record.uuid}`}>
            <Tag color='purple' className='hover:cursor-pointer'>View Service</Tag>
          </NavLink>
        </Space>
      )
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
      <VendorPaymentDetailsModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} vendorId={vendorId} setVendorId={setVendorId} bookingId={bookingId} setBookingId={setBookingId} getSavedVendors={getSavedVendors} />
    </div>
  )
}

export default SavedVendors