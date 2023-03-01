import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import Footer from './footer';

//Icons
import {
	Balloon,
	PlusCircle,
	Search,
	HeartFill,
	Eye,
	Share,
	Pencil,
	Trash,
} from 'react-bootstrap-icons';

const URI = 'https://bitacora-up-api.onrender.com/frases/';

const ShowFrasesComponent = () => {
	const [frases, setFrase] = useState([]);
	const [tableFrases, setTableFrases] = useState([]);
	const [columns, setColumns] = useState([]);
	const [pending, setPending] = useState([]);
	const [search, setSearch] = useState('');

	//Procedimiento para filtrar resultados
	const handleChange = (e) => {
		setSearch(e.target.value);
		filterSearch(e.target.value);
	};

	const filterSearch = (searchValue) => {
		const searchRes = tableFrases.filter((element) => {
			if (
				element.frase
					.toString()
					.toLowerCase()
					.includes(searchValue.toLowerCase()) ||
				element.autor
					.toString()
					.toLowerCase()
					.includes(searchValue.toLowerCase())
			) {
				return element;
			}
		});
		setFrase(searchRes);
	};

	useEffect(() => {
		getFrases();
		const timeout = setTimeout(() => {
			setColumns([
				{
					name: '#',
					selector: (row) => row.id,
					sortable: true,
				},
				{
					name: 'Frase',
					selector: (row) => row.frase.toUpperCase(),
					grow: 8,
				},
				{
					name: 'Autor',
					selector: (row) => row.autor.toUpperCase(),
					sortable: true,
					grow: 2,
				},
				{
					name: 'Likes',
					selector: (row) => (
						<button className='d-flex btn btn-sm btn-outline-light mt-1 disabled'>
							<div>
								<HeartFill className='text-danger me-1' />
							</div>
							<div className='text-muted'>{row.likes}</div>
						</button>
					),
					sortable: true,
				},

				{
					name: 'Acciones',
					selector: (row) => (
						<div className='d-flex'>
							<div>
								<Link to={`/id/${row.id}`} className='btn text-muted'>
									<Eye />
								</Link>
							</div>
							<div>
								<button className='btn text-muted' onClick={() => share(row.id)}>
									<Share />
								</button>
							</div>

							<div>
								<Link className='btn text-muted' to={`/edit/${row.id}`}>
									<Pencil />
								</Link>
							</div>
							{/**  
							<div>
								<button className='btn text-muted' onClick={() => deleteFrase(row.id)}>
									<Trash />
								</button>
							</div>
							*/}
						</div>
					),
					grow: 2,
				},
			]);
			setPending(false);
		}, 2000);
		return () => clearTimeout(timeout);
	}, []);

	const paginationOptions = {
		rowsPerPageText: 'Filas por página',
		rangeSeparatorText: 'de',
		selectAllRowsItem: true,
		selectAllRowsItemText: 'Todos',
	};

	//procedimineto para mostrar todas las frases
	const getFrases = async () => {
		const res = await axios.get(URI);
		setFrase(res.data);
		setTableFrases(res.data);
	};

	//Variable que devuelve un ID random
	const idRandom = Math.floor(Math.random() * frases.length);

	//procedimiento para eliminar una frase
	const deleteFrase = async (id) => {
		await axios.delete(`${URI}${id}`);
		getFrases();
	};

	//procedimiento para compartir frase
	const share = (id) => {
		window.open(
			`https://api.whatsapp.com/send?text=¡Agregamos%20una%20nueva%20frase%20a%20la%20Bitácora!%20${window.location.href}id/${id}`
		);
	};
	return (
		<div className='container'>
			<div className='card shadow-lg p-2 p-sm-3'>
				<div className='mt-5'>
					<img
						src='https://i.ibb.co/4dnHTpF/logoup.jpg'
						className='col-6 col-sm-4 col-md-2 rounded-circle img-thumbnail mx-auto d-block shadow'
						alt='logo'
					/>
				</div>

				<div className='d-flex justify-content-center mt-5'>
					<Link to={`/id/${idRandom}`} variant='danger' className='btn btn-danger shadow-lg'>
						<small>¡Click para ver una frase random!</small>
						<span className='ms-2'>
							<Balloon />
						</span>
					</Link>
				</div>
				<div className='row'>
					<div className='col'>
						<div className='d-flex justify-content-end mt-4 pe-sm-4'>
							<Link to='/create' className='btn btn-success shadow'>
								<span className='me-1'>
									<PlusCircle />
								</span>
								<small> Agregar nuevo </small>
							</Link>
						</div>

						<div className='d-flex justify-content-end mt-4 pe-sm-4'>
							<div className='col-6 col-sm-3'>
								<div className='input-group input-group-sm'>
									<input
										id='search'
										type='text'
										value={search.toUpperCase()}
										placeholder='Buscar...'
										aria-label='Search Input'
										className='form-control'
										onChange={handleChange}
									/>
									<span className='input-group-text' id='basic-addon1'>
										<Search />
									</span>
								</div>
							</div>
						</div>

						<div className='mt-2'>
							<DataTable
								columns={columns}
								data={frases}
								progressPending={pending}
								pagination
								paginationComponentOptions={paginationOptions}
								noDataComponent={<span>Esto puede tardar más de lo esperado.. Si la información no aparece, recarga el navegador &#129299</span>}
							/>
						</div>
					</div>
				</div>
			</div>
			<Footer />
		</div>
	);
};

export default ShowFrasesComponent;
