import api from "./api";
const signup = (data) => api.post("/api/auth/signup", data);
const login = (data) => api.post("/api/auth/login", data);
export default { signup, login };
