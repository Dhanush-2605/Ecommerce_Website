import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

export const notifySuccess = (data) => toast.success(data);
export const notifyFailure = (data) => toast.failure(data);
export const notifyInfo = (data) => toast.info(data);
