import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

//**Components */
import ShowFrasesComponent from './bitacora/showFrases';
import CreateFraseComponent from './bitacora/createFrase';
import EditFraseComponent from './bitacora/editFrase';
import ViewFraseComponent from './bitacora/viewFrase';
import EditHashtagComponent from './bitacora/editHashtags';

function App() {
	return (
		<div className='container'>
			<div className='mt-3 mb-5'>
				<BrowserRouter>
					<Routes>
						<Route path='/' element={<ShowFrasesComponent />} />
						<Route path='/create' element={<CreateFraseComponent />} />
						<Route path='/edit/:id' element={<EditFraseComponent />} />
						<Route path='/editht/:id' element={<EditHashtagComponent />} />
						<Route path='/id/:id' element={<ViewFraseComponent />} />
					</Routes>
				</BrowserRouter>
			</div>
		</div>
	);
}

export default App;
