// get the month number and return stringified form
const monthNames = {
    1: 'January',
    2: 'February',
    3: 'March',
    4: 'April',
    5: 'May',
    6: 'June',
    7: 'July',
    8: 'August',
    9: 'September',
    10: 'October',
    11: 'November',
    12: 'December'
}

// get the current year and return stringified form
export const getYear = date => {
    date = date || new Date();
    return date.getFullYear().toString();
}

// get current month and return number
export const getMonth = date => {
    date = date || new Date();
    const zeroIndexedMonth = date.getMonth();
    return (zeroIndexedMonth + 1).toString();
}