import {StyleSheet, TextInput, View, ScrollView} from "react-native";
import {useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {KeyboardAvoidingView} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import {selectIssueById} from "../issuesSlice";
import IssueDetails from "./IssueDetails";
import {Span} from "../../../components/StyledText";

export default ({navigation, route}) => {
    const issueId = route.params.id;
    const issue = useSelector(state => selectIssueById(state, issueId));
    const [comment, setComment] = useState('')

    useEffect(() => {
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
