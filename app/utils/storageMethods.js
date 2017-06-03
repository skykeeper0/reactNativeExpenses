import { AsyncStorage } from 'react-native';
import * as dateMethods from './dateMethods'

export const getAsyncStorage = async () => {
    let response = await AsyncStorage.getItem('expense');
    let parsedData = JSON.parse(response);

    return parsedData;
}