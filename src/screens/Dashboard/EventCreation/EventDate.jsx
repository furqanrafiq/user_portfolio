import { Button, Col, DatePicker, Divider, Input, Progress, Row, TimePicker } from 'antd';
import React from 'react'
import { useNavigate, useOutletContext } from 'react-router-dom';

const EventDate = () => {
  const { sharedState, setSharedState } = useOutletContext();
  const navigate = useNavigate()

  function handleEventDate(value) {
    setSharedState({ ...sharedState, 'eventDate': value })
  }

  return (
    <div className='container mx-auto h-[80vh]'>
      <div className='mt-5'>
        <p className='font-serif text-[20px]'>Date & Time 🗓️</p>
        <Progress percent={100} showInfo={false} strokeColor={"black"} size={"small"} />
      </div>
      <div className='flex flex-col justify-center h-full w-[30%] mx-auto '>
        <p className=''>When is your event:</p>
        <Row gutter={[12]} className='mt-2'>
          <Col md={12}>
            <DatePicker className='w-full' />
          </Col>
          <Col md={12}>
            <TimePicker className='w-full' />
          </Col>
          {/* <Input className='mt-3' placeholder='Enter Your Budget' type='number' onChange={(e) => handleEventDate(e.target.value)} /> */}
        </Row>
        <Button type='primary' className='w-full mt-3 h-12 text-base' onClick={() => navigate('/dashboard/event/create/4')}>
          Next
        </Button>
      </div>
    </div>
  )
}

export default EventDate