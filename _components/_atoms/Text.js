import React from 'react';
import { Text } from "@chakra-ui/react";
import styled from "styled-components";

export function HeadingBig(props) {
	return (
		<Text
		fontSize="2xl"
		>
			{props.children}
		</Text>
	)
}