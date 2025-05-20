import { LeftOutlined } from '@ant-design/icons';
import { Button, Col, DatePicker, Divider, Input, Progress, Row, TimePicker } from 'antd';
import React, { useState } from 'react'
import { useNavigate, useOutletContext } from 'react-router-dom';
import api from '../../../../axiosInterceptor';
import { useNotify } from '../../../utils/NotificationProvider';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';

const EventDate = ({ eventData, setEventData }) => {
  const navigate = useNavigate()
  const notify = useNotify();
  const [loading, setLoading] = useState(false)
  const user = useSelector((state) => state?.user?.user)

  function handleEventDate(date, dateString) {
    setEventData({ ...eventData, 'eventDate': dayjs(date).format('YYYY-MM-DD HH:mm:ss') });
  }

  function saveEvent() {
    setLoading(true)
    const data = { ...eventData }
    data.userId = user?.uuid
    return api.post('/events/insert-user-event', data)
      .then((res) => {
        setLoading(false)
        notify.success({
          message: 'Success!',
          description: res.data.msg,
          placement: 'topRight',
        });
        navigate('/dashboard/home')
      })
      .catch((err) => {
        setLoading(false)
        notify.error({
          message: 'Error!',
          description: err.data.msg,
          placement: 'topRight',
        });
      }
      )
  }

  return (
    <div className='container mx-auto h-[80vh]'>
      <div className='mt-5'>
        <p className='font-serif text-[20px]'>
          <LeftOutlined className='text-[14px] bg-secondary p-2 rounded-[50%] mr-3' onClick={() => navigate(-1)} />
          Date & Time 🗓️</p>
        <Progress percent={100} showInfo={false} strokeColor={"black"} size={"small"} />
      </div>
      <div className='flex flex-col justify-center h-full w-[30%] mx-auto '>
        <p className=''>When is your event:</p>
        <DatePicker showTime className='w-full' onChange={handleEventDate} />
        <Button type='primary' className='w-full mt-3 h-12 text-base' onClick={() => saveEvent()}>
          Save
        </Button>
      </div>
    </div>
  )
}

export default EventDate