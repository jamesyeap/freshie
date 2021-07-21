import React, { useState } from 'react';
import { View, StyleSheet, Dimensions, Text, TouchableOpacity } from 'react-native';
import styled from 'styled-components';
import { RegularText, SemiBoldText } from '../_atoms/Text';
import { MenuItem } from './MenuItem';
import { IconButton } from '../_atoms/Button';
import LottieView from 'lottie-react-native';

const MediumComponentContainer = styled.TouchableOpacity`
	flexDirection: row;
	width: 330px;
	height: 120px;
	borderRadius: 10px;
	borderWidth: 1px;
	backgroundColor: ${props => props.isOpen ? "#C2F1FB" : "#FFFFFF"};
	borderColor: #E6F2FC;
	alignItems: center;
`;

const RestaurantTextContainer = styled.View`
	flexDirection: column;
	alignItems: flex-start;
	marginLeft: 20px;
	flex: 0.8;
`;

const RestaurantNameText = styled(SemiBoldText)`
	fontSize: 24px;
	lineHeight: 32px;
`;

const AddressText = styled(RegularText)`
	fontSize: 14px;
	lineHeight: 20px;
`; 

const FoodItemListContainer = styled.View`
	flexDirection: column;
`;

const Wrapper = styled.View`
	alignItems: center;
	justifyContent: flex-start;
	width: 390px
`;

const SmallButtonContainer = styled.TouchableOpacity`
	flexDirection: row;
	justifyContent: center;
	alignItems: center;
	backgroundColor: ${props => props.isSelected ? "#1e5d5c" : "#319795"};
	height: 32px;
	borderRadius: 6px;
	padding: 5px;
	margin: 10px;
`;

export const SmallButtonText = styled(SemiBoldText)`
	fontSize: 12px;
	lineHeight: 20px;
	color: #FFFFFF;
`;

const { width, height } = Dimensions.get('window')

export const SmallButton = ({label, state, onPress, isSelected, buttonStyle,...props}) => {
	return (<SmallButtonContainer margin={props.margin} state={state} onPress={onPress} isSelected={isSelected} style={buttonStyle} >
			<SmallButtonText>{label}</SmallButtonText>
		</SmallButtonContainer>);
}

const EmptyScreen = (props) => {
	return (
		<View style={styles.animationContainer}>
			<LottieView 
				source={require('../../assets/11192-empty.json')} 
				autoPlay 
				loop
				style={{ height: 0.4 * width, width: 0.4 * width }}
			/>

			<Text style={styles.animationText}>Seems there's nothing here</Text>
			<TouchableOpacity style={styles.addButtonContainer} onPress={() => props.addItem()}>
				<Text style={styles.addButtonText}>Add a Menu Item!</Text>
			</TouchableOpacity>
		</View>
)}

export const Restaurant = ({ id, name, address, menuItems, index, animate, addItem, indexToggle, location, setVisible, ...props }) => {
	const [expand, setExpand] = useState(false)
	
	return (
		<Wrapper>
			<MediumComponentContainer 
				style={{ marginBottom: 20, backgroundColor: expand ? "white" : "#FFFBEB" }}
				onPress={() => {
					animate(location, false)
				}}
			>
				<RestaurantTextContainer>
					<RestaurantNameText>{name}</RestaurantNameText>
					<AddressText>{address}</AddressText>
				</RestaurantTextContainer>	

				
				<View style={styles.buttonContainer}>
						<IconButton 
							iconSize={30}
							iconColor="green"
							iconName="create"
							onPress={() => addItem()}
						/>
					
					<IconButton iconSize={30} 
								iconColor="black" 
								iconName={expand ? "caret-up-circle-outline" : "caret-down-circle-outline"}
								onPress={() => { 
									indexToggle()
									setExpand(!expand)
					}}/>
				</View>
			</MediumComponentContainer>

				<FoodItemListContainer>
					{
						menuItems.length > 0 
							? menuItems.map(e => <MenuItem key={e.id.toString()} margin={0} navigation={props.navigation} itemDetails={e} handlePressMenuItem={props.handlePressMenuItem} />)
							: <EmptyScreen addItem={addItem} />
					}
				</FoodItemListContainer>
		</Wrapper>
	)
}

const styles = StyleSheet.create({
	buttonContainer: {
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		flex: 0.2,
		marginRight: 20
	},
	animationContainer: {
		height: 0.65 * width,
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center'
	},
	animationText: {
		fontFamily: 'Inter_500Medium',	
		fontSize: 18,
		width: width * 0.7,
		alignItems: 'center',
		justifyContent: 'center',
		textAlign: 'center',
		marginTop: 10
	},
	addButtonText: {
		fontFamily: 'Inter_500Medium',	
		fontSize: 18,
		width: width * 0.7,
		alignItems: 'center',
		justifyContent: 'center',
		textAlign: 'center'
	},
	addButtonContainer: {
		marginTop: 20,
		alignItems:'center',
		justifyContent: 'center',
		backgroundColor: '#A7F3D0',
		borderRadius: 10,
		padding: 10,
		width: 0.5 * width
	}
})

