import {TextInput, View} from "react-native";
import React from "react";

export default ({query, handleSearch}) => {
    return (
        <View
            style={{
                backgroundColor: '#fff',
                padding: 10,
                margin: 15,
                borderRadius: 20
            }}
        >
            <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                clearButtonMode="always"
                value={query}
                onChangeText={queryText => handleSearch(queryText)}
                placeholder="Search"
                style={{backgroundColor: '#fff', paddingHorizontal: 20}}
            />
        </View>
    );
}
