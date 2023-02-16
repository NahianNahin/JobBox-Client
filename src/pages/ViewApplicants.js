import React from 'react';
import { useParams } from 'react-router-dom';
import ApplicantCard from '../components/reusable/ApplicantCard';
import Loading from '../components/reusable/Loading';
import { useGetUserByEmailQuery } from '../features/auth/authApi';
import { useGetJobByIdQuery } from '../features/job/jobApi';

const ViewApplicants = () => {
    const { id } = useParams();
    const { data, isLoading, isError, error } = useGetJobByIdQuery(id);

    const {
        companyName,
        position,
        _id,
    } = data?.data || {};
    let content;
    if (isLoading) {
        content = <Loading></Loading>;
    }
    if (!isLoading && data.status) {
        content = <div className='grid grid-cols-2 gap-5 mt-5'>
            {data?.data?.applicants.map(applicant => <ApplicantCard applicant={applicant} />)}
        </div>
    }
    return (
        <div className='pt-14'>
            <div className='bg-primary/10 p-5 rounded-2xl'>
                <h1 className='font-semibold text-xl'>View Applicants for the position {position} in {companyName}</h1>
            </div>

            {content}
        </div>
    );
};

export default ViewApplicants;