import { AsyncStorage } from 'react-native';
import * as dateMethods from './dateMethods'


// example expenses object 
/*
    listOfExpenses = {
        2017: {
            01: {
                budget: 500,
                expenses: [
                    {
                        amount: '4',
                        category: 'Coffee',
                        date: 'Jan 12, 2017',
                        description: 'Latte @ Coffeeshop'
                    },{
                        amount: '1.50',
                        category: 'Books',
                        date: 'Jan 17, 2017',
                        description: 'Sunday Newspaper'
                    }
                ]
            }
        }
    }
*/
export const getAsyncStorage = async () => {
    const response = await AsyncStorage.getItem('expenses')
    const parsedData = JSON.parse(response) || {}

    return parsedData;
}

export const setAsyncStorage = expenses => {
    return AsyncStorage.setItem('expenses', JSON.stringify(expenses))
}

export const checkCurrentMonthBudget = async () => {
    const month = dateMethods.getMonth();
    const year  = dateMethods.getYear();

    const response = await getAsyncStorage();


}