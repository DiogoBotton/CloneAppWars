import { View, Text, Image } from 'react-native'
import React from 'react'

export default function Avatar({ size, user }) {
    return (
        <Image
            style={{
                width: size,
                height: size,
                borderRadius: size
            }}
            source={user && user.photoUrl ? { uri: user.photoUrl } : require('../../../assets/icon-square.png')}
            resizeMode="cover"
        />
    )
}