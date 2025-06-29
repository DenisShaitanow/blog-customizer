import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useEffect } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import { defaultArticleState } from './constants/articleProps';
import { useState } from 'react';


import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

type PageStyle = {
	'--font-family': string,
	'--font-size': string,
	'--font-color': string,
	'--container-width': string,
	'--bg-color': string,
}

const App = () => {
	const initialPageStyle: PageStyle = {
        '--font-family': defaultArticleState.fontFamilyOption.value,
        '--font-size': defaultArticleState.fontSizeOption.value,
        '--font-color': defaultArticleState.fontColor.value,
        '--container-width': defaultArticleState.contentWidth.value,
        '--bg-color': defaultArticleState.backgroundColor.value,
    };

    const [pageStyle, setPageStyle] = useState(initialPageStyle);

    // Функция сброса настроек до начальных значений
    const resetStyles = () => {
        setPageStyle(initialPageStyle);
    };

    // Функция обновления стилей страницы
    const applyStyles = (newStyle: PageStyle) => {
        setPageStyle(newStyle);
    };
	
	return (
		<main
			className={clsx(styles.main)}
			style={
				{ 	
					'--font-family': pageStyle['--font-family'],
        			'--font-size': pageStyle['--font-size'],
        			'--font-color': pageStyle['--font-color'],
        			'--container-width': pageStyle['--container-width'],
        			'--bg-color': pageStyle['--bg-color'],
				} as CSSProperties
			}>
			<ArticleParamsForm 
                onApply={applyStyles} // Применяет новые стили
                onReset={resetStyles} // Сбрасывает стили
            />
				
			<Article />
		</main>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
