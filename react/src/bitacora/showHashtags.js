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
		console.log(res.data);
	};

	return (
		<div>
			<small>
				{hashtags.map((item) => (
					<div key={item.id}>{item.hashtag}</div>
				))}
			</small>
		</div>
	);
};

export default ShowHashtagComponent;
