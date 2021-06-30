import React, { useState } from 'react';
import styled from 'styled-components';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { View, TouchableOpacity, Image } from 'react-native';
import { HeaderMediumText } from '../../_atoms/Text';
import { Container } from '../../_atoms/Container';

/* Insert Components To Preview Here  */
// import { Info } from '../../_molecules/Info';
// import { CalorieTracker } from '../../_organisms/CalorieTracker';
// import { InfoPanel } from '../../_organisms/InfoPanel';
// import { FoodItem } from '../../_molecules/FoodItem';
// import { MealPlan } from '../../_molecules/MealPlan';
// import { TrainerMealsSection } from '../../_organisms/TrainerMealsSection';
// import { CustomMealsSection } from '../../_organisms/CustomMealsSection';
// import { ClientItem } from '../../_molecules/ClientItem';
// import { ClientsDashboardSection } from '../../_organisms/_TrainerOrganisms/ClientsDashboardSection';
import { ReferralCode } from '../../_molecules/ReferralCode';

const infoOne = {
	label: "Height",
	value: 40,
	unit: "cm"
}

export default function PrototypePage(props) {
	const [personalTrainerCert, setPersonalTrainerCert] = useState(null)
	const onImageUpload = personalTrainerCert => {
		console.log("changed state")
		setPersonalTrainerCert(personalTrainerCert)
		setTimeout(() => {return}, 1000);
	  }
	const onImagePicker = async () => {
		let perms = await ImagePicker.getMediaLibraryPermissionsAsync()
		if (perms.accessPrivileges === "none") {
			perms = await ImagePicker.requestMediaLibraryPermissionsAsync()
			if (perms.accessPrivileges === "none") {
			alert("Please go to settings and allow freshie to access your photos!")
			}
		} else {
			let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.All,
			allowsEditing: true,
			aspect: [4, 4],
			quality: 1,
			});

			console.log(result);

			if (!result.cancelled) {
			onImageUpload(result.uri);
			}
		}
	}
    const iconPlaceholder = () => <Ionicons name="cloud-upload-outline" size={24}></Ionicons>
    const imageUploaded = () => {
      return (
        <Image resizeMode="contain" style= {{width:"100%", height: "100%"}} source= {{uri: personalTrainerCert}} defaultSource={require("../../../assets/no-image-placeholder.jpeg")}></Image>
      )
    }
    const imagePlaceholder = personalTrainerCert === undefined ? iconPlaceholder() : imageUploaded()
	return (
		<Container>
          <TouchableOpacity onPress={() => onImagePicker()} style={{flex: 0.35, flexDirection: 'row', justifyContent:'center', alignItems: 'center', borderStyle: 'dashed', borderWidth: 1, borderColor: "#505050", width: "50%", height: "100%"}}>
            {imagePlaceholder}
          </TouchableOpacity>
        </Container>
	)
}
