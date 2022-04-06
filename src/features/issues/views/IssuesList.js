import {FlatList, View, StyleSheet, Pressable, ActivityIndicator} from "react-native";
import React, {useEffect, useState} from "react";
import Moment from "moment";

import {Span} from "src/components/StyledText";
import {GetIssues} from "src/services/githubService";

export default ({navigation}) => {
    const [page, setPage] = useState(1);
    const [issues, setIssues] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isMore, setIsMore] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        loadIssues()
    }, []);

    let loadIssues = () => {
        if (isLoading) return;
        GetIssues(page)
            .then((nextIssues) => {
                if (nextIssues.length > 0) {
                    setIssues([...issues, ...nextIssues]);
                    setPage(page + 1);
                } else {
                    setIsMore(false);
                }
            })
            .catch(error => setError(error))
            .finally(() => setIsLoading(false))
    }

    let issueDetails = ({item}) => (
        <Pressable style={styles.item} onPress={() => navigation.navigate('IssueView', {id: item.number})}>
            <Span style={styles.title}>{item.title}</Span>
            <Span>#{item.number} opened {Moment(item.created_at).format('D MMM Y H:mm')} </Span>
            <Span style={styles.login}>by {item.user.login}</Span>
        </Pressable>
    );

    let listFooter = () => {
        return (
            <View style={styles.footer}>
                <ActivityIndicator size="large" color="#5500dc"/>
                {!isMore && <Span>No data to fetch</Span>}
            </View>
        )
    }

    return (
        <View>
            <FlatList data={issues}
                      ListFooterComponent={listFooter}
                      keyExtractor={(item, index) => String(index)}
                      renderItem={issueDetails}
                      refreshing={false}
                      onEndReached={loadIssues}
                      onEndThreshold={0.5}/>

            {error && <Span>Sorry, error happened while fetching issues</Span>}
        </View>
    );
}

const styles = StyleSheet.create({
    item: {
        marginHorizontal: 15,
        paddingVertical: 10,
        borderBottomColor: '#999',
        borderBottomWidth: 1
    },
    title: {
        paddingBottom: 5,
        fontSize: 20
    },
    footer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});
