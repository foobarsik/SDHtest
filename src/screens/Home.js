import {StyleSheet, View} from "react-native";
import React from "react";
import {IssuesList} from 'src/features/issues/views/IssuesList';

export default function Home() {
    return (
        <View style={styles.container}>
            <IssuesList/>
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
