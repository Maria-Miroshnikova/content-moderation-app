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
        if (((years % 10) == 1) && ((years % 100) != 11))
            arr_str.push("год")
        else if ((((years % 10) <= 4)) && (((years % 10) > 0)) && (((years % 100) < 10) || ((years % 100) > 14)))
            arr_str.push("года")
        else
            arr_str.push("лет")
    }

    if (months > 0) {
        arr_str.push(months.toString())
        if (((months % 10) == 1) && ((months % 100) != 11))
            arr_str.push("месяц")
        else if (((months % 10) <= 4) && ((months % 10) > 0) && (((months % 100) < 10) || ((months % 100) > 14)))
            arr_str.push("месяца")
        else
            arr_str.push("месяцев")
    }

    if (days > 0) {
        arr_str.push(days.toString())
        if (((days % 10) == 1) && ((days % 100) != 11))
            arr_str.push("день")
        else if (((days % 10) <= 4) && ((days % 10) > 0) && (((days % 100) < 10) || ((days % 100) > 14)))
            arr_str.push("дня")
        else
            arr_str.push("дней")
    }

    return arr_str.join(" ")

}

export function getFormattedDurationString(date: string) {
    let duration_formatted = getRegistrationDuration(date)
    return getDateString(duration_formatted)
}

export function getFormattedDate(dateString: string) {
    /*const formatted = new Date(date).toLocaleString('ru-RU', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });*/

    const date = new Date(dateString);

    const dayMonth = date.toLocaleDateString("ru-RU", {
        day: 'numeric',
        month: 'long',
   //     year: '2-digit',
    });

    const time = date.toLocaleTimeString("ru-RU", {
        hour: "2-digit",
        minute: "2-digit",
    });

    return `${dayMonth} в ${time}, `;
}

export function getFormattedPrice(price: number) {
    const formatted = price.toLocaleString('ru-RU', {
        style: 'currency',
        currency: 'RUB',
        maximumFractionDigits: 0,
    });
    return formatted;
}

export function getFormattedDateShort(dateString: string) {
    const date = new Date(dateString);

    const time = date.toLocaleTimeString("ru-RU", {
        hour: "2-digit",
        minute: "2-digit",
    });

    const dayMonth = date.toLocaleDateString("ru-RU", {
        day: "2-digit",
        month: "2-digit",
    });

    return `${dayMonth} в ${time}`;
}