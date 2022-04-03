import React from 'react';
import {Provider} from 'react-redux';

import {store} from 'src/store';
import RootNavigator from 'src/navigation/RootNavigator';
import useCachedResources from "src/hooks/useCachedResources";

const App = () => {
    const isLoadingComplete = useCachedResources();

    if (!isLoadingComplete) {
        return null;
    } else {
        return (
            <Provider store={store}>
                <RootNavigator/>
            </Provider>
        );
    }
}

export default App;
