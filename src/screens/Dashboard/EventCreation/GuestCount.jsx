import { LeftOutlined } from '@ant-design/icons';
import { Button, Divider, Input, Progress } from 'antd';
import React from 'react'
import { useNavigate, useOutletContext } from 'react-router-dom';

const GuestCount = ({ eventData, setEventData }) => {
  // const { eventData, setEventData } = useOutletContext();
  const navigate = useNavigate()

  function handleGuestCount(value) {
    setEventData({ ...eventData, 'guestCount': value })
  }

  return (
    <div className='container mx-auto h-[80vh]'>
      <div className='mt-5'>
        <p className='font-serif text-[20px]'>
          <LeftOutlined className='text-[14px] bg-secondary p-2 rounded-[50%] mr-3' onClick={() => navigate(-1)} />
          Event Guest Count🫂</p>
        <Progress percent={40} showInfo={false} strokeColor={"black"} size={"small"} />
      </div>
      <div className='flex flex-col justify-center h-full w-[30%] mx-auto'>
        <p className=''>How many guests are you expecting at your event:</p>
        <div className=''>
          <Input className='mt-3' placeholder='Enter Guest Count' type='number' onChange={(e) => handleGuestCount(e.target.value)} />
        </div>
        <Button type='primary' className='w-full mt-3 h-12 text-base' onClick={() => navigate('/dashboard/event/create/3')}>
          Next
        </Button>
      </div>
    </div>
  )
}

export default GuestCount