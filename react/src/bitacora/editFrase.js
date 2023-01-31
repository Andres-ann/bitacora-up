import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Footer from './footer';

//Icons
import { Check2Circle, XCircle } from 'react-bootstrap-icons';

const URI = 'http://localhost:8000/frases/';

const EditFraseComponent = () => {
	const [frase, setFrase] = useState('');
	const [autor, setAutor] = useState('');
	const navigate = useNavigate();
	const { id } = useParams();

	//procedimiento para actualizar una frase
	const update = async (e) => {
		e.preventDefault();
		await axios.put(URI + id, { frase: frase, autor: autor });
		navigate('/');
	};

	useEffect(() => {
		getFraseId();
	}, []);

	const getFraseId = async () => {
		const res = await axios.get(URI + id);
		setFrase(res.data.frase);
		setAutor(res.data.autor);
	};

	return (
		<div className='container'>
			<div className='card p-4 shadow-lg'>
				<div className='mb-4'>
					<h3 className='display-5'>Actualizar frase</h3>
				</div>
				<form onSubmit={update}>
					<div className='mb-3'>
						<label for='frase' className='form-label'>
							Frase
						</label>
						<textarea
							value={frase.toUpperCase()}
							onChange={(e) => setFrase(e.target.value)}
							type='text'
							className='form-control'
						/>
					</div>
					<div className='mb-3'>
						<label for='autor' className='form-label mt-2'>
							Autor
						</label>
						<input
							value={autor.toUpperCase()}
							onChange={(e) => setAutor(e.target.value)}
							type='text'
							className='form-control'
						/>
					</div>
					<div className='d-flex justify-content-end mt-5'>
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

export default EditFraseComponent;
