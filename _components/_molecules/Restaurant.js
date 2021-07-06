import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { MediumComponentContainer as ParentContainer } from '../_atoms/Container';
import { RegularText, MediumText, SemiBoldText } from '../_atoms/Text';
import { Info } from './Info';
import { Divider, IconButton } from 'react-native-paper';
import Collapsible from 'react-native-collapsible';
import { MenuItem } from './MenuItem';
import { SmallButton } from '../_atoms/Button';
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
	alignSelf: center
	justifyContent: center
`;
// alignItems: center;
	// justifyContent: center;
	// marginTop: 12.5px;
	// marginBottom: ${props => props.isOpen ? 0 : "2px"};
const RestaurantTextContainer = styled.View`
	flexDirection: column;
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
	justifyContent: center;
	width: 390px
`;

export const Restaurant = ({ id, name, menuItems, index, indexToggle, setVisible, ...props }) => {
	const [expand, setExpand] = useState(false)

	// useEffect(() => setExpand(open), [])

	return (
		<Wrapper>
			<MediumComponentContainer style= {{marginBottom: expand ? 30 : 0 }}
					onPress={() => {
						indexToggle()
						setExpand(!expand)
						console.log(expand)
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

				<Divider style={{ width: 1, height: 70}} />

				<InfoContainer>
					<CalorieText>{`picture here maybe`}</CalorieText>
				</InfoContainer>
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

