import { apiHelper } from '../src/utils/helpers'

export default {
  login(payload) {
    return apiHelper.post('/users/login', payload)
  },
  register(payload) {
    return apiHelper.post("/users", payload)
  },
  adminLogin(payload) {
    return apiHelper.post("admin/signin",payload)
  }
}