import { useState, CSSProperties } from 'react';
import { Article } from './components/article';
import { ArticleParamsForm } from './components/article-params-form';
import {
	ArticleStateType,
	defaultArticleState,
} from './constants/articleProps';
import styles from './styles/index.module.scss';

const App = () => {
	const [articleState, setArticleState] =
		useState<ArticleStateType>(defaultArticleState);
	return (
		<main
			className={styles.main}
			style={
				{
					'--font-family': articleState.fontFamilyOption.value,
					'--font-size': articleState.fontSizeOption.value,
					'--font-color': articleState.fontColor.value,
					'--container-width': articleState.contentWidth.value,
					'--bg-color': articleState.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm setArticleState={setArticleState} />
			<Article />
		</main>
	);
};

export default App;