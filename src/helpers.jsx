export const getTime = (time) => {
    let timestamp
    let date = new Date(+timestamp);
    timestamp = time;
    return date = date.getDate()+
        "/"+(date.getMonth()+1)+
        "/"+date.getFullYear()+
        " "+date.getHours()+
        ":"+date.getMinutes()
}