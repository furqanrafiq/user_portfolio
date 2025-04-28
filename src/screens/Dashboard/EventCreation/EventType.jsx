import { LeftOutlined } from '@ant-design/icons';
import { Button, Divider, Progress, Radio } from 'antd';
import React, { useState } from 'react'
import { useNavigate, useOutletContext } from 'react-router-dom';
import { eventTypes } from '../../../../helper';

const EventType = ({ eventData, setEventData }) => {

  // const { eventData, setEventData } = useOutletContext();
  const navigate = useNavigate()
  const [eventType, setEventType] = useState()

  return (
    <div className='container mx-auto h-[80vh]'>
      <div className='mt-5'>
        <p className='font-serif text-[20px]'>
          <LeftOutlined className='text-[14px] bg-secondary p-2 rounded-[50%] mr-3' onClick={() => navigate(-1)}/>
          Let's create your Event
        </p>
        <Progress percent={20} showInfo={false} strokeColor={"black"} size={"small"} />
      </div>
      <div className='flex flex-col justify-center h-full w-[50%] mx-auto'>
        <p className='mb-3'>Choose the event type:</p>
        <Radio.Group className='event-type-radio' value={eventType} onChange={(e) => { setEventType(e.target.value); setEventData({ ...eventData, 'eventType': e.target.value }) }}>
          {
            eventTypes?.map((item) => {
              return (
                <Radio.Button key={item.name} value={item.name} className='mr-3 mb-3 border-0 border-l-0 text-black hover:text-black'>{item.name}</Radio.Button>
              )
            })
          }
        </Radio.Group>
        <p style={{ backgroundColor: "#FFF0D8" }} className='p-5 rounded'>🎉 Let's plan your unforgettable event filled with laughter, dancing, and endless memories!</p>
        <Button type='primary' className='w-full mt-3 h-12 text-base' onClick={() => navigate('/dashboard/event/create/2')}>
          Next
        </Button>
      </div>
    </div>
  )
}

export default EventType