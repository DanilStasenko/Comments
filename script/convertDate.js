function truncate(date) {
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0, 0);
}

function showMessageDateTime(dateTime) {
    let today = new Date();           
    let yesterday = new Date();             
    let roomLastMessageDate = new Date(dateTime);
    let showTime = new Date(dateTime);

    yesterday.setDate(today.getDate() - 1);

    truncate(today);
    truncate(yesterday);
    truncate(roomLastMessageDate);

    if (!dateTime) {
        return;
    }
    
    if (today.getTime() === roomLastMessageDate.getTime()) { 
        const date = showTime.toLocaleTimeString('en-GB');
        const dateWithoutSec = date.slice(0, date.length - 3);
        return `Сегодня ${dateWithoutSec}`                                                                              
    }

    if (yesterday.getTime() === roomLastMessageDate.getTime()) { 
        const date = showTime.toLocaleTimeString('en-GB');
        const dateWithoutSec = date.slice(0, date.length - 3);
        return `Вчера ${dateWithoutSec}`                                                                               
    }

    const date = showTime.toLocaleString('en-GB');
    const dateWithoutSec = date.slice(0, date.length - 3);                                                                           
    return dateWithoutSec;
}