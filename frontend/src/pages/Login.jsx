import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import authService from "../services/authService";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await authService.login(form);
      const { token, user } = res.data;
      login({ token, user });
      toast.success("Logged in");
      navigate("/");
    } catch (err) {
      const msg = err?.response?.data?.message || "Login failed";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-center">
      <div className="card auth-card">
        <h2 className="title">Welcome back</h2>
        <form onSubmit={onSubmit} className="form">
          <input
            name="email"
            value={form.email}
            onChange={onChange}
            placeholder="Email"
            type="email"
            required
            className="input"
          />
          <input
            name="password"
            value={form.password}
            onChange={onChange}
            placeholder="Password"
            type="password"
            required
            className="input"
          />
          <button disabled={loading} type="submit" className="btn primary">
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <p className="muted">
          New here?{" "}
          <Link to="/signup" className="link">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}
