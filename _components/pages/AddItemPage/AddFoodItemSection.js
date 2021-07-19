import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { ScrollView, StyleSheet, Alert, TouchableOpacity, Dimensions, Animated, FlatList } from 'react-native'
import { BrandHeaderText, SemiBoldText, MediumText } from '../../_atoms/Text'
import { Container } from '../../_atoms/Container'
import { View } from 'react-native-ui-lib'
import { Avatar } from 'react-native-elements'
import { TextInput } from '../../_molecules/TextInput'
import { IconButton, SmallButton } from '../../_atoms/Button'
import { NavigationHeader } from '../../_molecules/NavigationHeader'
import { useDispatch } from 'react-redux'
import { addRecipe_API, editRecipe_API, deleteRecipe_API } from '../../../_redux/actions/Recipes.actions';
import { serializeIngredients } from '../../../_utilities/_helperFunctions/serializeIngredients'
import { parseIngredients } from '../../../_utilities/_helperFunctions/parseIngredients'

/* This page is used for 
    - ADDING a NEW RECIPE 
    - EDITING an EXISTING RECIPE

    NOTE: The "id" attribute in the "itemDetails" object is used by the "EditButtonGroup" to determine which action to call.
        -> if the "id" attribute is "null", then it is assumed that the user is ADDING a NEW RECIPE
        -> else, then it is assumed that the user is EDITING an EXISTING RECIPE
*/

const { width, height } = Dimensions.get('window')

export const InputLabelText = styled(MediumText)`
	fontSize: 16px;
	lineHeight: 24px;
	color: #2D3748;
    margin: 10px;
`;

export function Header({ scrolling }) {
	const translation = scrolling.interpolate({
		inputRange: [-width, 0, width],
		outputRange: [-130, 0, -130],
		extrapolate: 'clamp',
	  })

	 const opacity = scrolling.interpolate({
		inputRange: [-width, 0, width],
		outputRange: [0, 1, 0],
		extrapolate: 'clamp',
	 })

	return (
		<>
		<Animated.View
			style={{
				...styles.header,
				transform: [
					{ translateY: translation }
				]
			}}
			opacity={opacity}
		>	
			<View style={styles.headerText}>
				<SemiBoldText style={{ fontSize: 20 }}>Something new?</SemiBoldText>
			</View>
		</Animated.View>
	</>
	)
}



export default function AddFoodItemSection (props) {
    const [title, setTitle] = useState("")
    const [calories, setCalories] = useState("")
    const [ingredients, setIngredients] = useState("")
    const [instructions, setInstructions] = useState("")
    const [id, setId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [image, setImage] = useState(require('../../../assets/signuppageicon.png'))

    const [localIngredients, setLocalIngredients] = useState([])

    const dispatch = useDispatch()

    // if the user is editing an existing recipe, pre-fill the fields in the form with the information of the existing recipe
    const preload = () => {
        if (props.route.params.itemDetails) {
            /* NOTE: If a user is in this page to EDIT an EXISTING RECIPE, the "id" field of "itemDetails" is a number, and WILL NOT BE NULL. */ 
            setTitle(props.route.params.itemDetails.title);
            setCalories(String(props.route.params.itemDetails.calories));
            setIngredients(props.route.params.itemDetails.ingredients);
            setInstructions(props.route.params.itemDetails.instructions);
            setId(props.route.params.itemDetails.id);
            setLoading(false)
        } else {
            /* NOTE: If a user is in this page to ADD a NEW RECIPE, the "id" field of "itemDetails" is null */ 
            setLoading(false)
        }
    }
    
    useEffect(preload, [])
    useEffect(() => {
        setLocalIngredients(parseIngredients(ingredients))
    }, [ingredients])

    const [newIngredientTitle, setNewIngredientTitle] = useState("")
    const [newIngredientWeight, setNewIngredientWeight] = useState("")

    const alertLeave = async () => Alert.alert(
        "Are you sure you want to leave without saving?",
        "",
        [
          {
            text: "Confirm",
            onPress: () => props.navigation.goBack(),
            style: "default",
          }, 
          {
            text: "Cancel",
            style: "cancel"
          }
        ]
      );

    const handleSave = async () => {
        if (id) {
            const values = {
                data: {
                    title,
                    calories,
                    ingredients,
                    instructions
                }, 
                foodItemID: id
            }
            dispatch(editRecipe_API(values))
            props.navigation.goBack()
        } else {
            const status = dispatch(addRecipe_API({ 
                title, 
                calories: Number(calories),
                ingredients, 
                instructions, 
                custom: true 
            }))

            if (status) {
                props.navigation.goBack()
            } 
        }
    }

    const handleDelete = () => {
        if (id) {
            dispatch(deleteRecipe_API(Number(id)));
            props.navigation.goBack()
        } else {
            return alertLeave()
        }
    };

    const handleAddNewLocalIngredient = (title, weight) => {
        const serializedNewIngredient = serializeIngredients([{
            title: title,
            weight: weight,
        }])
        setIngredients(ingredients + serializedNewIngredient)
        setNewIngredientTitle("")
        setNewIngredientWeight("")
    }

    const handleDeleteLocalIngredient = (localIngredientID) => {
        const newState = localIngredients.filter(elem => elem.id !== localIngredientID)
        setLocalIngredients(newState)
        setIngredients(serializeIngredients(newState))
    }

    const AddIngredientItem = (
            <View style={styles.addIngredientItemContainer}>
                <TextInput 
                    value={newIngredientTitle} 
                    onChangeText={setNewIngredientTitle} 
                    placeholder="Bread"
                    inputStyle={styles.newIngredientTitleInput}
                />
                <TextInput 
                    value={newIngredientWeight} 
                    onChangeText={setNewIngredientWeight} 
                    placeholder="200g"
                    inputStyle={styles.newIngredientWeightInput}
                />
                <SmallButton 
                    label="Add" 
                    onPress={() => handleAddNewLocalIngredient(newIngredientTitle, newIngredientWeight)} 
                    buttonStyle={styles.newIngredientAddButton}
                />
            </View>
    )

    const IngredientItem = (props) => (
        <View style={styles.ingredientContainer}>
            <MediumText style={styles.ingredientTitleText}>{props.title}</MediumText>
            <MediumText style={styles.ingredientWeightText}>{props.weight}</MediumText>
            <IconButton 
                iconName="trash" 
                iconSize={18}
                iconColor="#F87171"
                onPress={() => handleDeleteLocalIngredient(props.id)}
                />
        </View>
    )

    if (loading) {
        return (<BrandHeaderText>Loading</BrandHeaderText>)
    } else {
        return (
            <ScrollView contentContainerStyle={ styles.container }>
                <TouchableOpacity onPress={() => Alert.alert("Feature in progress! :P")} style={{ marginTop: 30, borderWidth:0 ,flex: 0.4, flexDirection: 'row', justifyContent: 'center'}}>
                    <Avatar containerStyle={{height: 200, width: 200}} rounded source={image}/>
                </TouchableOpacity>
                <View>
                    <TextInput label="Name" stacked="20px" placeholder={title} onChangeText={val => setTitle(val)} value={title}/>
                    <TextInput label="Calories" stacked="10px" placeholder={String(calories)} onChangeText={setCalories} value={calories} keyboardType="numeric" />

                    <InputLabelText>Ingredients</InputLabelText>
                    {AddIngredientItem}
                    { 
                        localIngredients.map(({ title, weight, id }, index) => 
                            <IngredientItem 
                                key={id}
                                id={id}
                                title={title}
                                weight={weight}
                            />
                            )
                    }
                    <TextInput multiline={true} label="Instructions" placeholder={instructions} onChangeText={val => setInstructions(val)} value={instructions}/>
                </View>
                
                <View style={{position: 'fixed', bottom: 0, left: 0, flexDirection: 'row', justifyContent: 'space-between' , alignItems: 'center', width:320}}>
                    <IconButton buttonStyle={styles.button} iconSize={19} buttonColor="#E53E3E" iconName= "trash" onPress={handleDelete} ></IconButton>
                    <IconButton buttonStyle={styles.button} iconSize={19} buttonColor="#319795" iconName= "save" onPress={handleSave} ></IconButton>
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height:"100%",
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: 80
    },
    button: {
        flex: 0.25,
        justifyContent: 'space-evenly',
        flexDirection: 'row',
        height: 30,
    },
    header: {
		position: 'absolute',
		flexDirection: 'column',
		justifyContent: 'flex-end',
		top: 0,
		left: 0,
		right: 0,
		height: 100,
		backgroundColor: "#FDE68A",
		padding: 15,
		zIndex: 1000,
	}, 
	headerText: {
		flexDirection: "column",
		paddingLeft: 20
	},
    ingredientContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: "#A7F3D0",
        padding: 10, 
        margin: 5,
        borderRadius: 5
    },
    ingredientTitleText: {
        marginLeft: 25,
    },
    ingredientWeightText: {
        marginRight: 25
    },
    addIngredientItemContainer: {
        flexDirection: 'row',
        width: width * 0.8,
        alignItems: 'center',
        justifyContent: 'center',
        width: 0.9 * width
    },
    newIngredientTitleInput: {
        width: width * 0.4
    }, 
    newIngredientWeightInput: {
        width: width * 0.2
    }, 
    newIngredientAddButton: {
        width: width * 0.2
    }
})