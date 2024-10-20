import { ArrowButton } from 'components/arrow-button';
import { useState, useRef } from 'react';
import { Button } from 'components/button';
import clsx from 'clsx';

import { RadioGroup } from '../radio-group';
import { Separator } from '../separator';
import { Select } from '../select';
import { Text } from '../text';

import styles from './ArticleParamsForm.module.scss';
import {
	fontFamilyOptions,
	backgroundColors,
	contentWidthArr,
	ArticleStateType,
	fontSizeOptions,
	fontColors,
	defaultArticleState,
} from 'src/constants/articleProps';
import { useOutsideClickClose } from '../select/hooks/useOutsideClickClose';

type ArticleParamsFormProps = {
	params: ArticleStateType;
	setParams: (props: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
	params,
	setParams,
}: ArticleParamsFormProps) => {
	const ref = useRef<HTMLDivElement | null>(null);

	const [isSidebarVisible, setSidebarVisibility] = useState(false);
	const [articleBackgroundColor, setArticleBackgroundColor] = useState(
		params.backgroundColor
	);
	const [articleFontSize, setArticleFontSize] = useState(params.fontSizeOption);

	const [articleFontFamily, setArticleFontFamily] = useState(
		params.fontFamilyOption
	);
	const [articleContentWidth, setArticleContentWidth] = useState(
		params.contentWidth
	);
	const [articleFontColor, setArticleFontColor] = useState(params.fontColor);

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setParams({
			...params,
			fontSizeOption: articleFontSize,
			backgroundColor: articleBackgroundColor,
			fontColor: articleFontColor,
			fontFamilyOption: articleFontFamily,
			contentWidth: articleContentWidth,
		});
	};

	const handleReset = () => {
		setParams(defaultArticleState),
			setArticleFontSize(defaultArticleState.fontSizeOption),
			setArticleFontColor(defaultArticleState.fontColor),
			setArticleBackgroundColor(defaultArticleState.backgroundColor),
			setArticleFontFamily(defaultArticleState.fontFamilyOption),
			setArticleContentWidth(defaultArticleState.contentWidth);
	};

	const asideClassName = clsx({
		[styles.container]: true,
		[styles.container_open]: isSidebarVisible,
	});

	useOutsideClickClose({
		rootRef: ref,
		isOpen: isSidebarVisible,
		onClose: () => setSidebarVisibility(false),
	});

	return (
		<div ref={ref}>
			<ArrowButton
				onClick={() => setSidebarVisibility(!isSidebarVisible)}
				isOpen={isSidebarVisible}
			/>
			<aside className={asideClassName}>
				<form
					className={styles.form}
					onReset={handleReset}
					onSubmit={handleSubmit}>
					<Text size={31} weight={800} uppercase={true}>
						Задайте параметры
					</Text>
					<Select
						options={fontFamilyOptions}
						selected={articleFontFamily}
						onChange={setArticleFontFamily}
						title='шрифт'
					/>
					<RadioGroup
						options={fontSizeOptions}
						selected={articleFontSize}
						name='fontSize'
						onChange={setArticleFontSize}
						title='размер шрифта'
					/>
					<Select
						options={fontColors}
						selected={articleFontColor}
						onChange={setArticleFontColor}
						title='цвет шрифта'
					/>
					<Separator />
					<Select
						options={backgroundColors}
						selected={articleBackgroundColor}
						onChange={setArticleBackgroundColor}
						title='цвет фона'
					/>
					<Select
						options={contentWidthArr}
						selected={articleContentWidth}
						onChange={setArticleContentWidth}
						title='ширина контента'
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</div>
	);
};
