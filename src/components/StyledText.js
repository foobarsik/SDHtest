import {Text} from "react-native";

export function Span(props) {
    return <Text {...props} style={[props.style, { fontFamily: 'space-mono'}]} />;
}
