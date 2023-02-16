import React from 'react';
import { useParams } from 'react-router-dom';
import { useAddMessageMutation, useGetUserByIdQuery } from '../features/auth/authApi';
import Loading from '../components/reusable/Loading';
import { BsArrowReturnRight, BsArrowRightShort } from 'react-icons/bs';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
const ApplicantDetails = () => {
    const { id } = useParams();
    const { user } = useSelector(state => state.auth);
    const { data, isLoading, isError, error } = useGetUserByIdQuery(id);
    const { handleSubmit, register, reset } = useForm();
    const [addChat] = useAddMessageMutation();
    const {
        address,
        city,
        country,
        email,
        firstName,
        gender,
        lastName,
        postcode,
    } = data?.data || {};
    const qualifications = [
        "Bachelor's degree in Web development or related field, or relevant experience.",
        "Solid knowledge and experience in programming applications.",
        "Proficient in JavaScript, HTML, CSS.",
        "Proficient in My SQL.",
        "Dedicated team player.",
        "Ability to thrive in a fast-paced environment.",
        "Solid ability in both written and verbal communication.",
        "Knowledge of programming language and technical terminology",
        "Able to develop ideas and processes and clearly express them.",
        "High degree of independent judgment",
        "Able to solve complex problems",
    ]
    const skills = [
        "HTML",
        "CSS",
        "React",
        "Redux",
        "Tailwind CSS",
        "Node",
        "Express Js",
        "MongoDb"
    ];
    const chat = [{
        ask: "",
        reply: [],
        email: email
    }]
    const handleMessage = (data) => {
        const messageData = {
            userID: id,
            emailFrom: user.email,
            message: data.message
        }
        console.log(messageData);
        addChat(messageData);
        reset();
    }
    let content;
    if (isLoading) {
        content = <Loading></Loading>;
    }
    if (!isLoading && data?.status) {
        content =
            <div className='pt-14 '>
                <div className=' my-14'>
                    <h1 className='text-3xl font-semibold text-primary'>{firstName}{lastName}</h1>
                    <h1 className='text-xl font-semibold'>Web Developer</h1>
                    <div className='p-5 pt-0'>
                        <small>from</small> <p className='text-xl '>{country}</p>
                        <p>Address : {address}, {city}, {country}</p>
                        <p>Postcode : {postcode}</p>
                        <p>Gender : {gender}</p>
                        <p>Email : {email}</p>
                        <p>Phone : +88 123456987</p>
                    </div>
                    <div className=''>
                        <h1 className='text-primary text-lg font-medium mb-3'>
                            About
                        </h1>
                        <p>
                            I'm a Web Developer. I have learned Mernstack recently. I have done a lot of projects using React, React router dom, Authorization & Authentication, CURD operation, express js, node, and MongoDB. I am comfortable with those technologies. I believe nothing can be achieved without hard work. I always work hard and try my best. I like to learn new technologies and become more skilled. I aim to work in a well-established company to use my skills properly, do something unique and gain more experience.
                        </p>
                        <p className='mb-3'>
                            Recently I am trying to improve my skills in CRUD operation, Node Js, and MongoDB. For that reason, I have done a project named TV Shop a few days ago. In that project, I implemented a good number of functionality, including CRUD operation, Dashboard, Admin Panel, Login & Signup Form, Product Uploading, Buying Products, Payment setup, and lots. If you want to learn more about that project, I will explain it broadly.
                        </p>
                    </div>
                    <div>
                        <h1 className='text-primary text-lg font-medium mb-3'>
                            Qualification
                        </h1>
                        <ul className='mb-3'>
                            {qualifications.map((qualification) => (
                                <li className='flex items-center'>
                                    <BsArrowRightShort /> <span>{qualification}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h1 className='text-primary text-lg font-medium mb-3'>
                            Skills
                        </h1>
                        <ul className='mb-3'>
                            {skills.map((skill) => (
                                <li className='flex items-center'>
                                    <BsArrowRightShort /> <span>{skill}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <hr />
                    <div>
                        <h1 className='text-xl font-semibold text-primary mb-5'>
                            General Chat
                        </h1>
                        <div className='text-primary my-2'>
                            {data?.data?.chat?.map(({ message, reply, emailFrom }) => (
                                <div>
                                    <small>{emailFrom}</small>
                                    <p className='text-lg font-medium'>{message}</p>
                                    {reply?.map((item) => (
                                        <p className='flex items-center gap-2 relative left-5'>
                                            <BsArrowReturnRight /> {item}
                                        </p>
                                    ))}
                                    {user.role === "candidate" && <div className='flex gap-3 my-5'>
                                        <input
                                            placeholder='Reply'
                                            type='text'
                                            className='w-full'

                                        />
                                        <button
                                            className='shrink-0 h-14 w-14 bg-primary/10 border border-primary hover:bg-primary rounded-full transition-all  grid place-items-center text-primary hover:text-white'
                                            type='button'

                                        >
                                            <BsArrowRightShort size={30} />
                                        </button>
                                    </div>}

                                </div>
                            ))}
                            {user.role === "employer" && <form onSubmit={handleSubmit(handleMessage)}>
                                <div className='flex gap-3 my-5'>
                                    <input
                                        placeholder='Chat'
                                        type='text'
                                        className='w-full'
                                        {...register("message")}
                                    />
                                    <button
                                        className='shrink-0 h-14 w-14 bg-primary/10 border border-primary hover:bg-primary rounded-full transition-all  grid place-items-center text-primary hover:text-white'
                                        type='submit'

                                    >
                                        <BsArrowRightShort size={30} />
                                    </button>
                                </div>
                            </form>}
                        </div>
                    </div>
                </div>


            </div>
    }
    if (!isLoading && isError) {
        content = <h1>{error}</h1>
    }
    return (
        <div>
            {content}
        </div>
    );
};


export default ApplicantDetails;