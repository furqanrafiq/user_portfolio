import { Button, Col, Row } from "antd"
import personlizedCheckList from '../../assets/personalized-checklist.png'

const CheckList = () => {
    return (
        <div>
            <div className="bg-secondary">
                <div className="py-5 text-center max-w-7xl mx-auto">
                    <p className="font-serif text-heading">Free Wedding Checklist</p>
                    <p className="font-sans">Getting married can feel overwhelming, but our free wedding checklist tool makes it simple and stress-free. Designed to guide you every step of the way, this comprehensive wedding checklist ensures no detail is overlooked. Whether you`re just starting or counting down the days, our tool is your go-to resource. Plus, we offer a free downloadable checklist, perfect for staying organized on the go. Say goodbye to planning chaos and hello to your dream wedding!
                    </p>
                </div>
            </div>
            <div className="max-w-7xl mx-auto">
                <div className="py-10">
                    <Row className="flex items-center" gutter={24}>
                        <Col span={12}>
                            <p className="font-serif text-heading mb-3">Personalized Wedding Checklist</p>
                            <p className="font-sans text-[16px] mb-10">Stay organized with our wedding checklists free of charge! From big milestones to tiny details, every to do is covered.
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
                            <img src={personlizedCheckList} />
                        </Col>
                    </Row>
                </div>
                <div className="py-10">
                    <Row className="flex items-center my-5" gutter={24}>
                        <Col span={12}>
                            <p className="font-serif text-[18px] mb-3">Your Tailored Wedding Timeline</p>
                            <p className="font-sans mb-10">Get a personalized wedding checklist designed around your unique timeline! By answering a few simple questions, including your wedding date, we’ll create a step-by-step plan just for you. Stay on track and tackle each task at the perfect time, ensuring a seamless and stress-free wedding day planning experience.
                            </p>
                            <Button
                                type="primary"
                                className="font-sans border-none h-12 w-[200px]"
                                size="small"
                            >
                                SEE MY COUNTDOWN
                            </Button>
                        </Col>
                        <Col span={12}>
                            <img src={personlizedCheckList} />
                        </Col>
                    </Row>
                    <Row className="flex items-center my-5" gutter={24}>
                        <Col span={12}>
                            <img src={personlizedCheckList} />
                        </Col>
                        <Col span={12}>
                            <p className="font-serif text-[18px] mb-3">Customized Just For You</p>
                            <p className="font-sans text-[16px] mb-10">Whether you’re dreaming of an intimate gathering or a grand celebration, our dynamic checklists adapt to your vision. Packed with all the important tasks and wedding details, we ensure nothing is overlooked.
                            </p>
                            <Button
                                type="primary"
                                className="font-sans border-none h-12 w-[200px]"
                                size="small"
                            >
                                CUSTOMIZE MY CHECK LIST
                            </Button>
                        </Col>
                    </Row>
                    <Row className="flex items-center my-5" gutter={24}>
                        <Col span={12}>
                            <p className="font-serif text-[18px] mb-3">Manage Your To Dos</p>
                            <p className="font-sans text-[16px] mb-10">Effortlessly stay on top of your wedding plans with our intuitive tool. Add custom notes, track progress, and share updates with your planning team. Plus, we’ll send helpful email reminders for upcoming deadlines, so you’re always a step ahead. Never miss a moment as you plan the day of your dreams!
                            </p>
                            <Button
                                type="primary"
                                className="font-sans border-none h-12 w-[200px]"
                                size="small"
                            >
                                SEE MY TO-DO`S
                            </Button>
                        </Col>
                        <Col span={12}>
                            <img src={personlizedCheckList} />
                        </Col>
                    </Row>
                </div>
                <div className="py-10">
                    <p className="font-serif text-heading text-center">Do It Yourself Simple Wedding Checklist</p>
                    <p className="font-sans text-center">Take control of your planning with our easy-to-use checklist! Whether you`re organizing your big day solo or with a partner, our simple wedding to do list is the perfect tool to keep everything on track. Check tasks off your wedding planning list in real time and watch your progress unfold. It’s intuitive, efficient, and designed for busy couples. Stay organized, stress-free, and confident as you plan the wedding of your dreams!
                    </p>
                </div>
            </div>
        </div>
    )
}

export default CheckList