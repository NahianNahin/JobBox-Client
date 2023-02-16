import React from "react";
import { useNavigate } from "react-router-dom";

const ApplicantCard = ({ applicant }) => {
  const navigate = useNavigate();
  const { email, id, firstName, lastName } =
    applicant || {};

  return (
    <div
      className='border border-gray-300 shadow-xl p-5 rounded-2xl text-primary'
    >
      <div className='flex justify-between  text-primary'>
        <div>
          <p className='text-xl'>{firstName} {lastName}</p>
          <small className='text-primary/70 '>
            from{" "}
            <span className='font-semibold hover:text-primary cursor-pointer hover:underline transition-all'>
              {`Bangladesh`}
            </span>
          </small>
        </div>
        <p>{email}</p>
      </div>
      <div className='flex justify-between items-center mt-5'>
        <p>{firstName} {lastName}</p>
        <button className='btn' onClick={() => navigate(`/applicant-details/${id}`)}>
          Details
        </button>
      </div>
    </div>
  );
};

export default ApplicantCard;
