import { LeftOutlined } from '@ant-design/icons';
import { Button, Divider, Input, Progress, Radio } from 'antd';
import React from 'react'
import { useNavigate, useOutletContext } from 'react-router-dom';

const EventLocation = ({ eventData, setEventData }) => {
  const navigate = useNavigate()

  function handleEventLocation(value) {
    setEventData({ ...eventData, 'eventLocation': value })
  }

  return (
    <div className='container mx-auto h-[80vh]'>
      <div className='mt-5'>
        <p className='font-serif text-[20px]'>
          <LeftOutlined className='text-[14px] bg-secondary p-2 rounded-[50%] mr-3' onClick={() => navigate(-1)} />
          Event Venue 📍</p>
        <Progress percent={80} showInfo={false} strokeColor={"black"} size={"small"} />
      </div>
      <div className='flex flex-col justify-center h-full w-[30%] mx-auto'>
        <p className=''>Where is your event venue?</p>
        <div className='mt-2'>
          <Input size='large' placeholder="Enter location" prefix={"📍"} onChange={(e) => handleEventLocation(e.target.value)} />
        </div>
        <Button type='primary' className='w-full mt-3 h-12 text-base' onClick={() => navigate('/dashboard/event/create/5')}>
          Next
        </Button>
      </div>
    </div>
  )
}

export default EventLocation