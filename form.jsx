import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert } from '@/components/ui/alert';

const MarsApplicationForm = () => {
  const [currentStage, setCurrentStage] = useState(1);
  const [formData, setFormData] = useState({
    // Stage 1
    fullName: '',
    dateOfBirth: '',
    nationality: '',
    email: '',
    phone: '',
    // Stage 2
    departureDate: '',
    returnDate: '',
    accommodation: '',
    specialRequests: '',
    // Stage 3
    healthDeclaration: '',
    emergencyContactName: '',
    emergencyContactPhone: '',
    medicalConditions: ''
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validatePhone = (phone) => {
    return /^\+?[\d\s-]{10,}$/.test(phone);
  };

  const validateStage = (stage) => {
    const newErrors = {};
    
    if (stage === 1) {
      if (!formData.fullName) newErrors.fullName = 'Full name is required';
      if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
      if (!formData.nationality) newErrors.nationality = 'Nationality is required';
      if (!formData.email) newErrors.email = 'Email is required';
      else if (!validateEmail(formData.email)) newErrors.email = 'Invalid email format';
      if (!formData.phone) newErrors.phone = 'Phone is required';
      else if (!validatePhone(formData.phone)) newErrors.phone = 'Invalid phone format';
    }
    
    if (stage === 2) {
      if (!formData.departureDate) newErrors.departureDate = 'Departure date is required';
      if (!formData.returnDate) newErrors.returnDate = 'Return date is required';
      if (!formData.accommodation) newErrors.accommodation = 'Accommodation preference is required';
    }
    
    if (stage === 3) {
      if (!formData.healthDeclaration) newErrors.healthDeclaration = 'Health declaration is required';
      if (!formData.emergencyContactName) newErrors.emergencyContactName = 'Emergency contact name is required';
      if (!formData.emergencyContactPhone) newErrors.emergencyContactPhone = 'Emergency contact phone is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNext = () => {
    if (validateStage(currentStage)) {
      setCurrentStage(prev => prev + 1);
    }
  };

  const handleBack = () => {
    setCurrentStage(prev => prev - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateStage(3)) {
      console.log('Form submitted:', formData);
      setSubmitted(true);
    }
  };

  const renderStage1 = () => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Full Name *</label>
        <input
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleInputChange}
          className="w-full p-2 border rounded"
        />
        {errors.fullName && <span className="text-red-500 text-sm">{errors.fullName}</span>}
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-1">Date of Birth *</label>
        <input
          type="date"
          name="dateOfBirth"
          value={formData.dateOfBirth}
          onChange={handleInputChange}
          className="w-full p-2 border rounded"
        />
        {errors.dateOfBirth && <span className="text-red-500 text-sm">{errors.dateOfBirth}</span>}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Nationality *</label>
        <input
          type="text"
          name="nationality"
          value={formData.nationality}
          onChange={handleInputChange}
          className="w-full p-2 border rounded"
        />
        {errors.nationality && <span className="text-red-500 text-sm">{errors.nationality}</span>}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Email *</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          className="w-full p-2 border rounded"
        />
        {errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Phone *</label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleInputChange}
          className="w-full p-2 border rounded"
        />
        {errors.phone && <span className="text-red-500 text-sm">{errors.phone}</span>}
      </div>
    </div>
  );

  const renderStage2 = () => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Departure Date *</label>
        <input
          type="date"
          name="departureDate"
          value={formData.departureDate}
          onChange={handleInputChange}
          className="w-full p-2 border rounded"
        />
        {errors.departureDate && <span className="text-red-500 text-sm">{errors.departureDate}</span>}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Return Date *</label>
        <input
          type="date"
          name="returnDate"
          value={formData.returnDate}
          onChange={handleInputChange}
          className="w-full p-2 border rounded"
        />
        {errors.returnDate && <span className="text-red-500 text-sm">{errors.returnDate}</span>}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Accommodation Preference *</label>
        <select
          name="accommodation"
          value={formData.accommodation}
          onChange={handleInputChange}
          className="w-full p-2 border rounded"
        >
          <option value="">Select accommodation</option>
          <option value="space-hotel">Space Hotel</option>
          <option value="martian-base">Martian Base</option>
        </select>
        {errors.accommodation && <span className="text-red-500 text-sm">{errors.accommodation}</span>}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Special Requests</label>
        <textarea
          name="specialRequests"
          value={formData.specialRequests}
          onChange={handleInputChange}
          className="w-full p-2 border rounded"
          rows="3"
        />
      </div>
    </div>
  );

  const renderStage3 = () => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Health Declaration *</label>
        <select
          name="healthDeclaration"
          value={formData.healthDeclaration}
          onChange={handleInputChange}
          className="w-full p-2 border rounded"
        >
          <option value="">Select option</option>
          <option value="yes">Yes, I am in good health</option>
          <option value="no">No, I have health concerns</option>
        </select>
        {errors.healthDeclaration && <span className="text-red-500 text-sm">{errors.healthDeclaration}</span>}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Emergency Contact Name *</label>
        <input
          type="text"
          name="emergencyContactName"
          value={formData.emergencyContactName}
          onChange={handleInputChange}
          className="w-full p-2 border rounded"
        />
        {errors.emergencyContactName && <span className="text-red-500 text-sm">{errors.emergencyContactName}</span>}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Emergency Contact Phone *</label>
        <input
          type="tel"
          name="emergencyContactPhone"
          value={formData.emergencyContactPhone}
          onChange={handleInputChange}
          className="w-full p-2 border rounded"
        />
        {errors.emergencyContactPhone && <span className="text-red-500 text-sm">{errors.emergencyContactPhone}</span>}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Medical Conditions</label>
        <textarea
          name="medicalConditions"
          value={formData.medicalConditions}
          onChange={handleInputChange}
          className="w-full p-2 border rounded"
          rows="3"
          placeholder="List any medical conditions (if applicable)"
        />
      </div>
    </div>
  );

  if (submitted) {
    return (
      <Alert className="max-w-2xl mx-auto">
        <h2 className="font-semibold text-xl mb-2">Application Submitted Successfully!</h2>
        <p>Thank you for your interest in visiting Mars. We will review your application and contact you soon.</p>
      </Alert>
    );
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Mars Visit Application - Stage {currentStage} of 3</CardTitle>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit}>
          {currentStage === 1 && renderStage1()}
          {currentStage === 2 && renderStage2()}
          {currentStage === 3 && renderStage3()}
        </form>
      </CardContent>

      <CardFooter className="flex justify-between">
        {currentStage > 1 && (
          <button
            type="button"
            onClick={handleBack}
            className="px-4 py-2 bg-gray-200 rounded"
          >
            Back
          </button>
        )}
        
        {currentStage < 3 ? (
          <button
            type="button"
            onClick={handleNext}
            className="px-4 py-2 bg-blue-500 text-white rounded ml-auto"
          >
            Next
          </button>
        ) : (
          <button
            type="button"
            onClick={handleSubmit}
            className="px-4 py-2 bg-green-500 text-white rounded ml-auto"
          >
            Submit Application
          </button>
        )}
      </CardFooter>
    </Card>
  );
};

export default MarsApplicationForm;
