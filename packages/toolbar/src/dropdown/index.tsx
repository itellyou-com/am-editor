import React, { useState } from 'react';
import classnames from 'classnames';
import { EngineInterface } from '@aomao/engine';
import Button from '../button';
import DropdownList, { DropdownListItem } from './list';
import './index.css';

export type DropdownProps = {
	name: string;
	items: Array<DropdownListItem>;
	values?: string | Array<string>;
	engine?: EngineInterface;
	icon?: React.ReactNode;
	content?: React.ReactNode | (() => React.ReactNode);
	title?: string;
	disabled?: boolean;
	className?: string;
	direction?: 'vertical' | 'horizontal';
	onSelect?: (event: React.MouseEvent, key: string) => void;
	hasArrow?: boolean;
	hasDot?: boolean;
	renderContent?: (item: DropdownListItem) => React.ReactNode;
};

const Dropdown: React.FC<DropdownProps> = ({
	engine,
	direction,
	name,
	icon,
	content,
	title,
	className,
	items,
	disabled,
	values,
	onSelect,
	hasArrow,
	renderContent,
	hasDot,
}) => {
	const [visible, setVisible] = useState(false);

	const toggle = (event: React.MouseEvent) => {
		event.preventDefault();
		event.stopPropagation();
		if (disabled) {
			return;
		}

		if (visible) {
			hide();
		} else {
			show();
		}
	};

	const show = () => {
		document.addEventListener('click', hide);
		setVisible(true);
	};

	const hide = () => {
		document.removeEventListener('click', hide);
		setVisible(false);
	};

	const triggerSelect = (event: React.MouseEvent, key: string) => {
		if (onSelect) onSelect(event, key);
	};

	const renderCustomeContent = (
		icon?: React.ReactNode,
		content?: React.ReactNode,
	) => {
		return icon ? (
			<span className={`data-icon data-icon-${icon}`} />
		) : typeof content === 'string' ? (
			<span className="toolbar-dropdown-button-text">{content}</span>
		) : (
			content
		);
	};
	const item = items.find(
		item =>
			(typeof values === 'string' && item.key === values) ||
			(Array.isArray(values) && values.indexOf(item.key)) > -1,
	);
	const firstItem = items.length > 0 ? items[0] : null;
	let buttonContent = item
		? renderContent
			? renderContent(item)
			: Array.isArray(values) && values.length > 1
			? renderCustomeContent(icon, content)
			: renderCustomeContent(item.icon, item.content)
		: icon || content
		? Array.isArray(values) && values.length > 0
			? ''
			: renderCustomeContent(icon, content)
		: firstItem
		? renderCustomeContent(firstItem.icon, firstItem.content)
		: '';
	if (hasArrow !== false)
		buttonContent = (
			<>
				{buttonContent}
				<span className="data-icon data-icon-arrow" />
			</>
		);

	return (
		<div
			className={classnames('toolbar-dropdown', className)}
			onClick={toggle}
		>
			<div
				className={classnames('toolbar-dropdown-trigger', {
					'toolbar-dropdown-trigger-active': visible,
					'toolbar-dropdown-trigger-arrow': hasArrow !== false,
				})}
			>
				<Button
					name={name}
					content={buttonContent}
					title={title}
					active={visible}
					disabled={disabled}
				/>
			</div>
			{visible && (
				<DropdownList
					hasDot={hasDot}
					engine={engine}
					direction={direction}
					name={name}
					items={items}
					values={
						values || (icon || content ? '' : firstItem?.key || '')
					}
					onSelect={triggerSelect}
				/>
			)}
		</div>
	);
};

export default Dropdown;
