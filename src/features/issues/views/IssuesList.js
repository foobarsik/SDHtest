import {FlatList, View, StyleSheet, Pressable, ActivityIndicator} from "react-native";
import React, {useEffect, useState} from "react";
import Moment from "moment";

import {Span} from "src/components/StyledText";
import {GetIssues} from "src/services/githubService";
import SearchField from "./issuesSearch";

export default ({navigation}) => {
    const [page, setPage] = useState(1);
    const [issues, setIssues] = useState([]);
    const [filteredIssues, setFilteredIssues] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isMore, setIsMore] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        loadIssues()
    }, []);

    let loadIssues = () => {
        if (searchQuery || isLoading || !isMore) return;
        GetIssues(page)
            .then((nextIssues) => {
                if (nextIssues.length > 0) {
                    setIssues([...issues, ...nextIssues]);
                    setFilteredIssues([...issues, ...nextIssues]);
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
        return (!searchQuery &&
            <View style={styles.footer}>
                <ActivityIndicator size="large" color="#5500dc"/>
                {!isMore && <Span>No data to fetch</Span>}
            </View>)
    }

    const handleSearch = (text) => {
        if (text) {
            const filteredData = issues.filter((item) => {
                return compare(item, text);
            });
            setFilteredIssues(filteredData);
        } else {
            setFilteredIssues(issues);
        }
        setSearchQuery(text);
    };

    const compare = (item, text) => {
        const title = item.title.toUpperCase();
        const searchQuery = text.toUpperCase();
        return title.indexOf(searchQuery) > -1;
    }

    return (
        <View>
            <SearchField query={searchQuery} handleSearch={handleSearch}/>

            <FlatList data={filteredIssues} style={{marginBottom: 80}}
                      ListFooterComponent={listFooter}
                      keyExtractor={(item, index) => String(index)}
                      renderItem={issueDetails}
                      refreshing={false}
                      onEndReached={loadIssues}
                      onEndThreshold={0}/>

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
