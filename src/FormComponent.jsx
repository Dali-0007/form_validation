import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const FormComponent = () => {
  const [submittedData, setSubmittedData] = useState(null);
  const [preview, setPreview] = useState('');

  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().min(6, 'Min 6 characters').required('Password is required'),
    dob: Yup.string().required('DOB is required'),
    gender: Yup.string().required('Gender is required'),
    terms: Yup.boolean().oneOf([true], 'Accept Terms & Conditions'),
    file: Yup.mixed().required('File is required'),
    search: Yup.string(),
    range: Yup.number().min(1).max(100),
    number: Yup.number(),
    time: Yup.string(),
    message: Yup.string()
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      dob: '',
      gender: '',
      terms: false,
      file: null,
      search: '',
      range: 50,
      number: '',
      time: '',
      message: '',
    },
    validationSchema,
    onSubmit: (values) => {
      setSubmittedData(values);
    },
  });

  const handleFileChange = (event) => {
    const file = event.currentTarget.files[0];
    formik.setFieldValue('file', file);
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <form onSubmit={formik.handleSubmit} noValidate>
        {/* Name */}
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            name="name"
            className={`form-control ${formik.touched.name && formik.errors.name ? 'is-invalid' : ''}`}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
          />
          <div className="invalid-feedback">{formik.errors.name}</div>
        </div>

        {/* Email */}
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            name="email"
            type="email"
            className={`form-control ${formik.touched.email && formik.errors.email ? 'is-invalid' : ''}`}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          <div className="invalid-feedback">{formik.errors.email}</div>
        </div>

        {/* Password */}
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            name="password"
            type="password"
            className={`form-control ${formik.touched.password && formik.errors.password ? 'is-invalid' : ''}`}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
          <div className="invalid-feedback">{formik.errors.password}</div>
        </div>

        {/* Date */}
        <div className="mb-3">
          <label className="form-label">DOB</label>
          <input
            name="dob"
            type="date"
            className={`form-control ${formik.touched.dob && formik.errors.dob ? 'is-invalid' : ''}`}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.dob}
          />
          <div className="invalid-feedback">{formik.errors.dob}</div>
        </div>

        {/* Gender */}
        <div className="mb-3">
          <label className="form-label d-block">Gender</label>
          <div className="form-check form-check-inline">
            <input type="radio" name="gender" value="Male" onChange={formik.handleChange} checked={formik.values.gender === 'Male'} className="form-check-input" />
            <label className="form-check-label">Male</label>
          </div>
          <div className="form-check form-check-inline">
            <input type="radio" name="gender" value="Female" onChange={formik.handleChange} checked={formik.values.gender === 'Female'} className="form-check-input" />
            <label className="form-check-label">Female</label>
          </div>
          {formik.touched.gender && formik.errors.gender && <div className="text-danger">{formik.errors.gender}</div>}
        </div>

        {/* Terms */}
        <div className="form-check mb-3">
          <input
            name="terms"
            type="checkbox"
            className="form-check-input"
            onChange={formik.handleChange}
            checked={formik.values.terms}
          />
          <label className="form-check-label">Accept Terms</label>
          {formik.touched.terms && formik.errors.terms && <div className="text-danger">{formik.errors.terms}</div>}
        </div>

        {/* File */}
        <div className="mb-3">
          <label className="form-label">Upload File</label>
          <input type="file" name="file" className="form-control" onChange={handleFileChange} />
          {formik.errors.file && <div className="text-danger">{formik.errors.file}</div>}
        </div>

        {/* Search */}
        <div className="mb-3">
          <label className="form-label">Search</label>
          <input name="search" type="search" className="form-control" onChange={formik.handleChange} value={formik.values.search} />
        </div>

        {/* Range */}
        <div className="mb-3">
          <label className="form-label">Range: {formik.values.range}</label>
          <input type="range" name="range" min="1" max="100" className="form-range" onChange={formik.handleChange} value={formik.values.range} />
        </div>

        {/* Number */}
        <div className="mb-3">
          <label className="form-label">Number</label>
          <input name="number" type="number" className="form-control" onChange={formik.handleChange} value={formik.values.number} />
        </div>

        {/* Time */}
        <div className="mb-3">
          <label className="form-label">Time</label>
          <input name="time" type="time" className="form-control" onChange={formik.handleChange} value={formik.values.time} />
        </div>

        {/* Message */}
        <div className="mb-3">
          <label className="form-label">Message</label>
          <textarea name="message" className="form-control" rows="3" onChange={formik.handleChange} value={formik.values.message}></textarea>
        </div>

        <button type="submit" className="btn btn-primary me-2">Submit</button>
        <button type="reset" className="btn btn-secondary" onClick={() => { formik.resetForm(); setSubmittedData(null); setPreview(''); }}>Reset</button>
      </form>

      {/* Submitted Result */}
      {submittedData && (
        <div className="card mt-4 p-3">
          <h4>📋 Submitted Data</h4>
          <p><strong>Name:</strong> {submittedData.name}</p>
          <p><strong>Email:</strong> {submittedData.email}</p>
          <p><strong>Password:</strong> {'*'.repeat(submittedData.password.length)}</p>
          <p><strong>DOB:</strong> {submittedData.dob}</p>
          <p><strong>Gender:</strong> {submittedData.gender}</p>
          <p><strong>Accepted Terms:</strong> {submittedData.terms ? 'Yes' : 'No'}</p>
          <p><strong>File:</strong> {submittedData.file?.name}</p>
          {preview && <img src={preview} alt="Preview" width={200} className="img-thumbnail" />}
          <p><strong>Search:</strong> {submittedData.search}</p>
          <p><strong>Range:</strong> {submittedData.range}</p>
          <p><strong>Number:</strong> {submittedData.number}</p>
          <p><strong>Time:</strong> {submittedData.time}</p>
          <p><strong>Message:</strong> {submittedData.message}</p>
        </div>
      )}
    </>
  );
};

export default FormComponent;
