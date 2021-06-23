import React from 'react'
import { BrandHeaderText, MediumText } from '../_atoms/Text'
import { View } from 'react-native'
import { useProps } from '@chakra-ui/react'

export const Description = (props) => {
    return (
        <View style= {props.style}>
            <BrandHeaderText>{props.title}</BrandHeaderText>
            <MediumText style={{marginTop: 10, fontSize: 15}}>{props.text}</MediumText>
        </View>
    )
}