import React from 'react'
import Moment from 'moment';
import {Text, View, ActivityIndicator, FlatList, StyleSheet} from "react-native";

import {useGetIssuesQuery} from 'src/features/api/apiSlice'
import {Span} from "src/components/StyledText";

let issueDetails = ({item}) => (
    <View key={item.key} style={styles.item}>
        <Span style={styles.title}>{item.title}</Span>
        <Span>#{item.number} opened {Moment(item.created_at).format('D MMM Y H:mm')} </Span>
        <Span>by {item.user.login}</Span>
    </View>
);

let renderIssues = (issues) => {
    return (
        <View>
            <FlatList
                data={issues}
                renderItem={issueDetails}
            />
        </View>
    )
}

export const IssuesList = () => {
    const {
        data: issues,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetIssuesQuery()

    let content

    if (isLoading) {
        content = <ActivityIndicator size="large"/>
    } else if (isSuccess) {
        content = renderIssues(issues)
    } else if (isError) {
        console.log(error);
        content = <Text>{error.toString()}</Text>
    }

    return (
        <View>{content}</View>
    )
}

const styles = StyleSheet.create({
    item: {
        marginLeft: 15,
        marginRight: 15,
        paddingTop: 10,
        paddingBottom: 10,
        borderBottomColor: '#999',
        borderBottomWidth: 1
    },

    title: {
        paddingBottom: 5,
        fontSize: 20
    }
});
