import { Path } from 'sharedb';

export type EventListener = (...args: Array<Event | any>) => boolean | void;

export interface EventInterface {
	/**
	 * 事件集合
	 */
	readonly listeners: { [x: string]: EventListener[] };
	/**
	 * 绑定事件
	 * @param eventType 事件名称
	 * @param listener 事件处理方法
	 * @param rewrite 是否重写事件
	 */
	on(eventType: string, listener: EventListener, rewrite?: boolean): void;
	/**
	 * 解除绑定
	 * @param eventType
	 * @param listener
	 */
	off(eventType: string, listener: EventListener): void;
	/**
	 * 触发事件
	 * @param eventType 事件类型
	 * @param args 事件参数
	 */
	trigger(eventType: string, ...args: any): boolean | undefined;
}
export type Selector =
	| string
	| HTMLElement
	| Node
	| Array<Node>
	| NodeList
	| NodeInterface
	| EventTarget;
export type Context = Element | Document;

export interface NodeEntry {
	prototype: NodeInterface;
	new (
		nodes: Node | NodeList | Array<Node>,
		context?: Context,
	): NodeInterface;
}

export interface NodeInterface {
	/**
	 * Node集合长度
	 */
	length: number;
	/**
	 * 事件集合
	 */
	events: EventInterface[];
	/**
	 * Document
	 */
	doc: Document | null;
	/**
	 * 根节点
	 */
	root: Context | undefined;
	/**
	 * 节点名称
	 */
	name: string | undefined;
	/**
	 * 节点类型
	 */
	type: number | undefined;
	/**
	 * Window
	 */
	win: Window | null;
	/**
	 * 显示状态
	 */
	display: string | undefined;
	/**
	 * 是否是片段
	 */
	isFragment: boolean;
	/**
	 * Node 集合
	 */
	[n: number]: Node;

	/**
	 * 遍历
	 * @param {Function} callback 回调函数
	 * @return {NodeInterface} 返回当前实例
	 */
	each(
		callback: (node: Node, index: number) => boolean | void,
	): NodeInterface;

	/**
	 * 将 NodeInterface 转换为 Array
	 * @return {Array} 返回数组
	 */
	toArray(): Array<Node>;

	/**
	 * 判断当前节点是否为 Node.ELEMENT_NODE 节点类型
	 * @return {boolean}
	 */
	isElement(): boolean;

	/**
	 * 判断当前节点是否为 Node.TEXT_NODE 节点类型
	 * @return {boolean}
	 */
	isText(): boolean;

	/**
	 * 判断当前节点是否为 block 类型
	 */
	isBlock(): boolean;

	/**
	 * 判断当前节点是否为 inline 类型
	 */
	isInline(): boolean;

	/**
	 * 判断当前节点是否为block类型根节点
	 */
	isRootBlock(): boolean;

	/**
	 * 判断当前节点是否为block类型的简单节点（子节点不包含blcok标签）
	 */
	isSimpleBlock(): boolean;

	/**
	 * 判断当前节点是否为 mark 类型标签
	 */
	isMark(): boolean;

	/**
	 * 判断当前节点是否为Card组件
	 */
	isCard(): boolean;

	/**
	 * 判断当前节点是否为block类型的Card组件
	 */
	isBlockCard(): boolean;

	/**
	 * 判断当前节点是否为不需要内容的空节点，如：br
	 */
	isVoid(): boolean;

	/**
	 * 判断当前节点是否为固体标签
	 */
	isSolid(): boolean;

	/**
	 * 判断当前节点是否为主题节点
	 */
	isHeading(): boolean;

	/**
	 * 判断当前节点是否为标题节点
	 */
	isTitle(): boolean;

	/**
	 * 判断当前节点是否为表格
	 */
	isTable(): boolean;

	/**
	 * 判断当前节点是否为根节点
	 */
	isRoot(): boolean;

	/**
	 * 判断当前是否在根节点内
	 */
	inRoot(): boolean;

	/**
	 * 获取当前Node节点
	 */
	get<E extends Node>(): E | null;

	/**
	 * 获取当前第 index 节点
	 * @param {Number} index
	 * @return {NodeInterface|undefined} NodeInterface 类，或 undefined
	 */
	eq(index: number): NodeInterface | undefined;

	/**
	 * 获取当前节点所在父节点中的索引，仅计算节点类型为ELEMENT_NODE的节点
	 * @return {Number} 返回索引
	 */
	index(): number;

	/**
	 * 获取当前节点父节点
	 * @return {NodeInterface} 父节点
	 */
	parent(): NodeInterface | undefined;

	/**
	 * 查询当前节点的子节点
	 * @param {Node | string} selector 查询器
	 * @return {NodeInterface} 符合条件的子节点
	 */
	children(selector?: string): NodeInterface;

	/**
	 * 获取当前节点第一个子节点
	 * @return {NodeInterface} NodeInterface 子节点
	 */
	first(): NodeInterface | null;

	/**
	 * 获取当前节点最后一个子节点
	 * @return {NodeInterface} NodeInterface 子节点
	 */
	last(): NodeInterface | null;

	/**
	 * 返回元素节点之前的兄弟节点（包括文本节点、注释节点）
	 * @return {NodeInterface} NodeInterface 节点
	 */
	prev(): NodeInterface | null;

	/**
	 * 返回元素节点之后的兄弟节点（包括文本节点、注释节点）
	 * @return {NodeInterface} NodeInterface 节点
	 */
	next(): NodeInterface | null;

	/**
	 * 返回元素节点之前的兄弟元素节点（不包括文本节点、注释节点）
	 * @return {NodeInterface} NodeInterface 节点
	 */
	prevElement(): NodeInterface | null;

	/**
	 * 返回元素节点之后的兄弟元素节点（不包括文本节点、注释节点）
	 * @return {NodeInterface} NodeInterface 节点
	 */
	nextElement(): NodeInterface | null;

	/**
	 * 返回元素节点所在根节点路径，默认根节点为 document.body
	 * @param {Node} context 根节点，默认为 document.body
	 * @return {string} 路径
	 */
	getPath(context: Node): Array<string>;

	/**
	 * 判断元素节点是否包含要查询的节点
	 * @param {NodeInterface | Node} node 要查询的节点
	 * @return {Boolean} 是否包含
	 */
	contains(node: NodeInterface | Node): boolean;

	/**
	 * 根据查询器查询当前元素节点
	 * @param {String} selector 查询器
	 * @return {NodeInterface} 返回一个 NodeInterface 实例
	 */
	find(selector: string): NodeInterface;

	/**
	 * 根据查询器查询符合条件的离当前元素节点最近的父节点
	 * @param {string} selector 查询器
	 * @return {NodeInterface} 返回一个 NodeInterface 实例
	 */
	closest(
		selector: string,
		callback?: (node: Node) => Node | undefined,
	): NodeInterface;

	/**
	 * 为当前元素节点绑定事件
	 * @param {String} eventType 事件类型
	 * @param {Function} listener 事件函数
	 * @return {NodeInterface} 返回当前实例
	 */
	on(eventType: string, listener: EventListener): NodeInterface;

	/**
	 * 移除当前元素节点事件
	 * @param {String} eventType 事件类型
	 * @param {Function} listener 事件函数
	 * @return {NodeInterface} 返回当前实例
	 */
	off(eventType: string, listener: EventListener): NodeInterface;

	/**
	 * 获取当前元素节点相对于视口的位置
	 * @param {Object} defaultValue 默认值
	 * @return {Object}
	 * {
	 *  top,
	 *  bottom,
	 *  left,
	 *  right
	 * }
	 */
	getBoundingClientRect(defaultValue?: {
		top: number;
		bottom: number;
		left: number;
		right: number;
	}):
		| { top: number; bottom: number; left: number; right: number }
		| undefined;

	/**
	 * 移除当前元素所有已绑定的事件
	 * @return {NodeInterface} 当前 NodeInterface 实例
	 */
	removeAllEvents(): NodeInterface;

	/**
	 * 获取当前元素节点相对于视口的位置
	 * @return {Object}
	 * {
	 *  top,
	 *  left
	 * }
	 */
	offset(): { [k: string]: number } | undefined;

	/**
	 * 获取或设置元素节点属性
	 * @param {string|undefined} key 属性名称，key为空获取所有属性，返回Map
	 * @param {string|undefined} val 属性值，val为空获取当前key的属性，返回string|null
	 * @return {NodeInterface|{[k:string]:string}} 返回值或当前实例
	 */
	attr(): { [k: string]: string };
	attr(key: { [k: string]: string }): string;
	attr(key: string, val: string | number): NodeInterface;
	attr(key: string): string;
	attr(
		key?: string | { [k: string]: string },
		val?: string | number,
	): NodeInterface | { [k: string]: string } | string;

	/**
	 * 移除元素节点属性
	 * @param {String} key 属性名称
	 * @return {NodeInterface} 返当前实例
	 */
	removeAttr(key: string): NodeInterface;

	/**
	 * 判断元素节点是否包含某个 class
	 * @param {String} className 样式名称
	 * @return {Boolean} 是否包含
	 */
	hasClass(className: string): boolean;

	/**
	 * 为元素节点增加一个 class
	 * @param {String} className
	 * @return {NodeInterface} 返当前实例
	 */
	addClass(className: string): NodeInterface;

	/**
	 * 移除元素节点 class
	 * @param {String} className
	 * @return {NodeInterface} 返当前实例
	 */
	removeClass(className: string): NodeInterface;

	/**
	 * 获取或设置元素节点样式
	 * @param {String|undefined} key 样式名称
	 * @param {String|undefined} val 样式值
	 * @return {NodeInterface|{[k:string]:string}} 返回值或当前实例
	 */
	css(): { [k: string]: string };
	css(key: { [k: string]: string | number }): NodeInterface;
	css(key: string): string;
	css(key: string, val: string | number): NodeInterface;
	css(
		key?: string | { [k: string]: string | number },
		val?: string | number,
	): NodeInterface | { [k: string]: string } | string;

	/**
	 * 获取元素节点宽度
	 * @return {number} 宽度
	 */
	width(): number;

	/**
	 * 获取元素节点高度
	 * @return {Number} 高度
	 */
	height(): number;

	/**
	 * 获取或设置元素节点html文本
	 * @param {String|undefined} val html文本
	 * @return {NodeInterface|String} 当前实例或html文本
	 */
	html(): string;
	html(val: string): NodeInterface;
	html(val?: string): NodeInterface | string;

	/**
	 * 获取或设置元素节点html文本
	 */
	htmlKeepID(): string;
	htmlKeepID(html: string): NodeInterface;
	htmlKeepID(html?: string): NodeInterface | string;

	/**
	 * 获取元素节点文本
	 * @return {String} 文本
	 */
	text(): string;

	/**
	 * 设置元素节点为显示状态
	 * @param {String} display display值
	 * @return {NodeInterface} 当前实例
	 */
	show(display: string): NodeInterface;

	/**
	 * 设置元素节点为隐藏状态
	 * @return {NodeInterface} 当前实例
	 */
	hide(): NodeInterface;

	/**
	 * 移除当前实例所有元素节点
	 * @return {NodeInterface} 当前实例
	 */
	remove(): NodeInterface;

	/**
	 * 清空元素节点下的所有子节点
	 * @return {NodeInterface} 当前实例
	 */
	empty(): NodeInterface;

	/**
	 * 比较两个元素节点是否相同
	 * @param {NodeInterface|Node} node 比较的节点
	 * @return {Boolean} 是否相同
	 */
	equal(node: NodeInterface | Node): boolean;

	/**
	 * 复制元素节点
	 * @param {Boolean} deep 是否深度复制
	 * @return {NodeInterface} 复制后的元素节点
	 */
	clone(deep?: boolean): NodeInterface;

	/**
	 * 复制元素节点
	 * @param deep 是否深度复制
	 */
	cloneKeepID(deep?: boolean): NodeInterface;

	/**
	 * 在元素节点的开头插入指定内容
	 * @param {Selector} selector 选择器或元素节点
	 * @return {NodeInterface} 当前实例
	 */
	prepend(selector: Selector): NodeInterface;

	/**
	 * 在元素节点的结尾插入指定内容
	 * @param {Selector} selector 选择器或元素节点
	 * @return {NodeInterface} 当前实例
	 */
	append(selector: Selector): NodeInterface;

	/**
	 * 在元素节点前插入新的节点
	 * @param {Selector} selector 选择器或元素节点
	 * @return {NodeInterface} 当前实例
	 */
	before(selector: Selector): NodeInterface;

	/**
	 * 在元素节点后插入内容
	 * @param {Selector} selector 选择器或元素节点
	 * @return {NodeInterface} 当前实例
	 */
	after(selector: Selector): NodeInterface;

	/**
	 * 将元素节点替换为新的内容
	 * @param {Selector} selector 选择器或元素节点
	 * @return {NodeInterface} 当前实例
	 */
	replaceWith(selector: Selector): NodeInterface;
	/**
	 * 获取节点所在编辑器的根节点
	 */
	getRoot(): NodeInterface;
	/**
	 * 遍历所有子节点
	 * @param callback 回调函数，false：停止遍历 ，true：停止遍历当前节点，下一个兄弟节点继续遍历
	 * @param order true:顺序 ，false:倒序，默认 true
	 */
	traverse(
		callback: (node: NodeInterface) => boolean | void,
		order?: boolean,
	): void;
	/**
	 * 根据路径获取子节点
	 * @param path 路径
	 */
	getChildByPath(path: Path): Node;

	/**
	 * 检查当前节点是否在目标节点内
	 * @param node 节点
	 */
	inside(node: Node | NodeInterface): boolean;

	/**
	 * 获取当前节点所在父节点中的索引
	 */
	getIndex(): number;

	/**
	 * 在指定容器里获取父节点
	 * @param container 容器节点
	 */
	getParent(container: Node | NodeInterface): NodeInterface | null;

	/**
	 * 获取节点下的所有子节点
	 */
	allChildren(): Array<Node>;

	/**
	 * 返回当前节点或者传入的节点所在当前节点的顶级window对象的视图边界
	 * @param node 节点
	 */
	getViewport(
		node?: NodeInterface,
	): { top: number; left: number; bottom: number; right: number };

	/**
	 * 判断view是否在node节点根据当前节点的顶级window对象计算的视图边界内
	 * @param node 节点
	 * @param view 是否在视图的节点
	 */
	inViewport(node: NodeInterface, view: NodeInterface): boolean;

	/**
	 * 如果view节点不可见，将滚动到align位置，默认为nearest
	 * @param node 节点
	 * @param view 视图节点
	 * @param align 位置
	 */
	scrollIntoView(
		node: NodeInterface,
		view: NodeInterface,
		align?: 'start' | 'center' | 'end' | 'nearest',
	): void;
	/**
	 * 获取最近的 Block 节点，找不到则返回自己
	 */
	getClosestBlock(): NodeInterface;
	/**
	 * 获取最近的 Inline 节点
	 */
	getClosestInline(): NodeInterface | null;
	/**
	 * 获取向上第一个非 Mark 节点
	 */
	getClosestNotMark(): NodeInterface;
	/**
	 * 判断节点下的文本是否为空
	 * @param withTrim 是否 trim
	 */
	isEmpty(withTrim?: boolean): boolean;
	/**
	 * 判断一个节点下的文本是否为空，或者只有空白字符
	 */
	isEmptyWithTrim(): boolean;
	/**
	 * 判断一个节点是否为空
	 */
	isLikeEmpty(): boolean;
}
