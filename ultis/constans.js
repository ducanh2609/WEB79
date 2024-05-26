export const PORT_SERVER = 'http://localhost:3000'

export const getId = () => {
    return Date.parse(new Date) / 1000
}

export const getData = async (link) => {
    const rs = await fetch(`${PORT_SERVER}/${link}`)
    return await rs.json()
}