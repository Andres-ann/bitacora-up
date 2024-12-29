'use client';

import Avatar from '@/ui/avatar';
import { Input, Button } from '@nextui-org/react';
import React, { useState } from 'react';
import { Icon } from '@iconify-icon/react';

type PasswordInputProps = {
  label: string;
  placeholder?: string;
  isRequired?: boolean;
  name: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

function PasswordInput({ label, placeholder, isRequired }: PasswordInputProps) {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <Input
      type={isVisible ? 'text' : 'password'}
      label={label}
      placeholder={placeholder}
      className="w-full"
      variant="bordered"
      isRequired={isRequired}
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Validar si todos los campos están completos y las contraseñas coinciden
    const isValid =
      formData.username.length >= 3 &&
      formData.name.length >= 1 &&
      formData.password.length >= 6 &&
      formData.password === formData.confirmPassword;

    setIsFormValid(isValid);
  };

  return (
    <div className="flex flex-col w-full h-screen overflow-hidden flex-1 overflow-y-auto p-4 scrollbar-hide">
      <Avatar />
      <h1 className="text-xl font-semibold mb-10">Crear Cuenta</h1>

      <form className="space-y-6">
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
