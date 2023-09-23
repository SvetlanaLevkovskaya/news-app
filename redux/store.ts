import { configureStore } from '@reduxjs/toolkit'
import newsReducer from './features/news-slice'
import articleReducer from './features/article-slice'
import { TypedUseSelectorHook, useSelector } from 'react-redux';

export const store = configureStore({
	reducer: {
		news: newsReducer,
		article: articleReducer,
	}
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
