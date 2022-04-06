import {StyleSheet, TextInput, View, ScrollView} from "react-native";
import {useEffect, useState} from "react";
import {KeyboardAvoidingView} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import IssueDetails from "./IssueDetails";
import {Span} from "src/components/StyledText";
import {GetIssue} from "src/services/githubService";

export default ({navigation, route}) => {
    const issueId = route.params.id;
    const [issue, setIssue] = useState();
    const [comment, setComment] = useState('')

    useEffect(() => {
        GetIssue(issueId).then((item) => {setIssue(item)});
        getComment().then((comment) => comment && setComment(comment));
        navigation.setOptions({
            title: `Issue #${issueId}`,
        })
    }, []);

    let getComment = async () => {
        return await AsyncStorage.getItem('issue' + issueId)
    };

    let saveComment = async (value) => {
        await AsyncStorage.setItem('issue' + issueId, value)
    }

    return (
        <KeyboardAvoidingView style={styles.container}>
            <ScrollView>
                {issue && <IssueDetails issue={issue}/>}
            </ScrollView>

            <View style={styles.commentContainer}>
                <Span>Your comment</Span>
                <TextInput
                    style={styles.commentField}
                    defaultValue={comment}
                    autoCorrect={false}
                    underlineColorAndroid="transparent"
                    clearButtonMode="always"
                    onChangeText={newComment => saveComment(newComment)}
                    placeholder='Comment will be saved automatically'
                />
            </View>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    commentContainer: {
        margin: 15,
    },
    commentField: {
        padding: 10,
        height: 40,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#999'
    },
});
