'use client';

import Logo from '@/ui/logo';
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { PasswordInputProps } from '@/types/auth';

import { Icon } from '@iconify-icon/react';
import { Input, Button } from '@nextui-org/react';

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
  const { login } = useAuth();
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
  const [isLoading, setIsLoading] = useState(false);
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

    setIsLoading(true);
    setLoginError('');

    try {
      const result = await login(formData);

      if (result.success) {
        router.push('/');
      } else {
        setLoginError(
          result.error || 'Nombre de usuario o contraseña incorrectos'
        );
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      setLoginError('Hubo un problema al intentar iniciar sesión');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col w-full h-screen overflow-hidden flex-1 overflow-y-auto p-4 scrollbar-hide">
      <Logo />
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

        <div className="fixed bottom-0 left-0 right-0 pb-4 lg:1/3 lg:pb-0">
          <div className="container mx-auto lg:w-1/3 px-4">
            <div className="text-center text-sm font-semibold pb-4">
              <a href="/register" className="hover:underline">
                No tengo cuenta
              </a>
            </div>
            <Button
              className="w-full bg-black text-white dark:bg-white dark:text-black rounded-lg mb-12"
              size="lg"
              color="primary"
              type="submit"
              disabled={!isFormValid || isLoading}
              isLoading={isLoading}>
              {isLoading ? 'Iniciando sesión...' : 'Iniciar sesión'}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
