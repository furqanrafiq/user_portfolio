import { Button, Col, Row } from "antd"
import freeVendorManager from '../../assets/free-vendor-manager.png'

const VendorManager = () => {
    return (
        <div>
            <div className="bg-secondary">
                <div className="py-5 text-center max-w-7xl mx-auto">
                    <p className="font-serif text-heading">Wedding Vendor Manager & Wedding Vendor Payment Tracker</p>
                    <p className="font-sans">Planning a wedding is exciting but managing all the details can be overwhelming, but our free wedding vendor manager helps you stay organized throughout the process. From tracking payments with our wedding vendor payment tracker to keeping contracts in one place, we simplify wedding planning. Whether you're searching for the right wedding pros or trying to keep track of payments, our tool ensures every detail is covered.
                    </p>
                </div>
            </div>
            <div className="max-w-7xl mx-auto">
                <div className="py-10">
                    <Row className="flex items-center" gutter={24}>
                        <Col span={12}>
                            <p className="font-serif text-heading mb-3">Free Wedding Vendor Manager</p>
                            <p className="font-sans text-[16px] mb-10">The best wedding vendor management tool helps you keep everything in one place. Stay on top of contracts, invoices, deadlines, and payments so you can focus on celebrating your big day without last-minute surprises.
                            </p>
                            <Button
                                type="primary"
                                className="border-none h-12 text-base font-medium w-[200px]"
                                size="small"
                            >
                                Get Started
                            </Button>
                        </Col>
                        <Col span={12}>
                            <img src={freeVendorManager} />
                        </Col>
                    </Row>
                </div>
                <div className="py-10">
                    <p className="font-serif text-heading text-center">Wedding Vendor Management Simplified
                    </p>
                    <p className="font-sans text-center">Keeping track of wedding planner duties, details of all your wedding vendors and key deadlines has never been easier. Our digital wedding planner makes it simple to upload and store contracts, set reminders for due dates, and keep your wedding vendors checklist organized. Whether you're wondering, "How much does a wedding planner cost?" or deciding between a wedding planner vs coordinator, our tool streamlines communication and planning.
                    </p>
                    <Row className="flex items-center my-5" gutter={24}>
                        <Col span={12}>
                            <p className="font-serif text-[18px] mb-3">Research and Add Vendors</p>
                            <p className="font-sans mb-10">Browse through recommendations from our wide range of vendors including photographers, florists, stylists, venues and more or search for vendors by category and/or location. Already have some vendors in mind? Custom add them directly into your vendor manager tool to automate your outreach and manage vendor details.
                            </p>
                            <Button
                                type="primary"
                                className="font-sans border-none h-12 w-[200px]"
                                size="small"
                            >
                                BUILD YOUR DREAM TEAM
                            </Button>
                        </Col>
                        <Col span={12}>
                            <img src={freeVendorManager} />
                        </Col>
                    </Row>
                    <Row className="flex items-center my-5" gutter={24}>
                        <Col span={12}>
                            <img src={freeVendorManager} />
                        </Col>
                        <Col span={12}>
                            <p className="font-serif text-[18px] mb-3">Manage Outreach and Vendor Information</p>
                            <p className="font-sans text-[16px] mb-10">Ready to start hiring? Easily organize vendor contact information, upload proposals, compare pricing, and review availability all in one place while adding notes about each of your vendor interactions.
                            </p>
                            <Button
                                type="primary"
                                className="font-sans border-none h-12 w-[200px]"
                                size="small"
                            >
                                BUILD YOUR DREAM TEAM
                            </Button>
                        </Col>
                    </Row>
                    <Row className="flex items-center my-5" gutter={24}>
                        <Col span={12}>
                            <p className="font-serif text-[18px] mb-3">Streamline Tasks and Track Vendor Payments</p>
                            <p className="font-sans text-[16px] mb-10">Manage your planning and budgeting by easily creating your vendors’ to-dos and syncing them with your wedding checklist, updating deposit status, and tracking vendor costs and payments to ensure a flawless execution within your set budgets.
                            </p>
                            <Button
                                type="primary"
                                className="font-sans border-none h-12 w-[200px]"
                                size="small"
                            >
                                BUILD YOUR DREAM TEAM
                            </Button>
                        </Col>
                        <Col span={12}>
                            <img src={freeVendorManager} />
                        </Col>
                    </Row>
                </div>
                <div className="py-10">
                    <p className="font-serif text-heading text-center">Wedding Vendor Payment Tracker</p>
                    <p className="font-sans">Managing your payments is a crucial part of wedding planning. Our wedding vendor payment tracker allows you to log each payment, track due dates, and note the payment method - all automatically integrated into your budget tracker. Easily see what’s been paid and what’s outstanding so you never miss a deadline. Plus, when it’s time to figure out how much to tip wedding vendors, you’ll have a clear record of every expense.
                    </p>
                    <p className="font-serif text-heading text-center mt-10">Build Your Free Wedding Vendor Manager</p>
                    <p className="font-sans">Get started with our easy-to-use wedding vendor management system and stay in control of every aspect of your wedding planning journey.</p>
                    <div className="mt-5">
                        <p className="font-bold">1. Sign up for a free Loverly account</p>
                        <p className="font-sans">Create an account to access our wedding vendor manager and start organizing your planning process.</p>
                    </div>
                    <div className="mt-5">
                        <p className="font-bold">2. Browse our vendor database and save potential hires
                        </p>
                        <p className="font-sans">Search through our extensive vendor database, compare options, and save your favorites to review later. You can also search for the benefits of a wedding planner.
                        </p>
                    </div>
                    <div className="mt-5">
                        <p className="font-bold">3. Inquire about vendor services
                        </p>
                        <p className="font-sans">Reach out to wedding pros directly through our platform to request quotes, check availability and ask wedding planner questions.
                        </p>
                    </div>
                    <div className="mt-5">
                        <p className="font-bold">4. Upload quotes and contracts
                        </p>
                        <p className="font-sans">Keep all your important documents in one place by uploading contracts, proposals, and invoices for easy reference.
                        </p>
                    </div>

                    <div className="mt-5">
                        <p className="font-bold">5. Use the payment tracker to monitor payments

                        </p>
                        <p className="font-sans">Log each payment, track due dates, and sync transactions with your budget to stay on top of expenses.
                        </p>
                    </div>

                    <div className="mt-5">
                        <p className="font-bold">6. Add to-dos to keep track of important tasks
                        </p>
                        <p className="font-sans">Stay organized by adding task reminders to ensure nothing falls through the cracks before your big day.
                        </p>
                    </div>

                    <div className="mt-5">
                        <p className="font-bold">7. Invite your vendors to collaborate
                        </p>
                        <p className="font-sans">Easily share details and communicate with your vendors, including wedding coordinators, to ensure seamless coordination.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default VendorManager