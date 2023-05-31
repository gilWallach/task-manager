export function formatDateTime(timestamp: number){
    const date = new Date(timestamp).toDateString()
    const hours = new Date(timestamp).getHours()
    const minutes = new Date(timestamp).getMinutes()
    const formattedDate = `${date} at ${hours}:${minutes}`
    return formattedDate        
}