import { Layout, Menu, Dropdown, Button } from 'antd';
import { HeartFilled, MenuOutlined, DownOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Header, } = Layout;

export default function Navbar() {
    const navigate = useNavigate()
    // const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    const menuItems = [
        {
            title: "Guest List",
            description: "Everything you need to organize, manage, and build your guest list.",
            linkText: "Manage Guests",
            link: "/guest-list",
            icon: "👥",
        },
        {
            title: "Vendor Manager",
            description: "Search, add, and manage all your vendors’ information.",
            linkText: "Find Your Vendors",
            link: "/vendor-manager",
            icon: "📋",
        },
        {
            title: "Checklist",
            description: "Easily manage your wedding planning timeline stress-free.",
            linkText: "See My To Dos",
            link: "/check-list",
            icon: "✔️",
        }
    ];

    const vendorMenuItems = [
        {
            title: "Find Wedding Professionals",
            link: "#",
            icon: "👥",
            subMenu: [
                {
                    name: "Wedding Venue",
                    link: "/wedding-venue",
                },
                {
                    name: "Photography",
                    link: "/wedding-venue",
                },
                {
                    name: "Florist",
                    link: "/wedding-venue",
                },
                {
                    name: "Wedding Planner",
                    link: "/wedding-venue",
                },
                {
                    name: "Videography",
                    link: "/wedding-venue",
                },
                {
                    name: "Caterer",
                    link: "/wedding-venue",
                },
                {
                    name: "Entertainment",
                    link: "/wedding-venue",
                }
            ]
        },
        {
            title: "Popular Wedding Destinations",
            link: "#",
            icon: "📋",
            subMenu: [
                {
                    name: "Athens, Greece",
                    link: "/wedding-venue",
                },
                {
                    name: "Cabo San Lucas, Mexico",
                    link: "/wedding-venue",
                },
                {
                    name: "Los Angeles, California",
                    link: "/wedding-venue",
                },
                {
                    name: "New York, New York",
                    link: "/wedding-venue",
                },
                {
                    name: "Chicago, Illinois",
                    link: "/wedding-venue",
                },
                {
                    name: "Melbourne, Australia",
                    link: "/wedding-venue",
                }
            ]
        }
    ];

    const userMenuItems = [
        {
            title: "Login",
            link: "/login",
        },
        {
            title: "Signup",
            link: "/signup",
        },
    ];

    const menu = (
        <Menu className="bg-white shadow-lg rounded-lg w-[1000px] grid grid-cols-2">
            {menuItems.map((item) => (
                <div key={item} className='p-5 hover:cursor-pointer hover:bg-gray-100' onClick={() => navigate(item.link)}>
                    <p className='font-serif text-[24px]'>{item.icon} {item.title}</p>
                    <p className='font-sans'>{item.description}</p>
                    <p className='font-sans text-blue-600 font-semibold'>{item.linkText}</p>
                </div>
            ))}
        </Menu>
    );

    const vendorMenu = (
        <Menu className="bg-white shadow-lg rounded-lg w-[800px] grid grid-cols-2 gap-6">
            {vendorMenuItems.map((item) => (
                <div key={item} className='p-5'>
                    <p className='font-serif text-[24px]'>{item.title}</p>
                    {
                        item.subMenu.map(innerItem => {
                            return (
                                <div key={innerItem} className="p-5 hover:bg-gray-100 p-2 rounded-lg font-sans hover:cursor-pointer" onClick={() => navigate(innerItem.link)}>
                                    <span className="">
                                        {innerItem.name}
                                    </span>
                                </div>
                            )
                        })
                    }
                </div>
            ))}
        </Menu>
    );

    const userMenu = (
        <Menu className="bg-white shadow-lg rounded-lg grid grid-cols-1">
            {userMenuItems.map((item) => (
                <div key={item.link} className='p-3 hover:bg-gray-100 font-sans hover:cursor-pointer' onClick={() => navigate(item.link)}>
                    <p>{item.title}</p>
                </div>
            ))}
        </Menu>
    );

    return (
        <Header className="bg-secondary px-0">
            <div className="mx-auto container px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center">
                    <div className="flex items-center hover:cursor-pointer" onClick={() => navigate('/')}>
                        <MenuOutlined className="lg:hidden mr-4 text-lg" />
                        <div className="flex items-center">
                            <HeartFilled className="text-2xl text-pink-500" />
                            <span className="ml-2 text-2xl font-serif">Loverly</span>
                        </div>
                    </div>

                    <div className='flex gap-10'>
                        <Dropdown overlay={menu} trigger={["hover"]} placement="bottomCenter">
                            <button className="font-semibold uppercase flex items-center">
                                Planning Tools <DownOutlined className="ml-2" />
                            </button>
                        </Dropdown>

                        <Dropdown overlay={vendorMenu} trigger={["hover"]} placement="bottomCenter">
                            <button className="font-semibold uppercase flex items-center">
                                Venues & Vendors <DownOutlined className="ml-2" />
                            </button>
                        </Dropdown>
                    </div>

                    <div className="flex items-center space-x-4">
                        {/* <UserOutlined className="text-lg" /> */}
                        <Dropdown overlay={userMenu} trigger={["hover"]} placement="bottomCenter">
                            <Button
                                type="primary"
                                className="border-none text-base font-medium p-5"
                                size="small"
                            >
                                Get Started
                            </Button>
                        </Dropdown>
                    </div>
                </div>
            </div>
        </Header>
    )
}
