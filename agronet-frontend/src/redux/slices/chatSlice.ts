import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from "../store";

interface Message {
    sender: string;
    text: string;
    time: string;
    avatar: string;
}

interface ChatState {
    messages: Message[];
    socket: WebSocket | null;
}

const initialState: ChatState = {
    messages: [],
    socket: null,
};

const chatSlice = createSlice({
    name: "chat",
    initialState,
    reducers: {
        addMessage: (state, action: PayloadAction<Message>) => {
            state.messages.push(action.payload);
        },
        setSocket: (state, action: PayloadAction<WebSocket | null>) => {
            state.socket = action.payload;
        },
    },
});

export const { addMessage, setSocket } = chatSlice.actions;
export default chatSlice.reducer;

// WebSocket Initialization
export const initializeWebSocket = () => (dispatch: AppDispatch) => {
    const socket = new WebSocket("ws://localhost:8000/ws/chat/");

    socket.onmessage = (event) => {
        const data: Message = JSON.parse(event.data);
        dispatch(addMessage(data));
    };

    dispatch(setSocket(socket));
};

// Send Message Action
export const sendMessage = (text: string) => (dispatch: AppDispatch, getState: () => { chat: ChatState }) => {
    const { socket } = getState().chat;
    if (socket) {
        const message: Message = {
            sender: "User",
            text,
            time: new Date().toLocaleTimeString(),
            avatar: "/avatars/user.png",
        };
        socket.send(JSON.stringify(message));
        dispatch(addMessage(message));
    }
};
