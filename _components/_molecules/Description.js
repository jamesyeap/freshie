import React from 'react'
import { BrandHeaderText, MediumText } from '../_atoms/Text'
import { View } from 'react-native'

export const Description = (props) => {
    return (
        <View style= {props.style}>
            <BrandHeaderText>{props.title}</BrandHeaderText>
            <MediumText style={{marginTop: 10, fontSize: 15}}>{props.text}</MediumText>
        </View>
    )
}