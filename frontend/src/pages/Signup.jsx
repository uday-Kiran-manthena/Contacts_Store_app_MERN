import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import authService from "../services/authService";
import toast from "react-hot-toast";

// Regular expression for email validation
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const validateForm = () => {
    if (form.name.length < 3) {
      toast.error("Name must be at least 3 characters long.");
      return false;
    }
    if (!emailRegex.test(form.email)) {
      toast.error("Please enter a valid email address.");
      return false;
    }
    if (form.password.length < 6) {
      toast.error("Password must be at least 6 characters long.");
      return false;
    }
    return true;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    setLoading(true);
    try {
      await authService.signup(form);
      toast.success("Signup successful — please log in");
      navigate("/login");
    } catch (err) {
      const msg = err?.response?.data?.message || "Signup failed";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-center">
      <div className="card auth-card">
        <h2 className="title">Create account</h2>
        <form onSubmit={onSubmit} className="form">
          <input
            name="name"
            value={form.name}
            onChange={onChange}
            placeholder="Full name"
            required
            className="input"
          />
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
            {loading ? "Please wait..." : "Sign up"}
          </button>
        </form>
        <p className="muted">
          Already have an account?{" "}
          <Link to="/login" className="link">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
