'use client';

import Avatar from '@/ui/avatar';
import { Input, Button } from '@nextui-org/react';
import React, { useState, useEffect } from 'react';
import { Icon } from '@iconify-icon/react';
import { useRouter } from 'next/navigation';

type PasswordInputProps = {
  label: string;
  placeholder?: string;
  isRequired?: boolean;
  name: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
};

function PasswordInput({
  label,
  placeholder,
  isRequired,
  name,
  onChange,
  error,
}: PasswordInputProps) {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <div className="space-y-1">
      <Input
        type={isVisible ? 'text' : 'password'}
        label={label}
        name={name}
        placeholder={placeholder}
        className="w-full"
        variant="bordered"
        isRequired={isRequired}
        onChange={onChange}
        isInvalid={!!error}
        endContent={
          <button
            aria-label="toggle password visibility"
            className="focus:outline-none"
            type="button"
            onClick={toggleVisibility}>
            <Icon
              icon={isVisible ? 'ri:eye-off-line' : 'ri:eye-line'}
              className="text-2xl text-default-400 pointer-events-none"
            />
          </button>
        }
      />
      {error && <p className="text-xs text-danger">{error}</p>}
    </div>
  );
}

export default function Login() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    username: '',
    password: '',
  });

  const [loginError, setLoginError] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);
  const router = useRouter();

  const validateField = (name: string, value: string): string => {
    if (!value.trim()) return 'Este campo es requerido';
    return '';
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const newValue = name === 'username' ? value.toLowerCase() : value;

    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: validateField(name, newValue),
    }));

    if (loginError) setLoginError('');
  };

  useEffect(() => {
    const isValid =
      Object.values(formData).every((field) => field.trim().length > 0) &&
      Object.values(errors).every((error) => !error);
    setIsFormValid(isValid);
  }, [formData, errors]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        router.push('/profile');
      } else {
        setLoginError('Nombre de usuario o contraseña incorrectos');
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      setLoginError('Hubo un problema al intentar iniciar sesión');
    }
  };

  return (
    <div className="flex flex-col w-full h-screen overflow-hidden flex-1 overflow-y-auto p-4 scrollbar-hide">
      <Avatar />
      <h1 className="text-xl font-semibold mb-10">Iniciar sesión</h1>

      <form className="space-y-6" onSubmit={handleSubmit}>
        <Input
          type="text"
          label="Usuario"
          name="username"
          value={formData.username}
          className="w-full"
          variant="bordered"
          isRequired
          onChange={handleChange}
          errorMessage={errors.username}
          isInvalid={!!errors.username}
        />

        <PasswordInput
          label="Contraseña"
          name="password"
          isRequired
          onChange={handleChange}
          error={errors.password || ''}
        />

        {loginError && (
          <p className="text-xs text-danger text-center mt-1">{loginError}</p>
        )}

        <div className="fixed bottom-0 left-0 right-0 p-4 pb-24">
          <div className="text-center text-sm font-semibold pb-4">
            <a href="/register" className="hover:underline">
              No tengo cuenta
            </a>
          </div>
          <Button
            className="w-full bg-black text-white rounded-lg"
            size="lg"
            color="primary"
            type="submit"
            disabled={!isFormValid}>
            Iniciar sesión
          </Button>
        </div>
      </form>
    </div>
  );
}
