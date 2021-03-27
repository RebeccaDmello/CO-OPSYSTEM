import axios from 'axios';

const JOB_API_BASE_URL = "http://localhost:8080/api/v1/jobs";
const APPLY_API_BASE_URL = "http://localhost:8080/api/v1/applyjob";

class JobService {

    getJobs(){
        return axios.get(JOB_API_BASE_URL);
    }

    createJob(job){
        return axios.post(JOB_API_BASE_URL, job);
    }

    getJobById(jobId){
        return axios.get(JOB_API_BASE_URL + '/' + jobId);
    }

    updateJob(job, jobId){
        return axios.put(JOB_API_BASE_URL + '/' + jobId, job);
    }

    deleteJob(jobId){
        return axios.delete(JOB_API_BASE_URL + '/' + jobId);
    }

    applyJob(jobId, stuId){
        return axios.post(APPLY_API_BASE_URL + '/' + jobId + '/' + stuId);
    }
}

export default new JobService();