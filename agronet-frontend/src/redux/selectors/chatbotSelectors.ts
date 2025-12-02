import { RootState } from '../store'

export const selectInput = (state: RootState) => state.chatbot.input
export const selectSelectedChat = (state: RootState) => state.chatbot.selectedChat
export const selectResponse = (state: RootState) => state.chatbot.response
export const selectLoading = (state: RootState) => state.chatbot.loading
