import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchNews } from '@/redux/services/fetch-news';

export interface NewsItem {
	id: string;
	type: string;
	sectionId: string;
	sectionName: string;
	webPublicationDate: string;
	webTitle: string;
	webUrl: string;
	apiUrl: string;
	fields: {
		headline: string;
		body: string;
		thumbnail: string;
	};
}

const initialState = {
	news: [] as NewsItem[],
	status: 'idle' as 'idle' | 'loading' | 'succeeded' | 'failed',
	error: null as string | null,
	searchTerm: '',
	sortOption: 'newest'
};

const newsSlice = createSlice({
	name: 'news',
	initialState,
	reducers: {
		setSearchTerm: (state, action: PayloadAction<string>) => {
			state.searchTerm = action.payload;
		},
		setSortOption: (state, action: PayloadAction<string>) => {
			state.sortOption = action.payload
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchNews.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(fetchNews.fulfilled, (state, action: PayloadAction<NewsItem[]>) => {
				state.status = 'succeeded';
				state.news = action.payload;
			})
			.addCase(fetchNews.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.error.message ?? null;
			});
	},
});

export const { setSearchTerm, setSortOption } = newsSlice.actions
export default newsSlice.reducer;

