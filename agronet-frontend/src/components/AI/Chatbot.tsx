// import { connect } from 'react-redux'
// import { setInput, fetchResponse } from '../../redux/slices/AIChatSlice';
// import { selectInput, selectResponse, selectLoading } from '../../redux/selectors/chatbotSelectors';
// import type { RootState } from '../../redux/store';

// interface Props {
//   input: string
//   response: string
//   loading: boolean
//   setInput: (value: string) => void
//   fetchResponse: (value: string) => void
// }

// const Chatbot = ({ input, response, loading, setInput, fetchResponse }: Props) => {
//   const handleAsk = () => {
//     if (!input.trim()) {
//       fetchResponse('Please enter a message.')
//     } else {
//       fetchResponse(input)
//     }
//   }

//   return (
//     <div className="max-w-xl mx-auto p-4">
//       <input
//         type="text"
//         className="w-full p-2 border border-gray-300 rounded mb-4"
//         placeholder="Enter your question"
//         value={input}
//         onChange={(e) => setInput(e.target.value)}
//       />
//       <button
//         onClick={handleAsk}
//         disabled={loading}
//         className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
//       >
//         Ask!
//       </button>
//       <div
//         className="mt-4 p-4 border rounded bg-gray-100 prose"
//         dangerouslySetInnerHTML={{ __html: response }}
//       />
//     </div>
//   )
// }

// const mapStateToProps = (state: RootState) => ({
//   input: selectInput(state),
//   response: selectResponse(state),
//   loading: selectLoading(state),
// })

// const mapDispatchToProps = {
//   setInput,
//   fetchResponse,
// }

// export default connect(mapStateToProps, mapDispatchToProps)(Chatbot)
// src/components/Chatbot.tsx
import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setInput, fetchResponse } from '../../redux/slices/AIChatSlice'
import { createQuestion } from '../../redux/slices/questionSlice'
import { createAnswer } from '../../redux/slices/answerSlice'

import {
  selectInput,
  selectResponse,
  selectSelectedChat,
  selectLoading,
} from '../../redux/selectors/chatbotSelectors'

import type { AppDispatch, RootState } from '../../redux/store'

const Chatbot = () => {
  const dispatch = useDispatch<AppDispatch>();
  const input = useSelector(selectInput)
  let response = useSelector(selectResponse)
  console.log(response)
  const cleanResponse = stripHtml(response);
  console.log(cleanResponse);
  const loading = useSelector(selectLoading)
  const userToken = JSON.parse(localStorage.getItem("user_token") || '""');
  const currentUser = useSelector((state: RootState) => state.auth.user);

  const hasSubmitted = useRef(false)

  
const selectedChat = useSelector(selectSelectedChat);
const [displayResponse, setDisplayResponse] = useState<string>("");

useEffect(() => {
  console.log('Selected Chat:', selectedChat); 
  if (selectedChat.question && selectedChat.answer) {
    dispatch(setInput(selectedChat.question));
    setDisplayResponse(selectedChat.answer);
    response = displayResponse;
    console.log(response);
  }
}, [selectedChat]);

  // Sync Redux response to local displayResponse
  useEffect(() => {
    if (!loading && response) {
      setDisplayResponse(response);
    }
  }, [response, loading]);



  const handleAsk = () => {
    if (!input.trim()) {
      dispatch(fetchResponse('Please enter a message.'))
    } else {
      hasSubmitted.current = true
      dispatch(fetchResponse(input))
    }
  }

  function stripHtml(html: string): string {
    const div = document.createElement('div');
    div.innerHTML = html;
    return div.textContent || div.innerText || '';
  }

  useEffect(() => {
    if (hasSubmitted.current && response && !loading) {
      hasSubmitted.current = false

      const questionData = {
        title: input,
        body: input,
        is_answered: true,
        author: currentUser,
      }

      dispatch(createQuestion({ data: questionData, user_token: userToken }))
        .unwrap()
        .then((question) => {
          const answerData = {
            title: `Answer to: ${input}`,
            body: cleanResponse,
            is_answered: true,
            question:question.id,
            author: currentUser,
          }

          dispatch(createAnswer({
            questionId: question.id,
            data: answerData,
            user_token: userToken,
          }))
        })
        .catch((err) => {
          console.error('Failed to save question or answer:', err)
        })
    }
  }, [response, loading])

  return (
    <div className="max-w-xl mx-auto p-4">
      <input
        type="text"
        className="w-full p-2 border border-gray-300 rounded mb-4"
        placeholder="Enter your question"
        value={input}
        onChange={(e) => dispatch(setInput(e.target.value))}
      />
      <button
        onClick={handleAsk}
        disabled={loading}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Ask!
      </button>
      <div
        className="mt-4 p-4 border rounded bg-gray-100 prose max-h-96 overflow-auto break-words"
        dangerouslySetInnerHTML={{ __html: displayResponse }}
      />
    </div>
  )
}

export default Chatbot
