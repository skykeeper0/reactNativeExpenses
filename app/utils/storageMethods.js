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

// retreive the list of expenses
export const getAsyncStorage = async () => {
    const response = await AsyncStorage.getItem('expenses')
    const parsedData = JSON.parse(response) || {}

    return parsedData;
}

// save list of expenses into AsyncStorage
export const setAsyncStorage = expenses => {
    return AsyncStorage.setItem('expenses', JSON.stringify(expenses))
}

// check and return if there are a budget for that month
export const checkCurrentMonthBudget = async () => {
    const month = dateMethods.getMonth();
    const year  = dateMethods.getYear();

    const response = await getAsyncStorage();


}

/* accept a month and year as stringified numbers and a number as budget.
 Then create a month object and stores it in the right year in our list 
  of expense, save to AsyncStorage in the end
*/
export const saveMonthlyBudget = {

}

/* accept an expense object, month and year as stringified number. Then 
save the object to the month and year
*/
export const saveExpenseToMonth = {

}

/* Development method to erase the list when we need to
*/
export const resetAsyncStorage  = {

}

// Development method to log the object in AsyncStorage so we can view it
export const logAsyncStogae = {
    
}