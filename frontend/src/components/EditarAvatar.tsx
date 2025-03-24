'use client';

import { useState, ChangeEvent } from 'react';
import { useAuth } from '@/context/AuthContext';
import AvatarImg from '@/ui/avatar';

const EditarAvatar = () => {
  const { user, token, updateUser } = useAuth();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Maneja la selección de archivo
  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setSelectedFile(file);
      setIsLoading(true);
      await handleSave(file);
      setIsLoading(false);
    }
  };

  // Maneja el guardado de la imagen
  const handleSave = async (file: File) => {
    if (!file || !user?.id || !token) {
      console.error('Faltan datos: archivo, usuario o token.');
      return;
    }

    const formData = new FormData();
    formData.append('avatar', file);
    formData.append('userId', user.id);

    try {
      const response = await fetch('/api/profile/updateAvatar', {
        method: 'PUT',
        body: formData,
        credentials: 'include',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${await response.text()}`);
      }

      const data = await response.json();
      updateUser(data.user);
      setSelectedFile(null);
    } catch (error) {
      console.error('Error al actualizar el avatar:', error);
    }
  };

  return (
    <div className="flex flex-col items-center">
      {/* Input de archivo oculto */}
      <input
        type="file"
        id="avatar"
        name="avatar"
        accept="image/*"
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />

      {/* Avatar con spinner */}
      <div className="w-full h-12 mt-6 flex items-center justify-center">
        <AvatarImg src={user?.avatar || ''} isLoading={isLoading} />
      </div>

      {/* Botón para seleccionar la imagen */}
      <label htmlFor="avatar" className="cursor-pointer text-blue-500 m-4">
        Editar avatar
      </label>
    </div>
  );
};

export default EditarAvatar;
