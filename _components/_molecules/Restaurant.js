import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { MediumComponentContainer as ParentContainer } from '../_atoms/Container';
import { RegularText, MediumText, SemiBoldText } from '../_atoms/Text';
import { Info } from './Info';
import { Divider } from 'react-native-paper';
import Collapsible from 'react-native-collapsible';
import { MenuItem } from './MenuItem';
import { IconButton } from '../_atoms/Button';
import { ButtonGroup } from './ButtonGroup';


const MediumComponentContainer = styled.TouchableOpacity`
	flexDirection: row;
	width: 330px;
	height: 120px;
	borderRadius: 10px;
	borderWidth: 1px;
	backgroundColor: ${props => props.isOpen ? "#C2F1FB" : "#FFFFFF"};
	borderColor: #E6F2FC;
	alignItems: center
`;
// alignItems: center;
	// justifyContent: center;
	// marginTop: 12.5px;
	// marginBottom: ${props => props.isOpen ? 0 : "2px"};
const RestaurantTextContainer = styled.View`
	flexDirection: column;
	alignItems: center
	borderWidth: 0px
	flex: 0.9
`;

const PreviewTextContainer = styled.View`
	flexDirection: column;
`;

const RestaurantNameText = styled(SemiBoldText)`
	fontSize: 24px;
	lineHeight: 32px;
`;

const PreviewText = styled(RegularText)`
	fontSize: 14px;
	lineHeight: 20px;
`;

const InfoContainer = styled.View`
	flexDirection: column;
	justifyContent: center;
	alignItems: center;
	height: 100%;
`;

const CalorieText = styled(RegularText)`
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

export const SmallButton = ({label, state, onPress, isSelected, buttonStyle,...props}) => {
	return (<SmallButtonContainer margin={props.margin} state={state} onPress={onPress} isSelected={isSelected} style={buttonStyle} >
			<SmallButtonText>{label}</SmallButtonText>
		</SmallButtonContainer>);
}

export const Restaurant = ({ id, name, menuItems, index, animate, indexToggle, location, setVisible, ...props }) => {
	const [expand, setExpand] = useState(false)
	
	return (
		<Wrapper>
			<MediumComponentContainer style= {{marginBottom: 20}}
					onPress={() => {
						animate(location)
					}
					}>
				<RestaurantTextContainer>
					<RestaurantNameText>{name}</RestaurantNameText>
					<PreviewTextContainer>
						{ 
							(menuItems.length <= 3)
								? menuItems.map(e => <PreviewText key= {e.id.toString()} >{e.name} </PreviewText>) 
								: menuItems.slice(0, 2).map(e => <PreviewText key= {e.id.toString()} >{e.name}</PreviewText>)
						}
					</PreviewTextContainer>
				</RestaurantTextContainer>	

				<Divider style={{ width: 2, height: 70}} />
				
				<SmallButton label={"Add item"}></SmallButton>
				
				<IconButton iconSize={24} 
							iconColor="black" 
							iconName= "list" 
							onPress={() => { 
								indexToggle()
								setExpand(!expand)
				}}/>
			</MediumComponentContainer>

			{/* <Collapsible collapsed={!expand}> */}
				<FoodItemListContainer>
					{
						menuItems.map(e => <MenuItem key={e.id.toString()} margin={0} navigation={props.navigation} itemDetails={e} />)
					}
				</FoodItemListContainer>
			{/* </Collapsible>  */}
		</Wrapper>
	)
}

