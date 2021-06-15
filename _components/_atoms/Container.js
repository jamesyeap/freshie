import React from 'react';
import styled from 'styled-components/native';

const SafeAreaView = styled.SafeAreaView``;

export function Container(props) {
	return (
		<SafeAreaView>
			{props.children}
		</SafeAreaView>
	)
}