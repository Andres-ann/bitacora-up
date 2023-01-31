import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Footer from './footer';

//Icons
import { Check2Circle, XCircle } from 'react-bootstrap-icons';

const URI = 'https://bitacora-up-api.onrender.com/frases/';

const CreateFraseComponent = () => {
	const [frase, setFrase] = useState('');
	const [autor, setAutor] = useState('');
	const navigate = useNavigate();

	//Procedimiento para guardar una nueva frase
	const store = async (e) => {
		e.preventDefault();
		await axios.post(URI, { frase: frase, autor: autor });
		navigate('/');
	};

	return (
		<div className='container'>
			<div className='card p-4 shadow-lg'>
				<div className='mb-4'>
					<h3 className='display-5'>Agregar nueva frase</h3>
				</div>
				<form onSubmit={store}>
					<div className='mb-3'>
						<label for='frase' className='form-label'>
							Frase
						</label>
						<textarea
							value={frase}
							onChange={(e) => setFrase(e.target.value.toUpperCase())}
							type='text'
							className='form-control'
							placeholder='Ingresá una nueva frase'
							autoFocus
						/>
					</div>
					<div class='mb-3'>
						<label for='autor' className='form-label mt-2'>
							Autor
						</label>
						<input
							value={autor}
							onChange={(e) => setAutor(e.target.value.toUpperCase())}
							type='text'
							className='form-control'
							placeholder='¿Quién lo dijo?'
						/>
					</div>
					<div class='d-flex justify-content-end mt-5'>
						<button type='submit' className='btn btn-success me-1'>
							<Check2Circle /> Guardar
						</button>
						<Link to={'/'} className='btn btn-secondary'>
							<XCircle /> Cancelar
						</Link>
					</div>
				</form>
			</div>
			<Footer />
		</div>
	);
};

export default CreateFraseComponent;
