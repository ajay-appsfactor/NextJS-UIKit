"use client";
import { useFormik } from "formik";
import { useState } from "react";
import { useRouter } from "next/navigation";
import addCustomerSchema from "@/validation/addCustomerSchema";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { Tabs, TabList, Tab, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { toast } from "react-toastify";

export default function AddCustomerPage() {
  const router = useRouter();
  const [tabIndex, setTabIndex] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => setShowPassword(!showPassword);

  const placeholders = [
    "CUSTOMER NOTE", 
    "QUALITY",
    "ACCOUNTING",
    "SHIPPING",
    "SALES",
  ];

  const formik = useFormik({
    initialValues: {
      email: "",
      firstname: "",
      lastname: "",
      company: "",
      address: "",
      city: "",
      state: "",
      country: "",
      zip: "",
      phone: "",
      mobile: "",
      sendinvoice: "",
      conformance: "",
      password: "",
      sfirstname: "",
      slastname: "",
      scompany: "",
      saddress: "",
      scity: "",
      sstate: "",
      scountry: "",
      szip: "",
      sphone: "",
      smobile: "",
      terms: "",
      freight: "",
      note: "",
    },
    validationSchema: addCustomerSchema,
    onSubmit: async (values, { resetForm }) => {
      // console.log(values);
      try {
        console.log(values);
        const res = await fetch("/api/dashboard/customers", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });

        console.log(res);
        if (!res.ok) throw new Error("Failed to add customer");

        toast.success("Add Customer Successful!");
        resetForm();
        router.push("/dashboard");
      } catch (err) {
        toast.error("Add Customer failed!");
        console.error(err);
      }
    },
  });

  return (
    <div className=" uk-padding-small">
      <div>
        <h2 className="uk-h5 uk-text-bolder">Add Customer</h2>
      </div>

      {/* checkbox  */}
      <div className="uk-margin uk-grid-small uk-child-width-auto uk-grid">
        <label>
          <input className="uk-checkbox" type="checkbox" checked readOnly />
          <span className="uk-margin-small-left">Critical Customers</span>
        </label>
      </div>

      {/* Login Details */}
      <div>
        <h2 className="uk-h5 uk-text-medium">Login Details</h2>
      </div>

      {/* Add Customer Form */}

      <form onSubmit={formik.handleSubmit}>
        {/* Email & Password */}
        <div
          className="uk-flex uk-child-width-1-2@m uk-grid-small"
          data-uk-grid
        >
          {/* Email Field */}
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

          {/* Password Field */}
          <div>
            <label className="uk-form-label">Password</label>
            <div className="uk-position-relative">
              <input
                className="uk-input uk-border-rounded"
                type={showPassword ? "text" : "password"}
                name="password"
                style={{ paddingRight: "40px" }}
                value={formik.values.password}
                onChange={formik.handleChange}
              />
              <span
                onClick={togglePassword}
                className="uk-position-absolute"
                style={{
                  cursor: "pointer",
                  top: "50%",
                  right: "10px",
                  transform: "translateY(-50%)",
                }}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </span>
            </div>
          </div>
        </div>

        {/* Billing and Shipping Section */}
        <div
          className="uk-flex uk-child-width-1-2@m uk-grid-small uk-margin-top"
          data-uk-grid
        >
          {/* Billing Details */}
          <div>
            <h2 className="uk-h5 uk-text-secondary">Billing Details</h2>
            <div className="uk-card">
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
            </div>
            {/* Company */}
            <div className="uk-margin-xsmall-top">
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
            <div className="uk-margin-xsmall-top">
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
              className="uk-flex uk-child-width-1-3@m uk-grid-small uk-margin-xsmall-top"
              data-uk-grid
            >
              {/* City */}
              <div>
                <label className="uk-form-label">
                  City <span className="uk-text-danger">*</span>
                </label>
                <input
                  className="uk-input uk-border-rounded"
                  type="text"
                  name="city"
                  value={formik.values.city}
                  onChange={formik.handleChange}
                />
                {formik.touched.city && formik.errors.city && (
                  <p className="uk-text-danger uk-margin-xsmall uk-text-small">
                    {formik.errors.city}
                  </p>
                )}
              </div>
              {/* State */}
              <div>
                <label className="uk-form-label">
                  Sate <span className="uk-text-danger">*</span>
                </label>
                <input
                  className="uk-input uk-border-rounded"
                  type="text"
                  name="state"
                  value={formik.values.state}
                  onChange={formik.handleChange}
                />
                {formik.touched.state && formik.errors.state && (
                  <p className="uk-text-danger uk-margin-xsmall uk-text-small">
                    {formik.errors.state}
                  </p>
                )}
              </div>
              {/* Country */}
              <div>
                <label className="uk-form-label">
                  Country <span className="uk-text-danger">*</span>
                </label>
                <input
                  className="uk-input uk-border-rounded"
                  type="text"
                  name="country"
                  value={formik.values.country}
                  onChange={formik.handleChange}
                />
                {formik.touched.country && formik.errors.country && (
                  <p className="uk-text-danger uk-margin-xsmall uk-text-small">
                    {formik.errors.country}
                  </p>
                )}
              </div>
            </div>
            {/* Zip, Phone, Mobile */}
            <div
              className="uk-flex uk-child-width-1-3@m uk-grid-small uk-margin-xsmall-top"
              data-uk-grid
            >
              {/* Zip */}
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
              {/* Phone */}
              <div>
                <label className="uk-form-label">Phone</label>
                <input
                  className="uk-input uk-border-rounded"
                  type="text"
                  name="phone"
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                />
              </div>
              {/* Mobile */}
              <div>
                <label className="uk-form-label">Mobile</label>
                <input
                  className="uk-input uk-border-rounded"
                  type="text"
                  name="mobile"
                  value={formik.values.mobile}
                  onChange={formik.handleChange}
                />
              </div>
            </div>

            {/* Send Invoice To */}
            <div className="uk-margin-xsmall-top">
              <label className="uk-form-label">Send Invoice To</label>
              <input
                className="uk-input uk-border-rounded"
                type="text"
                name="sendinvoice"
                value={formik.values.sendinvoice}
                onChange={formik.handleChange}
              />
              {formik.touched.address && formik.errors.address && (
                <p className="uk-text-danger uk-margin-xsmall uk-text-small">
                  {formik.errors.address}
                </p>
              )}
            </div>

            {/* Certificate Of Conformance */}
            <div className="uk-margin-xsmall-top">
              <label className="uk-form-label">
                Certificate Of Conformance
              </label>
              <input
                className="uk-input uk-border-rounded"
                type="text"
                name="conformance"
                value={formik.values.conformance}
                onChange={formik.handleChange}
              />
            </div>
          </div>

          {/* Shipping Details */}
          <div>
            <h2 className="uk-h5 uk-text-secondary">Shipping Details</h2>
            {/* Company First & Last Name */}
            <div className="uk-card">
              <div
                className="uk-flex uk-child-width-1-2@m uk-grid-small"
                data-uk-grid
              >
                {/* Shipping First Name Fields */}
                <div>
                  <label className="uk-form-label">Shipping First Name</label>
                  <input
                    className="uk-input uk-border-rounded"
                    type="text"
                    name="sfirstname"
                    value={formik.values.sfirstname}
                    onChange={formik.handleChange}
                  />
                </div>
                {/* Shipping Last Name Fields */}
                <div>
                  <label className="uk-form-label">Shipping Last Name</label>
                  <input
                    className="uk-input uk-border-rounded"
                    type="text"
                    name="slastname"
                    value={formik.values.slastname}
                    onChange={formik.handleChange}
                  />
                </div>
              </div>
            </div>
            {/* Shipping Company */}
            <div className="uk-margin-xsmall-top">
              <label className="uk-form-label">Shipping Company</label>
              <input
                className="uk-input uk-border-rounded"
                type="text"
                name="scompany"
                value={formik.values.scompany}
                onChange={formik.handleChange}
              />
            </div>
            {/* Shipping Address */}
            <div className="uk-margin-xsmall-top">
              <label className="uk-form-label">Shipping Address</label>
              <input
                className="uk-input uk-border-rounded"
                type="text"
                name="saddress"
                value={formik.values.saddress}
                onChange={formik.handleChange}
              />
            </div>
            {/* Shipping City, Shipping State, Shipping Country */}
            <div
              className="uk-flex uk-child-width-1-3@m uk-grid-small uk-margin-xsmall-top"
              data-uk-grid
            >
              {/* Shipping City */}
              <div>
                <label className="uk-form-label">Shipping City</label>
                <input
                  className="uk-input uk-border-rounded"
                  type="text"
                  name="scity"
                  value={formik.values.scity}
                  onChange={formik.handleChange}
                />
              </div>
              {/* Shipping Phone */}
              <div>
                <label className="uk-form-label">Shipping State</label>
                <input
                  className="uk-input uk-border-rounded"
                  type="text"
                  name="sstate"
                  value={formik.values.sstate}
                  onChange={formik.handleChange}
                />
              </div>
              {/* Shipping Country */}
              <div>
                <label className="uk-form-label">Shipping Country</label>
                <input
                  className="uk-input uk-border-rounded"
                  type="text"
                  name="scountry"
                  value={formik.values.scountry}
                  onChange={formik.handleChange}
                />
              </div>
            </div>
            {/* Shipping Zip, Shipping Phone, Shipping Mobile */}
            <div
              className="uk-flex uk-child-width-1-3@m uk-grid-small uk-margin-xsmall-top"
              data-uk-grid
            >
              {/* Shipping Zip */}
              <div>
                <label className="uk-form-label">Shipping Zip Code</label>
                <input
                  className="uk-input uk-border-rounded"
                  type="text"
                  name="szip"
                  value={formik.values.szip}
                  onChange={formik.handleChange}
                />
              </div>
              {/* Shipping Phone */}
              <div>
                <label className="uk-form-label">Shipping Phone</label>
                <input
                  className="uk-input uk-border-rounded"
                  type="text"
                  name="sphone"
                  value={formik.values.sphone}
                  onChange={formik.handleChange}
                />
              </div>
              {/* Shipping Mobile */}
              <div>
                <label className="uk-form-label">Shipping Mobile</label>
                <input
                  className="uk-input uk-border-rounded"
                  type="text"
                  name="smobile"
                  value={formik.values.smobile}
                  onChange={formik.handleChange}
                />
              </div>
            </div>
            {/* Terms & Freight Condition */}
            <div className="uk-card">
              <div
                className="uk-flex uk-child-width-1-2@m uk-grid-small uk-margin-xsmall-top"
                data-uk-grid
              >
                {/* Terms */}
                <div>
                  <label className="uk-form-label">Terms</label>
                  <select
                    className="uk-select uk-border-rounded"
                    name="terms"
                    value={formik.values.terms}
                    onChange={formik.handleChange}
                  >
                    <option value="">Select</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>
                {/* Freight Condition */}
                <div>
                  <label className="uk-form-label">Freight Condition</label>
                  <input
                    className="uk-input uk-border-rounded"
                    type="text"
                    name="freight"
                    value={formik.values.freight}
                    onChange={formik.handleChange}
                  />
                </div>
              </div>
            </div>

            {/* Tab Note */}
            <div className="uk-margin-xsmall-top">
              <label className="uk-form-label">Notes</label>

              <Tabs
                selectedIndex={tabIndex}
                onSelect={(index) => setTabIndex(index)}
              >
                <TabList>
                  {[
                    "Customer",
                    "Quality",
                    "Accounting",
                    "Shipping",
                    "Sales",
                  ].map((label, index) => (
                    <Tab
                      key={label}
                      style={{
                        padding: "8px 12px",
                        cursor: "pointer",
                        backgroundColor:
                          tabIndex === index ? "#1e87f0" : "white",
                        color: tabIndex === index ? "white" : "black",
                        border: "1px solid #ccc",
                        borderBottom: "none",
                        borderRadius: "4px 4px 0 0",
                        marginRight: "5px",
                        fontWeight: tabIndex === index ? "bold" : "normal",
                      }}
                    >
                      {label}
                    </Tab>
                  ))}
                </TabList>

                {/*  textarea input */}
                <TabPanel>
                  <textarea
                    className="uk-textarea uk-border-rounded"
                    name="note"
                    value={formik.values.note}
                    onChange={formik.handleChange}
                    placeholder={placeholders[0]}
                  />
                </TabPanel>
                <TabPanel>
                  <textarea
                    className="uk-textarea uk-border-rounded"
                    name="note"
                    value={formik.values.note}
                    onChange={formik.handleChange}
                    placeholder={placeholders[1]}
                  />
                </TabPanel>
                <TabPanel>
                  <textarea
                    className="uk-textarea uk-border-rounded"
                    name="note"
                    value={formik.values.note}
                    onChange={formik.handleChange}
                    placeholder={placeholders[2]}
                  />
                </TabPanel>
                <TabPanel>
                  <textarea
                    className="uk-textarea uk-border-rounded"
                    name="note"
                    value={formik.values.note}
                    onChange={formik.handleChange}
                    placeholder={placeholders[3]}
                  />
                </TabPanel>
                <TabPanel>
                  <textarea
                    className="uk-textarea uk-border-rounded"
                    name="note"
                    value={formik.values.note}
                    onChange={formik.handleChange}
                    placeholder={placeholders[4]}
                  />
                </TabPanel>
              </Tabs>
            </div>
          </div>
        </div>

        {/* Button  */}
        <div className="uk-margin-top">
          <button className="uk-button uk-button-primary" type="submit">
            Save
          </button>
          <button className="uk-button uk-button-default uk-margin-small-left">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
