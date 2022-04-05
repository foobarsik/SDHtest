import React from 'react';
import { useColorScheme } from 'react-native';
import {NavigationContainer, DefaultTheme, DarkTheme} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import IssuesList from 'src/features/issues/views/IssuesList';
import IssueView from "src/features/issues/views/IssueView";

const Stack = createNativeStackNavigator();

function RootNavigator() {
    const scheme = useColorScheme();
    return (
        <NavigationContainer theme={scheme === 'dark' ? DarkTheme : DefaultTheme}>
            <Stack.Navigator>
                <Stack.Screen name="IssuesList" component={IssuesList} options={{ title: 'Issues List' }}/>
                <Stack.Screen name="IssueView" component={IssueView} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default RootNavigator;
