import React, { useEffect, useRef, useState } from 'react';
import { Button, Checkbox, Col, DatePicker, Form, Input, Modal, Row, Select, Table, TimePicker } from 'antd';
import { apiURL, taskTypes, titleTypes } from '../../../../helper';
import { useNotify } from '../../../utils/NotificationProvider';
import { useSelector } from 'react-redux';
import moment from 'moment';
import api from '../../../../axiosInterceptor';
import dayjs from 'dayjs';
import { DownloadOutlined, HeartFilled } from '@ant-design/icons';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

function InvoiceModal({ isModalOpen, setIsModalOpen, selectedItem }) {

    const user = useSelector((state) => state?.user?.user)
    const [loading, setLoading] = useState(false)

    const invoiceRef = useRef();

    const handleDownloadPDF = async () => {
        setLoading(true)
        const element = invoiceRef.current;
        const canvas = await html2canvas(element, { scale: 2 });
        const imgData = canvas.toDataURL('image/png');

        const pdf = new jsPDF('p', 'mm', 'a4');
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save('EasyShadi Invoice.pdf');
        setLoading(false)
    };

    return (
        <>
            <Modal open={isModalOpen} footer={[]} closable={false}>
                <div ref={invoiceRef} className='p-4'>
                    <div className="flex items-center justify-between">
                        <div>
                            <HeartFilled className="text-xl text-pink-500" />
                            <span className="ml-2 text-xl font-serif">Easyshadi</span>
                        </div>
                        <div>
                            <p className='font-sans'>{dayjs().format('DD-MM-YYYY')}</p>
                        </div>
                    </div>
                    <div>
                        <p className='font-serif text-[30px]'>Invoice</p>
                    </div>
                    <hr className='my-3'/>
                    <div className='flex items-center justify-between mt-3'>
                        <div>
                            <p className='font-bold'>Bill to</p>
                            <p>{user?.name}</p>
                            <p>{user?.email}</p>
                            <p>{user?.phoneNumber}</p>
                        </div>
                        <div>
                            <p className='font-bold'>Vendor</p>
                            <p>{selectedItem?.VendorDetails?.name}</p>
                            <p>{selectedItem?.VendorDetails?.email}</p>
                            <p>{selectedItem?.VendorDetails?.phoneNumber}</p>
                        </div>
                    </div>
                    <div>
                        <table className='w-full mt-3'>
                            <thead>
                                <tr>
                                    <th className='text-left border p-1'>Service(s) Taken</th>
                                    <th className='text-right border p-1'>Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    selectedItem?.services?.map(item => {
                                        return (
                                            <tr key={item._id}>
                                                <td className='text-left border p-1'>{item.serviceName}</td>
                                                <td className='text-left border p-1 text-right'>PKR {item.price}</td>
                                            </tr>
                                        )
                                    })
                                }
                                <tr>
                                    <td className='text-left border p-1 font-bold'>Total</td>
                                    <td className='text-left border p-1 text-right'>
                                        PKR {selectedItem?.services?.reduce((sum, s) => sum + s.price, 0)}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <div className='text-center mt-3'>
                            <p>© 2025 EasyShadi. All rights reserved.</p>
                        </div>
                    </div>
                </div>
                <div className='flex items-center justify-end'>
                    <Button
                        type="secondary"
                        className="mt-5 border-none font-medium"
                        onClick={() => {
                            setIsModalOpen(false);
                        }}
                    >
                        Close
                    </Button>
                    <Button
                        type="primary"
                        htmlType="submit"
                        disabled={loading}
                        loading={loading}
                        className="mt-5 border-none font-medium"
                        onClick={() => handleDownloadPDF()}
                    >
                        <DownloadOutlined style={{ fontSize: "20px" }} />
                        Download PDF
                    </Button>
                </div>
            </Modal>
        </>
    );
};

export default InvoiceModal;