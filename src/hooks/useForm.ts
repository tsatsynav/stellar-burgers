import { useState, ChangeEvent } from 'react';

export function useForm<T extends Record<string, string>>(inputValues: T) {
  const [values, setValues] = useState<T>(inputValues);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setValues({ ...values, [name]: value } as T);
  };

  return { values, handleChange, setValues };
}
