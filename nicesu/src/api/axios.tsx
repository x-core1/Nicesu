import axios from "axios"

const instance = axios.create({
  baseURL: "https://crud-api-production-6ec0.up.railway.app",
})

export default instance