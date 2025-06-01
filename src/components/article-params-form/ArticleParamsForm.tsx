import { FormEvent, useState } from 'react';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select';
import {
	fontFamilyClasses,
	fontFamilyOptions,
	fontSizeOptions,
	OptionType,
	fontColors,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	ArticleStateType,
} from 'src/constants/articleProps';
import { Text } from 'src/ui/text';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import clsx from 'clsx';

import styles from './ArticleParamsForm.module.scss';

type TArticleParamsFormProps = {
	setGlobalState: (value: ArticleStateType) => void;
};

export const ArticleParamsForm = (props: TArticleParamsFormProps) => {
	const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
	const [formState, setFormState] = useState(defaultArticleState);

	function handleFormSubmit(e: FormEvent) {
		e.preventDefault();

		props.setGlobalState({
			fontFamilyOption: formState.fontFamilyOption,
			fontSizeOption: formState.fontSizeOption,
			fontColor: formState.fontColor,
			backgroundColor: formState.backgroundColor,
			contentWidth: formState.contentWidth,
		});
	}

	function handleFormReset(e: FormEvent) {
		e.preventDefault();

		setFormState(defaultArticleState);

		props.setGlobalState(defaultArticleState);
	}

	function handleOptionChange(fieldName: string) {
		return (value: OptionType) => {
			setFormState((prev) => ({
				...prev,
				[fieldName]: value,
			}));
		};
	}

	return (
		<>
			<ArrowButton
				isOpen={isFormOpen}
				onClick={() => setIsFormOpen((prev) => !prev)}
			/>
			<div
				onClick={() => setIsFormOpen(false)}
				className={clsx(
					styles.overlay,
					isFormOpen && styles.overlay_open
				)}></div>
			<aside
				className={clsx(styles.container, isFormOpen && styles.container_open)}>
				<form
					className={styles.form}
					onSubmit={handleFormSubmit}
					onReset={handleFormReset}>
					<Text
						as='h2'
						size={31}
						weight={800}
						uppercase={true}
						family={fontFamilyClasses[0]}>
						Задайте параметры
					</Text>

					<div className={styles.selects}>
						<Select
							selected={formState.fontFamilyOption}
							options={fontFamilyOptions}
							placeholder='Open Sans'
							title='Шрифт'
							onChange={handleOptionChange('fontFamilyOption')}
						/>

						<RadioGroup
							name='Размер шрифта'
							selected={formState.fontSizeOption}
							options={fontSizeOptions}
							title='Размер шрифта'
							onChange={handleOptionChange('fontSizeOption')}
						/>

						<Select
							selected={formState.fontColor}
							options={fontColors}
							title='Цвет шрифта'
							onChange={handleOptionChange('fontColor')}
						/>

						<Separator />

						<Select
							selected={formState.backgroundColor}
							options={backgroundColors}
							title='Цвет фона'
							onChange={handleOptionChange('backgroundColor')}
						/>

						<Select
							selected={formState.contentWidth}
							options={contentWidthArr}
							title='Ширина контента'
							onChange={handleOptionChange('contentWidth')}
						/>
					</div>

					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
