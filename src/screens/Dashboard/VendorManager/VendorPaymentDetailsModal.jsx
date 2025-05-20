import React, { useEffect, useState } from 'react';
import { Button, Checkbox, Col, DatePicker, Form, Input, Modal, Row, Select, TimePicker } from 'antd';
import { apiURL, taskTypes, titleTypes } from '../../../../helper';
import { useNotify } from '../../../utils/NotificationProvider';
import { useSelector } from 'react-redux';
import moment from 'moment';
import api from '../../../../axiosInterceptor';

function VendorPaymentDetailsModal({ isModalOpen, setIsModalOpen, vendorId, setVendorId, bookingId, setBookingId, getSavedVendors }) {
    const [paymentDetails, setPaymentDetails] = useState([])
    const notify = useNotify()
    const [loading, setLoading] = useState(false)

    function getVendorPaymentDetails() {
        return api.get(`/user-payment/get-vendor-payment-details?vendorId=${vendorId}`)
            .then((res) => setPaymentDetails(res.data))
    }

    useEffect(() => {
        if (vendorId)
            getVendorPaymentDetails()
    }, [vendorId])


    function sendPaymentToVendor() {
        setLoading(true)
        const body = {
            bookingId
        }
        return api.post(`${apiURL}/bookings/send-payment-to-vendor`, body)
            .then((res) => {
                notify.success({
                    message: 'Success!',
                    description: res.data.msg,
                    placement: 'topRight',
                })
                getSavedVendors()
                setIsModalOpen(false)
                setLoading(false)
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


    return (
        <>
            <Modal title="Payment Details" open={isModalOpen} footer={[]} closable={false}>
                <div>
                    <div>
                        <p className='font-medium'>Account Name:</p>
                        <p>{paymentDetails?.accountName}</p>
                    </div>
                    <div className='mt-3'>
                        <p className='font-medium'>Bank Name:</p>
                        <p>{paymentDetails?.bankName}</p>
                    </div>
                    <div className='mt-3'>
                        <p className='font-medium'>Account Number:</p>
                        <p>{paymentDetails?.accountNumber}</p>
                    </div>
                    <div className='mt-3'>
                        <p className='font-medium'>IBAN:</p>
                        <p>{paymentDetails?.iban}</p>
                    </div>
                </div>
                <div className='flex items-center justify-end'>
                    <Button
                        type="secondary"
                        className="mt-5 border-none h-6 font-medium"
                        onClick={() => {
                            setIsModalOpen(false);
                            setVendorId(null)
                            setBookingId(null)
                        }}
                    >
                        Close
                    </Button>
                    <Button
                        onClick={() => sendPaymentToVendor()}
                        type="primary"
                        loading={loading}
                        disabled={loading}
                        className="mt-5 border-none h-12 font-medium"
                    >
                        Send Payment
                    </Button>
                </div>
            </Modal>
        </>
    );
};

export default VendorPaymentDetailsModal;