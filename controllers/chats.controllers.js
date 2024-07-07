import { createChatDB, findChat } from "../models/chats.models.js"

export const getChat = async (req, res) => {
    try {
        const chats = await findChat()
        console.log(chats)
        res.status(200).send({
            data: chats,
        })
    } catch (error) {
        res.send(error.message)
    }
}

export const createChat = async (data) => {
    const { userId, content } = data
    try {
        await createChatDB({ userId, content })
    } catch (error) {
        console.log(error.message)
    }
}