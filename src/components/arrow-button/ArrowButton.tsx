import arrow from 'src/images/arrow.svg';
import clsx from 'clsx';
import styles from './ArrowButton.module.scss';

export type ArrowButtonProps = {
	isOpen: boolean;
	onClick: () => void;
};
/** Функция для обработки открытия/закрытия формы */
export const ArrowButton = ({ onClick, isOpen }: ArrowButtonProps) => {
	const arrowButtonImgClassName = clsx({
		[styles.arrow]: true,
		[styles.arrow_open]: isOpen,
	});

	const arrowButtonClassName = clsx({
		[styles.container]: true,
		[styles.container_open]: isOpen,
	});

	return (
		/* Не забываем указаывать role и aria-label атрибуты для интерактивных элементов */
		<div
			role='button'
			aria-label='Открыть/Закрыть форму параметров статьи'
			tabIndex={0}
			onClick={onClick}
			className={arrowButtonClassName}>
			<img
				src={arrow}
				alt='иконка стрелочки'
				className={arrowButtonImgClassName}
			/>
		</div>
	);
};
