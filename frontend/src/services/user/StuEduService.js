import axios from 'axios';

const EDU_API_BASE_URL = "http://localhost:8080/api/v1/education";
const EDU_API_BASE_URL2 = "http://localhost:8080/api/v1/edubyid";

class EduService {

    getEducation(){
        return axios.get(EDU_API_BASE_URL);
    }

    createEducation(edu){
        return axios.post(EDU_API_BASE_URL, edu);
    }

    getEducationById(eduId){
        return axios.get(EDU_API_BASE_URL2 + '/' + eduId);
    }

    getEducationBySid(eduId){
        return axios.get(EDU_API_BASE_URL + '/' + eduId);
    }

    updateEducation(edu, eduId){
        return axios.put(EDU_API_BASE_URL + '/' + eduId, edu);
    }

    deleteEducation(eduId){
        return axios.delete(EDU_API_BASE_URL + '/' + eduId);
    }
}

export default new EduService();