import { Canvas, useFrame } from '@react-three/fiber';
import React, { FC, useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { content } from '../util/shaderCode';

export const BGCanvas: FC = (props) => {
	const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

	return (
		<Canvas style={{ position: 'absolute' }} camera={camera}>
			<Box />
		</Canvas>
	);
};

const shader = new THREE.ShaderMaterial({
	uniforms: {
		iTime: { value: 5 },
		uColor: { value: new THREE.Color(0xffffff) },
		iResolution: { value: new THREE.Vector3(500, 500, 1) },
	},
	fragmentShader: `
        #include <common>
        uniform vec3 iResolution;
        uniform float iTime;
        
        ${content}
        
        void main() {
            mainImage(gl_FragColor, gl_FragCoord.xy);
        }
    `,
});

function Box(props: JSX.IntrinsicElements['mesh']) {
	const ref = useRef<THREE.Mesh>(null!);

	useEffect(() => {
		shader.uniforms.iResolution.value.set(
			window.innerWidth,
			window.innerHeight,
			1
		);
	}, []);

	useFrame(() => {
		shader.uniforms.iTime.value += 0.011;
	});

	return (
		<mesh {...props} ref={ref}>
			<planeBufferGeometry attach="geometry" args={[2, 2]} />
			<shaderMaterial attach="material" args={[shader as any]} />
		</mesh>
	);
}
