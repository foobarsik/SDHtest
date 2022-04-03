import {StyleSheet, View} from "react-native";
import {Span} from "../components/StyledText";
import {StatusBar} from "expo-status-bar";
import React from "react";

export default function Home() {
    return (
        <View style={styles.container}>
            <Span>Home</Span>
            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    }
});
