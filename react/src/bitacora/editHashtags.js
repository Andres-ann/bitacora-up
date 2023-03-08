import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Footer from './footer';

//Icons
import { Check2Circle, XCircle } from 'react-bootstrap-icons';

const URI = 'https://bitacora-up-api.onrender.com/hashtags/';

const EditHashtagComponent = () => {
	const [hashtag, setHashtag] = useState('');
	const navigate = useNavigate();
	const { id } = useParams();

	//procedimiento para actualizar un hashtag
	const update = async (e) => {
		e.preventDefault();
		await axios.put(URI + id, { hashtag: hashtag });
		navigate('/');
	};

	useEffect(() => {
		getHashtagId();
	}, []);

	const getHashtagId = async () => {
		const res = await axios.get(URI + id);
		setHashtag(res.data.hashtag);
	};

	return (
		<div className='container'>
			<div className='card p-4 shadow-lg'>
				<div className='mb-4'>
					<h3 className='display-5'>Actualizar hashtags</h3>
				</div>
				<form onSubmit={update}>
					<div className='mb-3'>
						<label for='frase' className='form-label'>
							Hashtags
						</label>
						<textarea
							value={hashtag.toLowerCase()}
							onChange={(e) => setHashtag(e.target.value)}
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

export default EditHashtagComponent;
