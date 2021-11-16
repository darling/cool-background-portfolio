import type { NextPage } from 'next';
import React from 'react';
import { BGCanvas } from '../components/Canvas';

const Home: NextPage = () => {
	return (
		<div
			style={{
				width: '100vw',
				height: '100vh',
				backgroundColor: 'lightsalmon',
			}}
		>
			<div
				style={{
					width: '100vw',
					height: '100vh',
					position: 'absolute',
					zIndex: 1,
				}}
			>
				<div style={{ padding: '2rem' }}>
					<img src="/img/unworthy.png" alt="" />
				</div>
			</div>
			<BGCanvas />
		</div>
	);
};

export default Home;
