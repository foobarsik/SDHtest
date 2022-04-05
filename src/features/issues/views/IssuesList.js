import React, {useEffect, useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import {FlatList, View, StyleSheet, ActivityIndicator, Pressable} from "react-native";
import Moment from 'moment';

import {GetIssues} from "src/services/githubService";
import {Span} from "src/components/StyledText";
import {selectAllPosts} from "src/features/issues/issuesSlice";

export default ({navigation}) => {
    const dispatch = useDispatch();
    const [page, setPage] = useState(1)
    const {issues, isLoading, isSuccess, isMore, error} = useSelector(selectAllPosts);

    useEffect(() => {
        dispatch(GetIssues())
    }, []);

    let loadMore = () => {
        if (!isLoading && isMore) {
            setPage(page + 1)
            dispatch(GetIssues(page));
        }
    }

    let issueDetails = ({item}) => (
        <Pressable style={styles.item} onPress={() => navigation.navigate('IssueView', {id: item.number})}>
            <Span style={styles.title}>{item.title}</Span>
            <Span>#{item.number} opened {Moment(item.created_at).format('D MMM Y H:mm')} </Span>
            <Span style={styles.login}>by {item.user.login}</Span>
        </Pressable>
    );

    let content;

    if (isLoading) {
        content = <ActivityIndicator size="large"/>
    } else if (isSuccess) {
        content = <FlatList data={issues}
                            renderItem={issueDetails}
                            keyExtractor={(item, index) => String(index)}
                            refreshing={false}
                            onEndReached={loadMore}
                            onEndThreshold={0}/>
    } else if (error) {
        content = <Span>{'Sorry, error happened while fetching issues'}</Span>
    }

    return (
        <View>
            {content}
        </View>
    )
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
    }
});
