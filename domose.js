/* Speculative DOM Functionality
/* ========================================================================== */

function __assignSource(element, source, prefix) {
	for (let key in source) {
		if ('function' === typeof source[key]) {
			// add event listeners that are functions
			element.addEventListener(prefix + key, source[key]);
		} else if (Object(source[key]) === source[key]) {
			// set attributes with prefixes
			__assignSource(element, source[key], `${prefix + key}-`);
		} else if (/ /.test(key)) {
			// set namespaced attributes
			element.setAttributeNS(
				(prefix + key).replace(/.* /, ''),
				(prefix + key).replace(/ .*/, ''),
				source[key]
			);
		} else {
			// set attributes
			element.setAttribute(prefix + key, source[key]);
		}
	}
}

/* Assign an element with attributes, events, and children
/* ========================================================================== */

function $assign(id) {
	// usage: $(element, { class: 'btn', click: () => { /* listener */ } });
	// usage: $('button', { aria: { label: 'title' } }, child);
	// usage: $('div', child1, child2, 'a new text node');
	// usage: $('http://www.w3.org/2000/svg|svg');

	const element = id instanceof Element ? id : / /.test(id) ? document.createElementNS(
		id.replace(/.* /, ''),
		id.replace(/ .*/, '')
	) : document.createElement(id);

	[].slice.call(arguments, 1).forEach((source) => {
		if (source instanceof Node) {
			// append sources that are nodes
			element.appendChild(source);
		} else if ('string' === typeof source) {
			// append strings as text nodes
			element.appendChild(
				document.createTextNode(source)
			);
		} else {
			__assignSource(element, source, '');
		}
	});

	return element;
}

/* Remove all the children from a parent node and optionally add new children
/* ========================================================================== */

function $empty(parentNode) {
	// usage: $empty(element);

	while (parentNode.lastChild) {
		parentNode.removeChild(parentNode.lastChild);
	}

	return parentNode;
}

/* Wrap a child node within an element
/* ========================================================================== */

function $wrapWith(childNode, element) {
	// usage: $wrapWith(element, wrappingElement);

	if (childNode.parentNode) {
		childNode.parentNode.insertBefore(element, childNode).appendChild(childNode);
	}

	return childNode;
}

/* Emerging DOM Functionality
/* ========================================================================== */

function __asFragment(nodes) {
	const fragment = document.createDocumentFragment();

	[].slice.call(nodes, 1).forEach((node) => {
		if (node instanceof Node) {
			fragment.appendChild(node);
		} else {
			fragment.appendChild(
				document.createTextNode(node)
			);
		}
	});

	return fragment;
}

/* Insert nodes after a child node
/* ========================================================================== */

function $after(childNode) {
	// usage: $after(element, sibling1, sibling2, 'a new text node');

	if (childNode.parentNode) {
		childNode.parentNode.insertBefore(
			__asFragment(arguments),
			childNode.nextSibling
		);
	}

	return childNode;
}

/* Appends nodes to a parent node
/* ========================================================================== */

function $append(parentNode) {
	// usage: $append(parentNode, child1, child2, 'a new text node');

	parentNode.append(
		__asFragment(arguments)
	);

	return parentNode;
}

/* Insert nodes before an element
/* ========================================================================== */

function $before(element) {
	// usage: $before(element, sibling1, sibling2, 'a new text node');

	if (element.parentNode) {
		element.parentNode.insertBefore(
			__asFragment(arguments),
			element
		);
	}

	return element;
}

/* Return the closest ancestor element matching a given selector
/* ========================================================================== */

function $closest(element, selectors) {
	// usage: $closest(element, selectors);

	let target = element;

	while (target && 1 === target.nodeType) {
		if ($matches(target, selectors)) {
			return target;
		}

		target = target.parentNode;
	}

	return null;
}

/* Return whether or not a DOM element matches a given selector
/* ========================================================================== */

function $matches(element, selectors) {
	// usage: $matches(element, selectors);

	const elements = element.parentNode.querySelectorAll(selectors);

	let index = 0;

	while (elements[index] && elements[index] !== element) {
		++index;
	}

	return Boolean(elements[index]);
}

/* Prepends a child to a parent node
/* ========================================================================== */

function $prepend(parentNode) {
	// usage: $prepend(element, child1, child2, 'a new text node');

	parentNode.insertBefore(
		__asFragment(arguments),
		parentNode.firstChild
	);

	return parentNode;
}

/* Remove a child node from its parent
/* ========================================================================== */

function $remove(childNode) {
	// usage: $remove(element);

	if (childNode.parentNode) {
		childNode.parentNode.removeChild(childNode);
	}

	return childNode;
}

/* Replace a child node with nodes
/* ========================================================================== */

function $replaceWith(childNode) {
	// usage: $replaceWith(element, sibling1, sibling2, 'a new text node');

	if (childNode.parentNode) {
		childNode.parentNode.replaceChild(
			__asFragment(arguments),
			childNode
		);
	}

	return childNode;
}

/* Emerging Event Functionality
/* ========================================================================== */

/* Dispatch an event on an element
/* ========================================================================== */

function $dispatch(type, element, detail) {
	// usage: $dispatch('click', element);
	// usage: $dispatch('custom', element, { some: 'detail value' });

	const event = document.createEvent('CustomEvent');

	event.initCustomEvent(type, true, true, detail);

	element.dispatchEvent(event);

	return element;
}

/* Fetch response text from a URL and pass it to a callback
/* ========================================================================== */

function $fetch(url, callback) {
	// usage: $fetch('api?foo=bar', (responseText) => {});

	const xhr = new XMLHttpRequest();

	xhr.addEventListener('readystatechange', () => {
		if (4 === xhr.readyState && 200 === xhr.status) {
			callback(xhr.responseText); // eslint-disable-line callback-return
		}
	});

	xhr.open('GET', url);
	xhr.send();

	return xhr;
}

/* Export
/* ========================================================================== */

export {
	$assign,
	$after,
	$append,
	$before,
	$closest,
	$dispatch,
	$empty,
	$fetch,
	$matches,
	$prepend,
	$remove,
	$replaceWith,
	$wrapWith
};
