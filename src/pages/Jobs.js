import React from "react";
import JobCard from "../components/reusable/JobCard";
import Loading from "../components/reusable/Loading";
import { useGetJobsQuery } from "../features/job/jobApi";

const Jobs = () => {
  const { data, isLoading } = useGetJobsQuery();
  const jobs = data?.data;
  console.log(data);
  let content;
  if (isLoading) {
    content = <Loading></Loading>;
  }
  if (!isLoading && data.status) {
    content = <div className='grid grid-cols-2 gap-5 mt-5'>
      {jobs.map(jobData => <JobCard jobData={jobData} />)}
    </div>
  }
  return (
    <div className='pt-14'>
      <div className='bg-primary/10 p-5 rounded-2xl'>
        <h1 className='font-semibold text-xl'>Find Jobs</h1>
      </div>
      {content}
      
    </div>
  );
};

export default Jobs;
