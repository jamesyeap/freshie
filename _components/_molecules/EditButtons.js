import React from 'react'
import { View } from 'react-native'
import { EditButton } from '../_atoms/Button'

export const EditButtonGroup = () => {
    return (
        <View style={{flexDirection: 'row', justifyContent:'center', alignItems: 'center', width:320, height: 100}}>
            <EditButton color= "#E53E3E" margin= "14px" label="Delete"></EditButton>
            <EditButton color= "#F6C243" margin= "14px" label="Copy"></EditButton>
            <EditButton color= "#319795" margin= "14px" label= "Edit"></EditButton>
        </View>
    )
}