import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import styles from './ArticleParamsForm.module.scss';
import { FormEvent, useRef, useState } from 'react';
import clsx from 'clsx';
import { Select } from 'src/ui/select/Select';
import { ArticleStateType, backgroundColors, contentWidthArr,
		defaultArticleState, fontColors, fontFamilyOptions,
    	fontSizeOptions, OptionType,
}  from 'src/constants/articleProps';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';
import { useOutsideClickClose } from '../../ui/select/hooks/useOutsideClickClose';

type ArticleParamsFormProps = {
    setArticleState: (state: ArticleStateType) => void;
};

type FormField = {
    component: React.ComponentType<any>;
    props: SelectProps | RadioGroupProps | SeparatorProps;
};

type SelectProps = {
    title: string;
    selected: OptionType;
    options: OptionType[];
    onChange: (value: OptionType) => void;
};

type RadioGroupProps = {
    title: string;
    name: string;
    options: OptionType[];
    selected: OptionType;
    onChange: (value: OptionType) => void;
};

type SeparatorProps = Record<string, never>;

export const ArticleParamsForm = ({ setArticleState }: ArticleParamsFormProps) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [formState, setFormState] = useState<ArticleStateType>(defaultArticleState);
    const sidebarRef = useRef<HTMLDivElement>(null);

    useOutsideClickClose({
        isOpen: isMenuOpen,
        rootRef: sidebarRef,
        onChange: setIsMenuOpen,
    });

    const handleFormAction = {
        submit: (e: FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            setArticleState(formState);
            setIsMenuOpen(false);
        },
        reset: (e: FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            setFormState(defaultArticleState);
            setArticleState(defaultArticleState);
        },
    };

    const handleFieldChange = (field: keyof ArticleStateType) => (value: OptionType) => {
        setFormState(prev => ({ ...prev, [field]: value }));
    };

    const formFields: FormField[] = [
        {
            component: Select,
            props: {
                title: 'Шрифт',
                selected: formState.fontFamilyOption,
                options: fontFamilyOptions,
                onChange: handleFieldChange('fontFamilyOption'),
            } as SelectProps,
        },
        {
            component: RadioGroup,
            props: {
                title: 'Размер шрифта',
                name: 'fontSize',
                options: fontSizeOptions,
                selected: formState.fontSizeOption,
                onChange: handleFieldChange('fontSizeOption'),
            } as RadioGroupProps,
        },
        {
            component: Select,
            props: {
                title: 'Цвет шрифта',
                selected: formState.fontColor,
                options: fontColors,
                onChange: handleFieldChange('fontColor'),
            } as SelectProps,
        },
        {
            component: Separator,
            props: {} as SeparatorProps,
        },
        {
            component: Select,
            props: {
                title: 'Цвет фона',
                selected: formState.backgroundColor,
                options: backgroundColors,
                onChange: handleFieldChange('backgroundColor'),
            } as SelectProps,
        },
        {
            component: Select,
            props: {
                title: 'Ширина контента',
                selected: formState.contentWidth,
                options: contentWidthArr,
                onChange: handleFieldChange('contentWidth'),
            } as SelectProps,
        },
    ];

    return (
        <>
            <ArrowButton
                isOpen={isMenuOpen}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
            />

            <div
                ref={sidebarRef}
                className={clsx(styles.container, {
                    [styles.container_open]: isMenuOpen,
                })}>
                <form
                    className={styles.form}
                    onSubmit={handleFormAction.submit}
                    onReset={handleFormAction.reset}>
                    <Text weight={800} size={31} uppercase>
                        Задайте параметры
                    </Text>

                    {formFields.map((field, index) => {
                        const FieldComponent = field.component;
                        return <FieldComponent key={index} {...field.props} />;
                    })}

                    <div className={styles.bottomContainer}>
                        <Button title='Сбросить' htmlType='reset' type='clear' />
                        <Button title='Применить' htmlType='submit' type='apply' />
                    </div>
                </form>
            </div>
        </>
    );
};