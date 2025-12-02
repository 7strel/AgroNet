import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { marked } from 'marked'

interface SelectedChat {
  question: string;
  answer: string;
}

interface ChatbotState {
  input: string
  response: string
  selectedChat:SelectedChat
  loading: boolean
  error: string | null
}

const initialState: ChatbotState = {
  input: '',
  response: '',
  selectedChat: {
    question: '',
    answer: ''
  },
  loading: false,
  error: null,

}


const systemMessage = "You are an agriculture expert. Only answer questions related to farming, crops, soil, weather, agri-business, livestock, and agricultural technology. Politely refuse unrelated questions.";

export const fetchResponse = createAsyncThunk(
  'chatbot/fetchResponse',
  async (userInput: string, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        'https://openrouter.ai/api/v1/chat/completions',
        {
          model: 'deepseek/deepseek-r1:free',
          messages: [{ role: 'user', content: systemMessage + userInput }],
        },
        {
          headers: {
            Authorization:
              'Bearer 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',
            'HTTP-Referer': '<YOUR_SITE_URL>',
            'X-Title': '<YOUR_SITE_NAME>',
            'Content-Type': 'application/json',
          },
        }
      )

      const markdown = res.data.choices?.[0]?.message?.content || 'No response received.'
      return marked.parse(markdown)
    } catch (error: any) {
      return rejectWithValue(error.message)
    }
  }
)

const chatbotSlice = createSlice({
  name: 'chatbot',
  initialState,
  reducers: {
    setInput(state, action: PayloadAction<string>) {
      state.input = action.payload
    },
    setSelectedChat: (state, action: PayloadAction<SelectedChat>) => {
      state.selectedChat = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchResponse.pending, (state) => {
        state.loading = true
        state.response = 'Loading...'
        state.error = null
      })
      .addCase(fetchResponse.fulfilled, (state, action) => {
        state.loading = false
        state.response = action.payload
      })
      .addCase(fetchResponse.rejected, (state, action) => {
        state.loading = false
        state.response = `Error: ${action.payload}`
        state.error = action.payload as string
      })
  },
})

export const { setInput, setSelectedChat  } = chatbotSlice.actions
export default chatbotSlice.reducer
