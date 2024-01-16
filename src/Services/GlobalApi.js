import axios from "axios";

const BASE_URL = "http://localhost:8082/api/";

const AxioInstance = axios.create({
  baseURL: BASE_URL,
});

const getDoctors = () => AxioInstance.get("/doctors/AllDoctor");
const getSliderimages =() => AxioInstance.get("/doctors/allSliderImages")
const getDoctorBySpecialization = (specialization) => AxioInstance.get(`/doctors/getDoctorBySpecialization/${specialization}`);
const addRequest = (data) => AxioInstance.post("/request/addRequest", data);
const getDoctorById =(id) => AxioInstance.get(`/doctors/getDoctor/${id}`);
const getRequestById=(requestId)=>AxioInstance.get(`/request/${requestId}`);

export default {
  getDoctorBySpecialization,
  getDoctors,
  getSliderimages,
  addRequest,
  getDoctorById,
  getRequestById,
};
