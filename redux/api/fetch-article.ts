
const fetchArticle = async (articleId: string) => {
	const apiKey = "f8e7118b-6ea5-4f80-bcb6-5332a889495a";
	const apiUrl = `https://content.guardianapis.com/${articleId}?show-fields=body,thumbnail&api-key=${apiKey}`;

	try {
		const res = await fetch(apiUrl);
		if (!res.ok) {
			throw new Error('Network response was not ok');
		}
		const data = await res.json();
		return data.response.content;
	} catch (error) {
		console.error('Error fetching article', error);
		throw error;
	}
};

export default fetchArticle;
