"use client";

import { useState } from "react";
import { useFormik } from "formik";
import loginSchema from "@/validation/loginSchema";
import { Eye, EyeOff, LogOut, User, Lock } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function LoginForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => setShowPassword(!showPassword);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        // console.log(values);
        const res = await fetch("/api/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });
        // console.log(res);

        if (!res.ok) throw new Error("Failed to login");
        toast.success("User Login Successful!");
        resetForm();
        router.push("/dashboard");
      } catch (err) {
        toast.error("Login failed!");
        console.error(err.error);
      }
    },
  });

  return (
    <div className="uk-form-stacked uk-width-large uk-margin-auto uk-margin-large-top">
      <h2>Login</h2>

      {/* Description */}
      <div className="uk-margin">
        <p className="uk-h6 uk-text-secondary">
          Please provide all required details to log into your account.
        </p>
      </div>
      <form onSubmit={formik.handleSubmit}>
        {/* Email Field */}
        <div className="uk-margin-top">
          <div className="uk-position-relative">
            <span className="uk-form-icon">
              <User size={18} />
            </span>
            <input
              className="uk-input uk-border-rounded"
              type="email"
              name="email"
              placeholder="Email Address *"
              value={formik.values.email}
              onChange={formik.handleChange}
            />
          </div>
          {formik.touched.email && formik.errors.email ? (
            <p className="uk-text-danger uk-margin-xsmall uk-text-small">
              {formik.errors.email}
            </p>
          ) : null}
        </div>

        {/* Password Field with Toggle */}
        <div className="uk-margin-top">
          <div className="uk-position-relative">
            <span className="uk-form-icon">
              <Lock size={18} />
            </span>
            <input
              className="uk-input uk-border-rounded"
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter Password *"
              value={formik.values.password}
              onChange={formik.handleChange}
            />
            <span
              onClick={togglePassword}
              style={{
                cursor: "pointer",
                top: "50%",
                right: "10px",
                transform: "translateY(-50%)",
              }}
              className="uk-position-absolute"
              data-uk-tooltip="title: Toggle Password; pos: left"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </span>
          </div>
          {formik.touched.password && formik.errors.password ? (
            <p className="uk-text-danger uk-margin-xsmall uk-text-small">
              {formik.errors.password}
            </p>
          ) : null}
        </div>

        {/* Forget Password */}
        <div className="uk-margin">
          <div className="uk-h6 uk-text-right">
            <Link href="/forget-password">Forget Your Password</Link>
          </div>
        </div>

        {/* Submit Button */}
        <div className="uk-margin">
          <button
            className="uk-button uk-button-primary uk-width-1-1 uk-border-rounded"
            type="submit"
          >
            <LogOut style={{ marginRight: "6px" }} size={18} />
            Login
          </button>
        </div>
      </form>

      {/* Register Link */}
      <div className="uk-margin">
        <div className="uk-h6 uk-text-center uk-text-secondary">
          Don't have an account?{" "}
          <Link href="/register" className="uk-text-primary">
            Register here
          </Link>
        </div>
      </div>
    </div>
  );
}
