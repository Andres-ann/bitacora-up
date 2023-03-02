import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Footer from './footer';
import moment from 'moment';
import axios from 'axios';

//Icons
import { XLg, PatchCheckFill, Twitter, HeartFill, Share } from 'react-bootstrap-icons';

const URI = 'https://bitacora-up-api.onrender.com/frases/';

const ViewFraseComponent = () => {
	const [frase, setFrase] = useState('');
	const [autor, setAutor] = useState('');
	const [likes, setLikes] = useState(0);
	const { id } = useParams();

	useEffect(() => {
		getFraseId();
	}, []);

	const getFraseId = async () => {
		const res = await axios.get(URI + id);
		setFrase(res.data.frase);
		setAutor(res.data.autor);
		setLikes(res.data.likes);
	};

	//procedimiento para actualizar
	const update = async (e) => {
		e.preventDefault();
		await axios.put(URI + id, { frase: frase, autor: autor, likes: likes });
	};

	//procedimiento para compartir frase
	const share = () => {
		window.open(
			'https://api.whatsapp.com/send?text=¡Agregamos%20una%20nueva%20frase%20a%20la%20Bitácora!%20' +
				window.location.href
		);
	};

	//Mostrar la hora actual
	let today = moment().format('HH:mm A • DD/MM/YYYY - ');

	return (
		<div>
			<div className='d-flex justify-content-center mt-5 pt-5'>
				<div className='card col-sm-6 shadow-lg'>
					<div className='d-flex flex-row-reverse'>
						<Link to={'/'} className='btn'>
							<XLg />
						</Link>
					</div>

					<div className='card m-3 p-3'>
						<div className='row mt-2'>
							<div className='col-3 col-sm-1'>
								<img
									src='https://i.ibb.co/4dnHTpF/logoup.jpg'
									className='border rounded-circle'
									width='60px'
									alt='...'
								/>
							</div>
							<div className='col-6 col-sm-8 ms-sm-4 me-3 me-sm-4 pt-1'>
								<p className='fw-bolder'>
									Bitácora UP
									<span className='ms-1 text-primary'>
										<PatchCheckFill />
									</span>
									<br />
									<span className='fw-lighter fst-italic text-muted'>@bitacora_UP</span>
								</p>
							</div>
							<div className='col-1 fs-2 text-primary pe-5'>
								<Twitter />
							</div>
							<form className='ps-4' onSubmit={update}>
								<div className='mb-3 mt-2'>
									<input
										value={frase}
										onChange={(e) => setFrase(e.target.value)}
										type='text'
										className='form-control'
										hidden
									/>
									<p>{frase}</p>
								</div>

								<div className='mb-3'>
									<input
										value={autor}
										onChange={(e) => setAutor(e.target.value)}
										type='text'
										className='form-control'
										hidden
									/>
									<p className='fst-italic'>- {autor}</p>
								</div>

								<div className='col-5 mb-3'>
									<input
										value={likes}
										onChange={(e) => setLikes(e.target.value)}
										type='number'
										className='form-control'
										hidden
									/>
								</div>

								<div className='text-primary mt-5 pt-2'>
									<small>
										#LaLoooooz #TresTirosEnLaRodilla #VolvieronLosMemes #UnionPersonal #Upcn #yLasParitarias? #VivaPeron 
										#QueVuelvaElHome #JuiraRodrigo #Allá #PiqueterosDuros #PeronismoMilitante
									</small>
								</div>

								<div className='mb-1 mt-3'>
									<small className='text-muted'>
										{today} <span className='text-primary'>Twitter for UP</span>
									</small>
								</div>
								<hr />
								<div className='d-flex justify-content-center'>
									<div>
										<button
											type='submit'
											className='btn btn-sm'
											onClick={() => setLikes(likes + 1)}
										>
											<HeartFill className='text-danger' />
											<span className='ms-1 text-muted'>{likes}</span>
										</button>
									</div>
									<div>
										<button className='btn btn-sm text-muted' onClick={() => share()}>
											<Share />
										</button>
									</div>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
			<Footer />
		</div>
	);
};

export default ViewFraseComponent;
