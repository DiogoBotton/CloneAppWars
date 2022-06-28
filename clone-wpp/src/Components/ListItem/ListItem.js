import { View, Text, TouchableOpacity } from 'react-native'
import React, { useContext } from 'react'
import { useNavigation } from '@react-navigation/native'
import { Grid, Col, Row } from "react-native-easy-grid";
import GlobalContext from '../../Context/Context';
import Avatar from "../Avatar/Avatar";

export default function ListItem({
    type,
    description,
    user,
    time,
    room,
    image,
    style
}) {
    const { theme: { colors } } = useContext(GlobalContext);
    const navigation = useNavigation();

    return (
        <TouchableOpacity
            onPress={() => navigation.navigate("chat", { user, room, image })}
            style={{
                height: 80,
                ...style
            }}>
            <Grid style={{
                maxHeight: 80
            }}>
                <Col style={{
                    width: 80,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <Avatar user={user.userDoc ? user.userDoc : user} size={type == "contacts" ? 65 : 70} />
                </Col>
                <Col style={{ marginLeft: 10 }}>
                    <Row style={{ alignItems: "center" }}>
                        <Col>
                            <Text
                                style={{ fontWeight: "bold", fontSize: 16, color: colors.text }}
                            >
                                {user.contactName || user.contact.contactName || user.userDoc.displayName}
                            </Text>
                        </Col>
                        {time && (
                            <Col style={{ alignItems: "flex-end" }}>
                                <Text style={{ color: colors.secondaryText, fontSize: 11 }}>
                                    {new Date(time.seconds * 1000).toLocaleDateString()}
                                </Text>
                            </Col>
                        )}
                    </Row>
                    {description && (
                        <Row style={{ marginTop: -5 }}>
                            <Text style={{ color: colors.secondaryText, fontSize: 13 }}>
                                {description}
                            </Text>
                        </Row>
                    )}
                </Col>
            </Grid>
        </TouchableOpacity>
    )
}