'use client';

import Avatar from '@/ui/avatar';
import { Input, Button } from '@nextui-org/react';
import React, { useState } from 'react';
import { Icon } from '@iconify-icon/react';
import { useRouter } from 'next/navigation'; // Uso del hook useRouter

type PasswordInputProps = {
  label: string;
  placeholder?: string;
  isRequired?: boolean;
  name: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

function PasswordInput({
  label,
  placeholder,
  isRequired,
  name,
  onChange,
}: PasswordInputProps) {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <Input
      type={isVisible ? 'text' : 'password'}
      label={label}
      name={name} // Añadir esta prop
      placeholder={placeholder}
      className="w-full"
      variant="bordered"
      isRequired={isRequired}
      onChange={onChange} // Añadir esta prop
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

  const [isFormValid, setIsFormValid] = useState(false);
  const router = useRouter(); // Redirección con el hook useRouter

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const newFormData = { ...formData, [name]: value };
    setFormData(newFormData);

    // Usar newFormData para la validación
    const isValid =
      newFormData.username.length >= 3 &&
      newFormData.name.length >= 1 &&
      newFormData.password.length >= 6 &&
      newFormData.password === newFormData.confirmPassword;

    setIsFormValid(isValid);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Verificar que el formulario es válido antes de hacer el POST
    if (!isFormValid) return;

    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          username: formData.username,
          password: formData.password,
        }),
      });

      if (res.ok) {
        // Si la respuesta es exitosa, redirigir al usuario a la página de login
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
        {/* Usuario */}
        <Input
          type="text"
          label="Usuario"
          name="username"
          className="w-full"
          variant="bordered"
          isRequired
          onChange={handleChange}
        />

        {/* Nombre y Apellido */}
        <Input
          type="text"
          label="Nombre y Apellido"
          name="name"
          className="w-full"
          variant="bordered"
          isRequired
          onChange={handleChange}
        />

        {/* Contraseña */}
        <PasswordInput
          label="Contraseña"
          name="password"
          isRequired
          onChange={handleChange}
        />

        {/* Repetir Contraseña */}
        <PasswordInput
          label="Repetir Contraseña"
          name="confirmPassword"
          isRequired
          onChange={handleChange}
        />

        {/* Ya tengo una cuenta */}
        <div className="fixed bottom-0 left-0 right-0 p-4 pb-24">
          <div className="text-center text-sm font-semibold pb-4">
            <a href="/login" className="hover:underline">
              Ya tengo una cuenta!
            </a>
          </div>

          {/* Botón Crear Cuenta */}
          <div>
            <Button
              className="w-full bg-black text-white rounded-lg"
              size="lg"
              color="primary"
              type="submit"
              disabled={!isFormValid}>
              Crear cuenta
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
