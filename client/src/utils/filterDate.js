export function filterDate(){
    const ctime=new Date();
    const year=ctime.getFullYear();
    let month=ctime.getMonth()+1;
    let day=ctime.getDate();
    month=month<10?"0"+month:month;
    day=day<10?"0"+day:day;    
    return `${year}-${month}-${day}`
}