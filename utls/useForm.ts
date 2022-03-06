import React, { FormHTMLAttributes, useState } from "react";

const useForm = (onSubmit: any) => {
  const [form, setForm] = useState({});

  const updateForm = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit?.(form);
  };

  return { form, updateForm, handleSubmit };
};

export default useForm;