import {
    MD3LightTheme as DefaultTheme
}
    from "react-native-paper";
import { CONSTANTS } from "../../constants";
export const PaperTheme = {
    ...DefaultTheme,
    colors : {
        ...DefaultTheme.colors,
        primary : CONSTANTS.COLORS.Primary
    }
}