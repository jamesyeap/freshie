import React, { useRef } from 'react';
import { SemiBoldText } from '../../_atoms/Text';
import LottieView from 'lottie-react-native';

export default function EmptyComponent(props) {
	const LottieRef = useRef(null)

	return (
		<>
		<LottieView
			 ref={LottieRef}
			 style={{
				width: 200,
				height: 200,
				marginBottom: 20,
			 }}
			source={require('../../../assets/11192-empty.json')}
			autoPlay
			loop
		/>

		<SemiBoldText style={{ fontSize: 16 }}>
			You haven't eaten anything yet!
		</SemiBoldText>
		</>
	)
}