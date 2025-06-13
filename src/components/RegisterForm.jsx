"use client";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import registerSchema from "@/validation/registerSchema";
import { useState } from "react";
import { Eye, EyeOff, LogOut } from "lucide-react";
import Link from "next/link";
import { toast } from "react-toastify";

export default function RegisterForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => setShowPassword(!showPassword);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      firstname: "",
      lastname: "",
      company: "",
      address: "",
      city: "",
      state: "",
      country: "",
      zip: "",
      phone: "",
      about: "",
    },
    validationSchema: registerSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        // console.log(values);
        const res = await fetch("/api/auth/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });
        console.log(res);
        if (!res.ok) throw new Error("Failed to register");

        toast.success("User Register Successful!");
        resetForm();
        router.push("/login");
      } catch (err) {
        console.error(err);
        toast.error("Registration Failed!");
      }
    },
  });

  return (
    <div className="uk-form-stacked uk-width-xlarge uk-margin-auto uk-margin-small-top">
      <h2 className="uk-h4">Login Information</h2>
      <p className=" uk-text-primary">
        Please provide all required details to register your account.
      </p>

      <form onSubmit={formik.handleSubmit}>
        {/* Email & Password */}
        <div
          className="uk-flex uk-child-width-1-2@m uk-grid-small"
          data-uk-grid
        >
          <div>
            <label className="uk-form-label">
              Email <span className="uk-text-danger">*</span>
            </label>
            <input
              className="uk-input uk-border-rounded"
              type="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
            />
            {formik.touched.email && formik.errors.email && (
              <p className="uk-text-danger uk-margin-xsmall uk-text-small">
                {formik.errors.email}
              </p>
            )}
          </div>
          <div className="uk-position-relative">
            <label className="uk-form-label">
              Password <span className="uk-text-danger">*</span>
            </label>
            <input
              className="uk-input uk-border-rounded"
              type={showPassword ? "text" : "password"}
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
            />
            <span
              onClick={togglePassword}
              className="uk-position-absolute"
              style={{
                cursor: "pointer",
                top: "70%",
                right: "10px",
                transform: "translateY(-50%)",
              }}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </span>
            {formik.touched.password && formik.errors.password && (
              <p className="uk-text-danger uk-margin-xsmall uk-text-small">
                {formik.errors.password}
              </p>
            )}
          </div>
        </div>

        <h2 className="uk-h4 uk-margin-top">Contact Information</h2>

        {/* First Name Fields */}
        <div
          className="uk-flex uk-child-width-1-2@m uk-grid-small"
          data-uk-grid
        >
          <div>
            <label className="uk-form-label">
              First Name <span className="uk-text-danger">*</span>
            </label>
            <input
              className="uk-input uk-border-rounded"
              type="text"
              name="firstname"
              value={formik.values.firstname}
              onChange={formik.handleChange}
            />
            {formik.touched.firstname && formik.errors.firstname && (
              <p className="uk-text-danger uk-margin-xsmall uk-text-small">
                {formik.errors.firstname}
              </p>
            )}
          </div>
          <div>
            <label className="uk-form-label">
              Last Name <span className="uk-text-danger">*</span>
            </label>
            <input
              className="uk-input uk-border-rounded"
              type="text"
              name="lastname"
              value={formik.values.lastname}
              onChange={formik.handleChange}
            />
            {formik.touched.lastname && formik.errors.lastname && (
              <p className="uk-text-danger uk-margin-xsmall uk-text-small">
                {formik.errors.lastname}
              </p>
            )}
          </div>
        </div>

        {/* Company */}
        <div className="uk-margin-small-top">
          <label className="uk-form-label">
            Company <span className="uk-text-danger">*</span>
          </label>
          <input
            className="uk-input uk-border-rounded"
            type="text"
            name="company"
            value={formik.values.company}
            onChange={formik.handleChange}
          />
          {formik.touched.company && formik.errors.company && (
            <p className="uk-text-danger uk-margin-xsmall uk-text-small">
              {formik.errors.company}
            </p>
          )}
        </div>

        {/* Address */}
        <div className="uk-margin-small-top">
          <label className="uk-form-label">
            Address <span className="uk-text-danger">*</span>
          </label>
          <input
            className="uk-input uk-border-rounded"
            type="text"
            name="address"
            value={formik.values.address}
            onChange={formik.handleChange}
          />
          {formik.touched.address && formik.errors.address && (
            <p className="uk-text-danger uk-margin-xsmall uk-text-small">
              {formik.errors.address}
            </p>
          )}
        </div>

        {/* City, State, Country */}
        <div
          className="uk-flex uk-child-width-1-3@m uk-grid-small uk-margin-small-top"
          data-uk-grid
        >
          {["city", "state", "country"].map((field) => (
            <div key={field}>
              <label className="uk-form-label">
                {field.charAt(0).toUpperCase() + field.slice(1)}{" "}
                <span className="uk-text-danger">*</span>
              </label>
              <input
                className="uk-input uk-border-rounded"
                type="text"
                name={field}
                value={formik.values[field]}
                onChange={formik.handleChange}
              />
              {formik.touched[field] && formik.errors[field] && (
                <p className="uk-text-danger uk-margin-xsmall uk-text-small">
                  {formik.errors[field]}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Zip, Phone, About */}
        <div
          className="uk-flex uk-child-width-1-3@m uk-grid-small uk-margin-small-top"
          data-uk-grid
        >
          <div>
            <label className="uk-form-label">
              Zip Code <span className="uk-text-danger">*</span>
            </label>
            <input
              className="uk-input uk-border-rounded"
              type="text"
              name="zip"
              value={formik.values.zip}
              onChange={formik.handleChange}
            />
            {formik.touched.zip && formik.errors.zip && (
              <p className="uk-text-danger uk-margin-xsmall uk-text-small">
                {formik.errors.zip}
              </p>
            )}
          </div>
          <div>
            <label className="uk-form-label">
              Phone <span className="uk-text-danger">*</span>
            </label>
            <input
              className="uk-input uk-border-rounded"
              type="text"
              name="phone"
              value={formik.values.phone}
              onChange={formik.handleChange}
            />
            {formik.touched.phone && formik.errors.phone && (
              <p className="uk-text-danger uk-margin-xsmall uk-text-small">
                {formik.errors.phone}
              </p>
            )}
          </div>
          <div>
            <label className="uk-form-label">
              How did you hear about us?{" "}
              <span className="uk-text-danger">*</span>
            </label>
            <select
              className="uk-select uk-border-rounded"
              name="about"
              value={formik.values.about}
              onChange={formik.handleChange}
            >
              <option value="">Select</option>
              <option value="LinkedIn">LinkedIn</option>
              <option value="Social Media">Social Media</option>
            </select>
            {formik.touched.about && formik.errors.about && (
              <p className="uk-text-danger uk-margin-xsmall uk-text-small">
                {formik.errors.about}
              </p>
            )}
          </div>
        </div>

        {/* Submit & Link */}
        <div className="uk-margin">
          <button
            className="uk-button uk-button-primary uk-width-1-1 uk-border-rounded"
            type="submit"
          >
            <LogOut className="uk-margin-small-right" size={18} />
            Finish Registration
          </button>
        </div>
      </form>

      {/* Register Link */}
      <div className="uk-margin">
        <div className="uk-text-center uk-h6 uk-text-secondary">
          Already have an account?{" "}
          <Link href="/login" className="uk-text-primary">
            Login here
          </Link>
        </div>
      </div>
    </div>
  );
}
