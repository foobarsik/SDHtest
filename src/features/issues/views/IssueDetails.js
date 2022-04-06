import {View, StyleSheet} from "react-native";

import {Span} from "src/components/StyledText";

export default ({issue}) => {
    return (
        <View style={styles.container}>
            <Span style={styles.title}>{issue.title}</Span>
            <Span style={[styles.state, issue.state === 'open' && {color: 'green'}]}>{issue.state}</Span>
            <Span>{issue.body}</Span>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 15,
        backgroundColor: 'rgb(251, 251, 251)',
    },
    title: {
        marginBottom: 10,
        paddingBottom: 5,
        fontSize: 20
    },
    state: {
        marginBottom: 10,
        fontWeight: '600',
        textTransform: 'uppercase',
        color: 'grey'
    }
});
