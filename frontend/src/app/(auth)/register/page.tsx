'use client';

import Avatar from '@/ui/avatar';
import { Input, Button } from '@nextui-org/react';
import React, { useState, useEffect, useRef, useCallback } from 'react';
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
    <Input
      type={isVisible ? 'text' : 'password'}
      label={label}
      name={name}
      placeholder={placeholder}
      className="w-full"
      variant="bordered"
      isRequired={isRequired}
      onChange={onChange}
      errorMessage={error}
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
  );
}

export default function Register() {
  const [formData, setFormData] = useState({
    username: '',
    name: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({
    username: '',
    name: '',
    password: '',
    confirmPassword: '',
  });

  const [isFormValid, setIsFormValid] = useState(false);
  const [isCheckingUsername, setIsCheckingUsername] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const router = useRouter();

  const validateField = (
    name: string,
    value: string,
    allValues = formData
  ): string => {
    switch (name) {
      case 'name':
        if (!value) return 'El nombre es obligatorio';
        if (value.length < 3)
          return 'El nombre debe tener al menos 3 caracteres';
        if (value.length > 30)
          return 'El nombre no puede exceder los 30 caracteres';
        return '';

      case 'username':
        if (!value) return 'El nombre de usuario es obligatorio';
        if (value.length < 3)
          return 'El nombre de usuario debe tener al menos 3 caracteres';
        if (value.length > 30)
          return 'El nombre de usuario no puede exceder los 30 caracteres';
        if (!/^[a-zA-Z0-9_]+$/.test(value))
          return 'El nombre de usuario solo puede contener letras, números y guiones bajos';
        return '';

      case 'password':
        if (!value) return 'La contraseña es obligatoria';
        if (value.length < 6)
          return 'La contraseña debe tener al menos 6 caracteres';
        return '';

      case 'confirmPassword':
        if (!value) return 'Debe confirmar la contraseña';
        if (value !== allValues.password) return 'Las contraseñas no coinciden';
        return '';

      default:
        return '';
    }
  };

  const checkUsername = useCallback(async (username: string) => {
    if (username.length < 3) return;

    setIsCheckingUsername(true);
    try {
      const response = await fetch('/api/checkusername', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username }),
      });

      if (!response.ok) {
        setErrors((prev) => ({
          ...prev,
          username: 'Este nombre de usuario ya está en uso',
        }));
      }
    } catch (error) {
      console.error('Error al verificar username:', error);
    } finally {
      setIsCheckingUsername(false);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const newValue = name === 'username' ? value.toLowerCase() : value;

    // Actualizar el formData con los nuevos valores
    const newFormData = {
      ...formData,
      [name]: newValue,
    };
    setFormData(newFormData);

    // Validar el campo actual
    const fieldError = validateField(name, newValue, newFormData);

    // Si se está modificando la contraseña, revalidar confirmPassword
    const confirmPasswordError =
      name === 'password'
        ? validateField(
            'confirmPassword',
            newFormData.confirmPassword,
            newFormData
          )
        : errors.confirmPassword;

    setErrors((prev) => ({
      ...prev,
      [name]: fieldError,
      ...(name === 'password' && { confirmPassword: confirmPasswordError }),
    }));
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  useEffect(() => {
    const isValid =
      formData.username.length >= 3 &&
      formData.name.length >= 3 &&
      formData.password.length >= 6 &&
      formData.password === formData.confirmPassword &&
      Object.values(errors).every((error) => !error);

    setIsFormValid(isValid);
  }, [formData, errors]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid || isCheckingUsername) return;

    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        router.push('/login');
      } else {
        const errorData = await res.json();
        alert(
          `Error: ${errorData.error || 'Hubo un problema con el registro'}`
        );
      }
    } catch (error) {
      console.error('Error al registrar usuario:', error);
      alert('Hubo un problema al intentar crear la cuenta');
    }
  };

  return (
    <div className="flex flex-col w-full h-screen overflow-hidden flex-1 overflow-y-auto p-4 scrollbar-hide">
      <Avatar />
      <h1 className="text-xl font-semibold mb-10">Crear Cuenta</h1>

      <form className="space-y-6" onSubmit={handleSubmit}>
        <Input
          type="text"
          label="Nombre de usuario"
          name="username"
          value={formData.username}
          className="w-full"
          variant="bordered"
          isRequired
          onChange={handleChange}
          errorMessage={errors.username}
          isInvalid={!!errors.username}
        />

        <Input
          type="text"
          label="Nombre y Apellido"
          name="name"
          value={formData.name}
          className="w-full"
          variant="bordered"
          isRequired
          onChange={handleChange}
          errorMessage={errors.name}
          isInvalid={!!errors.name}
        />

        <PasswordInput
          label="Contraseña"
          name="password"
          isRequired
          onChange={handleChange}
          error={errors.password}
        />

        <PasswordInput
          label="Repetir Contraseña"
          name="confirmPassword"
          isRequired
          onChange={handleChange}
          error={errors.confirmPassword}
        />

        <div className="fixed bottom-0 left-0 right-0 p-4 pb-24">
          <div className="text-center text-sm font-semibold pb-4">
            <a href="/login" className="hover:underline">
              Ya tengo una cuenta!
            </a>
          </div>
          <Button
            className="w-full bg-black text-white rounded-lg"
            size="lg"
            color="primary"
            type="submit"
            disabled={!isFormValid || isCheckingUsername}>
            Crear cuenta
          </Button>
        </div>
      </form>
    </div>
  );
}
