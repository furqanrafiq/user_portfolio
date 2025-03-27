import { Button, Divider, Input, Progress, Radio } from 'antd';
import React from 'react'
import { useNavigate, useOutletContext } from 'react-router-dom';

const EventLocation = () => {
  const { sharedState, setSharedState } = useOutletContext();
  const navigate = useNavigate()

  function handleEventLocation(value) {
    setSharedState({ ...sharedState, 'eventLocation': value })
  }

  return (
    <div className='container mx-auto h-[80vh]'>
      <div className='mt-5'>
        <p className='font-serif text-[20px]'>Event Venue 📍</p>
        <Progress percent={80} showInfo={false} strokeColor={"black"} size={"small"} />
      </div>
      <div className='flex flex-col justify-center h-full w-[30%] mx-auto'>
        <p className=''>Have you booked your event venue?</p>
        <div className='mt-2'>
          <Radio.Group onChange={(e) => handleEventLocation(e.target.value)} options={[
            {
              value: true,
              label: "Yes"
            },
            {
              value: false,
              label: "No"
            },
          ]} />
        </div>
        <div className='mt-2'>
          <Input size='large' placeholder="What's your event venue" prefix={"📍"}/>
        </div>
        <Button type='primary' className='w-full mt-3 h-12 text-base' onClick={() => navigate('/dashboard/event/create/5')}>
          Next
        </Button>
      </div>
    </div>
  )
}

export default EventLocation