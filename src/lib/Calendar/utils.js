export const MS_IN_DAY = 1000*60*60*24;
export const months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
export const monthsDeclination = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
export const weekDaysFull = ['понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота', 'воскресенье'];
export const weekDays = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];


export function getMonthNameDecl (month) {return monthsDeclination[month]}

export function getWeekDayName (weekDay) {
    //Превращаем в наш формат, где понедельник = 0
    weekDay = weekDay ? weekDay - 1 : 6;
    return weekDaysFull[weekDay]
}

export function getToday () {
    const date = new Date();
    date.setHours(0,0,0,0);
    return date.getTime();
}

export function getDaysInMonth (dateVal) {
    const date = new Date (dateVal);
    date.setDate(28);
    do {
        var d1 = date.getDate();
        date.setDate(d1 + 1);
        var d2 = date.getDate();
    } while (d2 > d1 );
    return d1;

}

export function getFirstDateCal (dateVal) {
    var date = new Date (dateVal);
    date.setDate(1);
    var threshold = date.getDay();
    threshold = threshold ? threshold - 1 : 6;
    date.setDate(1-threshold);
    return date.getTime();
}

export function getWeekDayNum (dateVal) {
    const date = new Date (dateVal);
    var weekDay = date.getDay();
    //We need monday to be day zero and sunday to be day six
    return  weekDay ? weekDay - 1 : 6;
}

export function printDate (dateVal) {
    const date = new Date (dateVal);
    let day = date.getDate();
    day = day < 10 ? '0' + day : day;
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    return day + '.' + month + '.' + year;
}
export function printTime (dateVal) {
    const date = new Date (dateVal);
    let hours = date.getHours();
    hours = hours < 10 ? '0' + hours : hours;
    let minutes = date.getMinutes();
    minutes = minutes < 10 ? '0' + minutes : minutes;
    return hours + ':' + minutes;
}


