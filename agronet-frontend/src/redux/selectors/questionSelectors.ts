import { RootState } from "../store";
import { QuestionState, Question } from "../slices/questionSlice";

export const selectQuestions = (state: RootState): QuestionState => state.questions;
export const selectQuestionsList = (state: RootState): Question[] => state.questions.questions;
export const selectQuestionsLoading = (state: RootState): boolean => state.questions.loading;
export const selectQuestionsError = (state: RootState): string | null => state.questions.error;