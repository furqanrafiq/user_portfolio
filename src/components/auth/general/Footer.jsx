import { Row, Col, Typography, Divider } from 'antd';
import {
    HeartFilled,
    InstagramOutlined,
    FacebookOutlined,
    TwitterOutlined,
    PinterestOutlined
} from '@ant-design/icons';

const { Paragraph, Text } = Typography;

const Footer = () => {
    return (
        <div className="mx-auto px-4 sm:px-6 lg:px-8 bg-gray-900 text-white pt-16 pb-8">
            <div className='container mx-auto'>
                <Row gutter={[48, 32]}>
                    <Col xs={24} sm={12} md={6}>
                        <div className="flex items-center mb-6">
                            <HeartFilled className="text-2xl text-pink-500" />
                            <span className="ml-2 text-2xl font-serif text-white">Loverly</span>
                        </div>
                        <Paragraph className="text-gray-400">
                            Your go-to source for wedding planning inspiration, tools, and vendor connections.
                        </Paragraph>
                        <div className="flex space-x-4 mt-6">
                            <InstagramOutlined className="text-xl text-gray-400 hover:text-pink-500 cursor-pointer" />
                            <FacebookOutlined className="text-xl text-gray-400 hover:text-pink-500 cursor-pointer" />
                            <TwitterOutlined className="text-xl text-gray-400 hover:text-pink-500 cursor-pointer" />
                            <PinterestOutlined className="text-xl text-gray-400 hover:text-pink-500 cursor-pointer" />
                        </div>
                    </Col>

                    <Col xs={24} sm={12} md={6}>
                        <p className="text-[16px] text-white mb-6">Planning Tools</p>
                        <div className="flex flex-col space-y-3">
                            <Text className="text-gray-400 hover:text-pink-500 cursor-pointer">Checklist</Text>
                            <Text className="text-gray-400 hover:text-pink-500 cursor-pointer">Budget Calculator</Text>
                            <Text className="text-gray-400 hover:text-pink-500 cursor-pointer">Guest List Manager</Text>
                            <Text className="text-gray-400 hover:text-pink-500 cursor-pointer">Timeline Creator</Text>
                        </div>
                    </Col>

                    <Col xs={24} sm={12} md={6}>
                        <p className="text-[16px] text-white mb-6">Wedding Ideas</p>
                        <div className="flex flex-col space-y-3">
                            <Text className="text-gray-400 hover:text-pink-500 cursor-pointer">Real Weddings</Text>
                            <Text className="text-gray-400 hover:text-pink-500 cursor-pointer">Wedding Colors</Text>
                            <Text className="text-gray-400 hover:text-pink-500 cursor-pointer">Themes & Styles</Text>
                            <Text className="text-gray-400 hover:text-pink-500 cursor-pointer">Seasonal Ideas</Text>
                        </div>
                    </Col>

                    <Col xs={24} sm={12} md={6}>
                        <p className="text-[16px] text-white mb-6">Company</p>
                        <div className="flex flex-col space-y-3">
                            <Text className="text-gray-400 hover:text-pink-500 cursor-pointer">About Us</Text>
                            <Text className="text-gray-400 hover:text-pink-500 cursor-pointer">Contact</Text>
                            <Text className="text-gray-400 hover:text-pink-500 cursor-pointer">Privacy Policy</Text>
                            <Text className="text-gray-400 hover:text-pink-500 cursor-pointer">Terms of Service</Text>
                        </div>
                    </Col>
                </Row>

                <Divider className="border-gray-800 mt-12 mb-8" />

                <div className="text-center">
                    <Text className="text-gray-400">
                        © {new Date().getFullYear()} Loverly. All rights reserved.
                    </Text>
                </div>
            </div>
        </div>
    )
}

export default Footer