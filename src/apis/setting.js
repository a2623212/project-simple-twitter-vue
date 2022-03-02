import { apiHelper } from "../utils/helper";
const getToken = () => localStorage.getItem("token");

export default {
  setUser({ userId, formData }) {
    return apiHelper.put(`/users/${userId}/setting`, formData, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
  },
};