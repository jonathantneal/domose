/* Creates or updates an element with attributes, events, and children
/* ========================================================================== */

function $(id, attrs, children) {
	// usage: $(element, { arialabel: 'some element', onclick: () => {} });
	// usage: $('div', { arialabel: 'new element', class: 'btn' }, [ child1, child2 ]);
	// usage: $('svg http://www.w3.org/2000/svg', { dataval: 'a data value' });

	const element = id instanceof Node ? id : /:/.test(id) ? document.createElementNS(
		id.replace(/.* /, ''),
		id.replace(/ .*/, '')
	) : document.createElement(id);

	for (let attr in attrs) {
		if (/^on/.test(attr)) {
			element.addEventListener(
				attr.replace(/^on/, ''),
				attrs[attr]
			);
		} else if (/ /.test(attr)) {
			element.setAttributeNS(
				attr.replace(/.* /, ''),
				attr.replace(/ .*/, ''),
				attrs[attr]
			);
		} else {
			element.setAttribute(
				attr.replace(/^(aria|data)/, '$&-'),
				attrs[attr]
			);
		}
	}

	$append(element, children);

	return element;
}

/* Removes attributes and events from an element
/* ========================================================================== */

function $_(element, rawattrs) {
	// usage: $_(element, 'arialabel class');
	// usage: $_(element, { 0: 'arialabel', onclick: () => {} });

	const attrs = 'string' === typeof rawattrs ? rawattrs.split(' ') : rawattrs;

	for (let attr in attrs) {
		if (/^on/.test(attr)) {
			element.removeEventListener(
				attr.replace(/^on/, ''),
				attrs[attr]
			);
		} else {
			element.removeAttribute(
				attrs[attr].replace(/.* /, '').replace(/^(aria|data)/, '$&-')
			);
		}
	}

	return element;
}

/* Insert content after an element
/* ========================================================================== */

function $after(element, content) {
	// usage: $after(element, selector);

	element.parentNode.insertBefore($asNode(content), element.nextElementSibling);

	return element;
}

/* Appends children to an element
/* ========================================================================== */

function $append(element, children) {
	// usage: $append(element, [ child1, child2 ]);
	// usage: $append(element, [ child1, 'a new text node' ]);

	for (let index in children) {
		element.appendChild(
			$asNode(children[index])
		);
	}

	return element;
}

/* Returns content as an Element or Text Node
/* ========================================================================== */

function $asNode(content) {
	return content instanceof Node ? content : document.createTextNode(content);
}

/* Insert content before an element
/* ========================================================================== */

function $before(element, content) {
	// usage: $before(element, selector);

	element.parentNode.insertBefore($asNode(content), element);

	return element;
}

/* Gets the closest ancestor element that matches the given selector
/* ========================================================================== */

function $closest(rawelement, selector) {
	// usage: $closest(element, selector);

	let element = rawelement;

	while (element && 1 === element.nodeType) {
		if ($matches(element, selector)) {
			return element;
		}

		element = element.parentNode;
	}

	return null;
}

/* Dispatches an event on an element
/* ========================================================================== */

function $dispatch(type, element, detail) {
	// usage: $dispatch('click', element);
	// usage: $dispatch('custom', element, { some: 'detail value' });

	const event = document.createEvent('CustomEvent');

	event.initCustomEvent(type, true, true, detail);

	element.dispatchEvent(event);

	return element;
}

/* Removes all the children of an element and optionally adds new children
/* ========================================================================== */

function $empty(element, children) {
	// usage: $empty(element);
	// usage: $empty(element, [ child1, child2 ]);
	// usage: $empty(element, [ child1, 'a new text' ]);

	while (element.lastChild) {
		element.removeChild(element.lastChild);
	}

	$append(element, children);

	return element;
}

/* Fetches response text from a URL and passes it to a callback
/* ========================================================================== */

function $fetch(url, callback) {
	// usage: $fetch('api?foo=bar', (responseText) => {});

	const xhr = $(new XMLHttpRequest(), {
		onreadystatechange: () => {
			if (4 === xhr.readyState && 200 === xhr.status) {
				callback(xhr.responseText); // eslint-disable-line callback-return
			}
		}
	});

	xhr.open('GET', url);
	xhr.send();

	return xhr;
}

/* Tests whether or not a DOM element matches a given selector
/* ========================================================================== */

function $matches(element, selector) {
	// usage: $matches(element, selector);

	const elements = (element.document || element.ownerDocument).querySelectorAll(selector);

	let index = 0;

	while (elements[index] && elements[index] !== element) {
		++index;
	}

	return Boolean(elements[index]);
}

/* Removes an element from its parent
/* ========================================================================== */

function $remove(element) {
	// usage: $remove(element);

	return element.parentNode && element.parentNode.removeChild(element);
}

/* Replaces an element within another element
/* ========================================================================== */

function $replaceWith(element, replacer) {
	// usage: $replaceWith(element, replacer);

	element.parentNode.replaceChild($asNode(replacer), element);

	return element;
}

/* Wraps an element within another element
/* ========================================================================== */

function $wrapWith(element, wrapper) {
	// usage: $wrapWith(element, wrapper);

	return element.parentNode.insertBefore(wrapper, element).appendChild(element);
}

/* Export
/* ========================================================================== */

export default $;

export {
	$,
	$_,
	$after,
	$append,
	$asNode,
	$before,
	$closest,
	$dispatch,
	$empty,
	$fetch,
	$matches,
	$remove,
	$replaceWith,
	$wrapWith
};
