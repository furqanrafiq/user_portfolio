import { Button, Col, Row } from "antd"
import freeWeddingList from '../../assets/free-wedding-list.png'

const GuestList = () => {
    return (
        <div>
            <div className="bg-secondary">
                <div className="py-5 text-center max-w-7xl mx-auto">
                    <p className="font-serif text-heading">Free Wedding Guest List Maker: Online Wedding Guest Planner & Tracker</p>
                    <p className="font-sans">Planning your wedding just got easier! With Loverly’s free wedding guest list maker and online wedding guest tracker, you will have everything you need to stay organized and stress free. Whether you’re figuring out how to get guests addresses for wedding invitations or managing RSVPs, our guest list manager tool simplifies every step of the process.
                    </p>
                </div>
            </div>
            <div className="max-w-7xl mx-auto">
                <div className="py-10">
                    <Row className="flex items-center" gutter={24}>
                        <Col span={12}>
                            <p className="font-serif text-heading mb-3">Free Wedding Guest List Maker</p>
                            <p className="font-sans text-[16px] mb-10">The best wedding guest list organizer to collect, manage and organize your wedding guest information.
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
                            <img src={freeWeddingList} />
                        </Col>
                    </Row>
                </div>
                <div className="py-10">
                    <p className="font-serif text-heading">The Best Wedding Guest List Manager</p>
                    <p className="font-sans">A seamless wedding planning experience starts with the right tools. That’s why our wedding guest list tracker is designed to help you organize your guest information, track responses, and stay on top of important details for all of your wedding events.
                    </p>
                    <Row className="flex items-center my-5" gutter={24}>
                        <Col span={12}>
                            <p className="font-serif text-[18px] mb-3">Build Your Guest List</p>
                            <p className="font-sans mb-10">Forget spreadsheets and manual entry! With our free wedding guest list maker, you can automatically capture guest details by sending out a customizable link to collect mailing addresses, email addresses, phone numbers, and even information about plus ones. You can also choose exactly what details to collect, tailoring it to your wedding needs. Already have some of your guests’ information? You can start by easily uploading your existing list to save time and effort. Building your guest list has never been more intuitive. Our platform ensures every detail is accounted for, so you’re set up for success when sending out your invitations.
                            </p>
                            <Button
                                type="primary"
                                className="font-sans border-none h-12 w-[200px]"
                                size="small"
                            >
                                MANAGE MY GUEST LIST
                            </Button>
                        </Col>
                        <Col span={12}>
                            <img src={freeWeddingList} />
                        </Col>
                    </Row>
                    <Row className="flex items-center my-5" gutter={24}>
                        <Col span={12}>
                            <img src={freeWeddingList} />
                        </Col>
                        <Col span={12}>
                            <p className="font-serif text-[18px] mb-3">Manage Event RSVPs</p>
                            <p className="font-sans text-[16px] mb-10">Tracking RSVPs can be a logistical headache, but not anymore. With our online wedding guest tracker, you can track your guest count across multiple events, whether it’s your rehearsal dinner, wedding ceremony, or reception, all in one place. Customize your RSVP page to create a tailored experience that fits your wedding’s unique vibe. If guests haven’t responded, you can easily send out email reminders to nudge them. Additionally, our tracker lets you capture important preferences like meal choices, dietary restrictions, and accommodations to ensure your guests have the best experience possible. Our wedding guest list tracker helps you stay in control, so no detail gets overlooked.
                            </p>
                            <Button
                                type="primary"
                                className="font-sans border-none h-12 w-[200px]"
                                size="small"
                            >
                                MANAGE MY GUEST LIST
                            </Button>
                        </Col>
                    </Row>
                    <Row className="flex items-center my-5" gutter={24}>
                        <Col span={12}>
                            <p className="font-serif text-[18px] mb-3">Download & Export Contacts</p>
                            <p className="font-sans text-[16px] mb-10">Once your list is complete, it’s time to take the next steps in your planning journey. With our tool, you can easily download your guest list, which is perfect for ordering wedding invitations or sharing with your family members. You can also export RSVP details to share essential information with your wedding planner, caterer, or other vendors, keeping everyone on the same page. This seamless process makes sure you’re always one step ahead in your wedding planning.
                            </p>
                            <Button
                                type="primary"
                                className="font-sans border-none h-12 w-[200px]"
                                size="small"
                            >
                                MANAGE MY GUEST LIST
                            </Button>
                        </Col>
                        <Col span={12}>
                            <img src={freeWeddingList} />
                        </Col>
                    </Row>
                </div>
                <div className="py-10">
                    <p className="font-serif text-heading text-center">Create Your Wedding Guest List Online FREE with Loverly</p>
                    <p className="font-sans">Wondering how to make a wedding guest list? Our online wedding guest list creator is the ultimate tool to get organized quickly. Follow these simple wedding tips to get started:</p>
                    <div className="mt-5">
                        <p className="font-bold">1. Sign up for Loverly</p>
                        <p className="font-sans">Create a free account on Loverly and gain access to all our wedding planning tools, including the free guest list manager. You can also invite your partner to help build the guest list.
                        </p>
                    </div>
                    <div className="mt-5">
                        <p className="font-bold">2. Start building your list
                        </p>
                        <p className="font-sans">Quickly import your existing contacts or send out a customizable address form link to collect your guests` info. This is an easy way to figure out how to get people`s addresses. They can add their phone numbers, email addresses, plus ones, mailing addresses, and more.
                        </p>
                    </div>
                    <div className="mt-5">
                        <p className="font-bold">3. Manage your RSVPs
                        </p>
                        <p className="font-sans">Use our wedding guest list tracker to monitor responses, send reminders, and keep track of important guest preferences.
                        </p>
                    </div>
                    <div className="mt-5">
                        <p className="font-bold">4. Finalize and share your list
                        </p>
                        <p className="font-sans">Once your list is complete, download or export the details to use with your invites, vendors, and planning team. This step allows you to be ready for every milestone in your wedding planning journey.
                        </p>
                    </div>
                    <p className="font-sans mt-5">That’s it! You’re ready to take the stress out of guest management and focus on what matters most: celebrating your wedding day.
                    </p>
                    <p className="mt-5 font-sans text-center">With Loverly, you will learn how to plan your wedding, giving you the confidence to create the celebration of your dreams. Additionally, our integrated tools ensure you don’t miss a single step in the planning process for your big day. From managing your budget to exploring creative ideas for your ceremony and reception, Loverly offers everything you need in one convenient platform. Our goal is to simplify your planning journey and help you stay focused on making your wedding day unforgettable.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default GuestList