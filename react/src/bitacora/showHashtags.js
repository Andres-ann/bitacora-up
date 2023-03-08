import React, { useState, useEffect } from 'react';
import axios from 'axios';

const URI = 'https://bitacora-up-api.onrender.com/hashtags/';

const ShowHashtagComponent = () => {
	const [hashtags, setHashtags] = useState([]);

	useEffect(() => {
		getHashtag();
	}, []);

	//procedimineto para mostrar todos los hashtags
	const getHashtag = async () => {
		const res = await axios.get(URI);
		setHashtags(res.data);
	};

	return (
		<div>
			{hashtags.map((item) => (
				<div key={item.id}>
					<h1>afsdfsdf</h1>
					<h3>{item.hashtag}</h3>
				</div>
			))}
		</div>
	);
};

export default ShowHashtagComponent;
