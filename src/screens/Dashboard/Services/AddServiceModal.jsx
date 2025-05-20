import React, { useEffect, useState } from 'react';
import { Button, Form, Input, Modal, Select } from 'antd';
import AllServices from '../../../components/dropdowns/allServices';
import axios from 'axios';
import { apiURL, imageURL, mapApiKey } from '../../../../helper';
import { useNotify } from '../../../utils/NotificationProvider';
import { useSelector } from 'react-redux';
import { useForm } from 'antd/es/form/Form';
import ReactGoogleAutocomplete from 'react-google-autocomplete';
import UploadServicePictures from './UploadServicePictures';
import { DeleteOutlined } from '@ant-design/icons';

function AddServiceModal({ isModalOpen, setIsModalOpen, getUserServices, editService, setEditService }) {
    const [service, setService] = useState(Object)
    const [loading, setLoading] = useState(false)
    const notify = useNotify()
    const user = useSelector((state) => state?.user?.user)
    const services = useSelector(state => state?.service?.services)
    const [form] = Form.useForm()
    const [imagesBase64, setImagesBase64] = useState([]);
    const [selectedServicepreviews, setSelectedServicePreviews] = useState([]);
    const [previews, setPreviews] = useState([]);

    useEffect(() => {
        if (editService) {
            form.setFieldsValue({
                description: editService?.description,
                name: editService?.name,
                price: editService?.price,
                service: editService?.serviceName
            });
            let serviceImages = editService?.serviceImages?.map(item => imageURL + item.imagePath)
            setSelectedServicePreviews(serviceImages)
        }
    }, [editService, form]);

    function handleService(data) {
        setService(data)
    }

    const handleImageChange = async (e) => {
        const files = Array.from(e.target.files);
        const base64Array = [];
        const previewArray = [];

        for (let file of files) {
            const base64 = await toBase64(file);
            base64Array.push(base64);
            previewArray.push(URL.createObjectURL(file));
        }

        // setImagesBase64(base64Array);
        // setPreviews(previewArray);

        setImagesBase64(prev => [...prev, ...base64Array]);
        setPreviews(prev => [...prev, ...previewArray]);
    };

    const toBase64 = (file) =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = reject;
        });


    const onFinish = (values) => {
        const body = { ...values }
        body.service = service
        body.userId = user?.uuid;
        body.images = imagesBase64
        body.userServiceId = editService?.uuid
        setLoading(true)

        let url = ""
        if (editService?.uuid) {
            body.uuid = editService?.uuid
            url = 'update-user-service'
        } else {
            url = 'insert-user-service'
        }
        return axios.post(`${apiURL}/services/${url}`, body)
            .then((res) => {
                notify.success({
                    message: 'Success!',
                    description: res.data.msg,
                    placement: 'topRight',
                });
                setIsModalOpen(false)
                getUserServices(user?.id)
                form.resetFields()
                setEditService({})
                setPreviews([])
                setImagesBase64([])
                getUserServices()
            })
            .catch((error) => {
                notify.error({
                    message: 'Error',
                    description: error.response?.data?.msg || 'Something went wrong',
                    placement: 'topRight',
                });
            })
            .finally(() => {
                setLoading(false);
            });
    }

    function deleteImage(image, imageIndex) {
        if (image.includes(imageURL)) {
            const pathOnly = image.split('/ServiceImages/')[1];
            const matchPath = `/ServiceImages/${pathOnly}`;
            // const foundImage = selectedServicepreviews.find(img => img === image);
            const body = {
                imagePath: matchPath
            }
            return axios.post(`${apiURL}/services/delete-user-service-image`, body)
                .then((res) => {
                    notify.success({
                        message: 'Success!',
                        description: res.data.msg,
                        placement: 'topRight',
                    });
                    let updatedArray = selectedServicepreviews.filter(item => item !== image)
                    setSelectedServicePreviews(updatedArray)
                })
                .catch((error) => {
                    notify.error({
                        message: 'Error',
                        description: error.response?.data?.msg || 'Something went wrong',
                        placement: 'topRight',
                    });
                })
        } else {
            let updatedArray = previews.filter(item => item !== image)
            let updatedBase64array = imagesBase64.filter((_, index) => index !== imageIndex)
            setImagesBase64(updatedBase64array)
            setPreviews(updatedArray);
        }
    }

    return (
        <>
            <Modal title={editService?.uuid ? 'Edit Service' : 'Add Service'} open={isModalOpen} footer={[]} closable={false}>
                <Form
                    name="signin"
                    form={form}
                    onFinish={onFinish}
                    layout="vertical"
                    className="mb-6"
                >
                    <div className="mb-5">
                        {/* <p className='mb-2'>Service</p>
                        <AllServices
                            isDisabled={false}
                            handleService={handleService}
                        /> */}
                        <Form.Item
                            name="service"
                            rules={[
                                { required: true, message: 'Please select service' }
                            ]}
                            label="Service"
                        >
                            <Select placeholder="Select Service" className='w-full'
                                options={services?.map((item) => ({
                                    value: item.uuid,
                                    label: item.name,
                                    data: item
                                }))}
                                onChange={(value, option) => {
                                    handleService(option.data);
                                }}
                            />
                        </Form.Item>
                    </div>

                    <Form.Item
                        name="name"
                        rules={[
                            { required: true, message: 'Please enter service name' }
                        ]}
                        label="Name"
                    >
                        <Input
                            placeholder="Name"
                            size="medium"
                            className="rounded-md"
                        />
                    </Form.Item>

                    <Form.Item
                        name="description"
                        label="Description"
                        rules={[
                            { required: true, message: 'Please enter description' }
                        ]}
                    >
                        <Input.TextArea
                            placeholder="Description"
                            size="medium"
                            className="rounded-md"
                        />
                    </Form.Item>

                    {/* <Form.Item
                        name="location"
                        label="Location"
                        rules={[
                            { required: true, message: 'Please enter location' }
                        ]}
                    >
                        <ReactGoogleAutocomplete
                            apiKey={mapApiKey}
                            onPlaceSelected={(place) => console.log(place)}
                        />
                    </Form.Item> */}


                    <Form.Item
                        name="price"
                        rules={[
                            { required: true, message: 'Please enter price' }
                        ]}
                        label="Price"
                    >
                        <Input
                            type='number'
                            placeholder="Price"
                            size="medium"
                            className="rounded-md"
                        />
                    </Form.Item>


                    <Form.Item
                        name="serviceImages"
                        // rules={[
                        //     { required: true, message: 'Please upload price' }
                        // ]}
                        label="Images"
                    >
                        <input type='file' multiple onChange={handleImageChange} />
                    </Form.Item>

                    <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                        {selectedServicepreviews?.map((src, i) => (
                            <div key={i} className='text-center'>
                                <a href={`${src}`} target='_blank'>
                                    <img key={i} src={src} alt={`preview-${i}`} width="100" />
                                </a>
                                <p className='font-sans mt-3 cursor-pointer' onClick={() => deleteImage(src, i)}>
                                    <DeleteOutlined className='mr-2' />
                                    Delete
                                </p>
                            </div>
                        ))}
                        {previews?.map((src, i) => (
                            <div key={i} className='text-center'>
                                <a href={`${src}`} target='_blank'>
                                    <img key={i} src={src} alt={`preview-${i}`} width="100" />
                                </a>
                                <p className='font-sans mt-3 cursor-pointer' onClick={() => deleteImage(src, i)}>
                                    <DeleteOutlined className='mr-2' />
                                    Delete
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* <UploadServicePictures fileList={fileList} setFileList={setFileList} /> */}

                    <div className='flex items-center justify-end'>
                        <Form.Item>
                            <Button
                                type="secondary"
                                loading={loading}
                                disabled={loading}
                                className="mt-5 border-none h-6 font-medium"
                                onClick={() => {
                                    setIsModalOpen(false);
                                    form.resetFields()
                                    setEditService({})
                                    setPreviews([])
                                    setImagesBase64([])
                                    getUserServices()
                                }}
                            >
                                Close
                            </Button>
                        </Form.Item>
                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                loading={loading}
                                disabled={loading}
                                className="mt-5 border-none h-12 font-medium"
                            >
                                Save
                            </Button>
                        </Form.Item>
                    </div>
                </Form>
            </Modal>
        </>
    );
};

export default AddServiceModal;