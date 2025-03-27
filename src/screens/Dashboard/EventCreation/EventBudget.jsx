import { Button, Divider, Input, Progress } from 'antd';
import React from 'react'
import { useNavigate, useOutletContext } from 'react-router-dom';

const EventBudget = () => {
  const { sharedState, setSharedState } = useOutletContext();
  const navigate = useNavigate()

  function handleEventBudget(value) {
    setSharedState({ ...sharedState, 'eventBudget': value })
  }

  return (
    <div className='container mx-auto h-[80vh]'>
      <div className='mt-5'>
        <p className='font-serif text-[20px]'>Event Budget 💰</p>
        <Progress percent={60} showInfo={false} strokeColor={"black"} size={"small"} />
      </div>
      <div className='flex flex-col justify-center h-full w-[30%] mx-auto '>
        <p className=''>What's your budget for the event:</p>
        <div className=''>
          <Input className='mt-3' placeholder='Enter Your Budget' type='number' onChange={(e) => handleEventBudget(e.target.value)} />
        </div>
        <Button type='primary' className='w-full mt-3 h-12 text-base' onClick={() => navigate('/dashboard/event/create/4')}>
          Next
        </Button>
      </div>
    </div>
  )
}

export default EventBudget