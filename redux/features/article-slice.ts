import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchArticle } from '@/redux/services/fetch-article';


interface Article {
	id: string;
	type: string;
	sectionId: string;
	sectionName: string;
	webPublicationDate: string;
	webTitle: string;
	webUrl: string;
	apiUrl: string;
	fields: {
		body: string;
		thumbnail: string;
	};
}

interface ArticleState {
	article: Article;
	status: 'idle' | 'loading' | 'succeeded' | 'failed';
	error: string | null;
}

const initialState: ArticleState = {
	article: {id: '',
		type: '',
		sectionId: '',
		sectionName: '',
		webPublicationDate: '',
		webTitle: '',
		webUrl: '',
		apiUrl: '',
		fields: {
			body:'',
			thumbnail: '',
		}},
	status: 'idle',
	error: null,
};

const articleSlice = createSlice({
	name: 'article',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchArticle.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(fetchArticle.fulfilled, (state, action: PayloadAction<Article>) => {
				state.status = 'succeeded';
				state.article = action.payload;
			})
			.addCase(fetchArticle.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.error.message ?? null;
			});
	},
});

export default articleSlice.reducer;

