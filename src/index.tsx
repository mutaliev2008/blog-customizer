import { createRoot } from 'react-dom/client';
import clsx from 'clsx';
import { StrictMode, CSSProperties, useState } from 'react';

import { Article } from './components/article/Article';
import { defaultArticleState } from './constants/articleProps';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';

import styles from './styles/index.module.scss';
import './styles/index.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	const [articleStatus, setArticleStatus] = useState(defaultArticleState);
	return (
		<div
			className={clsx(styles.main)}
			style={
				{
					'--font-family': articleStatus.fontFamilyOption.value,
					'--font-size': articleStatus.fontSizeOption.value,
					'--font-color': articleStatus.fontColor.value,
					'--container-width': articleStatus.contentWidth.value,
					'--bg-color': articleStatus.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm params={articleStatus} setParams={setArticleStatus} />
			<Article />
		</div>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
