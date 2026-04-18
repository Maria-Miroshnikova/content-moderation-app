function getRegistrationDuration(dateString) {
    const registered = new Date(dateString);
    const now = new Date();

    let years = now.getFullYear() - registered.getFullYear();
    let months = now.getMonth() - registered.getMonth();
    let days = now.getDate() - registered.getDate();

    if (days < 0) {
        months -= 1;
        const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
        days += prevMonth.getDate();
    }

    if (months < 0) {
        years -= 1;
        months += 12;
    }

    return { years, months, days };
}

function getDateString({ years, months, days }) {
    let date = '';
    let arr_str = [];
    if (years > 0) {
        arr_str.push(years.toString())
        if ((years % 10) <= 1)
            arr_str.push("год")
        else if ((years % 10) <= 4)
            arr_str.push("года")
        else
            arr_str.push("лет")
    }

    if (months > 0) {
        arr_str.push(months.toString())
        if ((months % 10) <= 1)
            arr_str.push("месяц")
        else if ((months % 10) <= 4)
            arr_str.push("месяца")
        else
            arr_str.push("месяцев")
    }

    if (days > 0) {
        arr_str.push(days.toString())
        if ((days % 10) <= 1)
            arr_str.push("день")
        else if ((days % 10) <= 4)
            arr_str.push("дня")
        else
            arr_str.push("дней")
    }

    return arr_str.join(" ")

}

export function getFormattedDateString(date: string) {
    let duration_formatted = getRegistrationDuration(date)
    return getDateString(duration_formatted)
}