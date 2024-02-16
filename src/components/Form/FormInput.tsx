// FormInput.tsx
import React from 'react';

interface FormInputProps {
  label: string;
  type: string;
  value: string;
  className: string;
  onChange: (value: string) => void;
}

const FormInput: React.FC<FormInputProps> = ({ label, type, value, onChange,className }) => {
  return (
    <div>
      <label>{label}</label>
      <input className={className} type={type} value={value} onChange={(e) => onChange(e.target.value)} />
    </div>
  );
};

export default FormInput;
