# Domose [<img src="https://jonathantneal.github.io/domose/domose.svg" alt="Domose" width="90" height="90" align="right">][Domose]

> Old Fashioned DOM Sugar

[Domose] is one of those old fashioned sugary micro libraries that aims to give
you delicious DOM functionality in every browser.

```sh
npm install domose --save
```

Some of this stuff should be native, and I hope one day it is. Other stuff here
is native, so only use it when you still need to support IE9 or Edge and can’t
justify the polyfill. Everything here is modular, so you can just use the parts
you need. Everything is also super tiny, so even using the whole thing costs
less than 1 kilobyte.

## Speculative DOM Functionality

Here are some no-nonsense explanations about new functionality you’ll get.

### The $assign Method

The `$assign` method assigns an element with attributes, events, and children.
It returns the element.

```js
import { $assign } from 'domose';
```

Create an Element when the first argument is a string:

```js
$assign('div');
```

Append nodes with the second argument onward:

```js
$assign(element, ...nodes);
```

Add event listeners with Function values in the second argument onward:

```js
$assign(element, { click: (event) => { console.log(event) } });
```

Or set dashed attributes from Object values:

```js
$assign(element, { aria: { label: 'This text is an aria label.' } });
```

Or set any other attribute:

```js
$assign(element, { role: 'button' });
```

And work with namespaced elements:

```js
$assign(
  document.createElementNS('http://www.w3.org/2000/svg', 'svg'),
  {
    viewBox: '0 0 32 32'
  }
);
```

I’ve proposed a native
[`assign()`](https://github.com/whatwg/dom/issues/477) method.

**Cost**: Up to 252 bytes to your gzipped script.

### The $replaceAll Method

The `$replaceAll` method removes all children from an element, optionally
appending new children.

```js
import { $replaceAll } from 'domose';

$replaceAll(element);
```

I’ve proposed a native
[`replaceAll()`](https://github.com/whatwg/dom/issues/479) method.

**Cost**: Up to 189 bytes to your gzipped script.

### The $wrapWith Method

The `$wrapWith` method wraps an element within another element. It returns the
element.

```js
import { $wrapWith } from 'domose';

$wrapWith(element, wrapperElement);
```

I’ve proposed a native
[`wrapWith()`](https://github.com/whatwg/dom/issues/479) method.

**Cost**: Up to 85 bytes to your gzipped script.

## Emerging DOM Functionality

Use these methods when your supported browsers can’t do them on their own, and
when you’re not in a position to add a polyfill.

### The $after Method

The `$after` method inserts content after an element. It returns the element.
If possible, use the native [`after`] method, which works in a similar way.

```js
import { $after } from 'domose';

$after(element, sibling1, sibling2, 'a new text node');
```

**Cost**: Up to 98 bytes to your gzipped script.

### The $append Method

The `$append` method appends children to an element. It returns the element. If
possible, use the native [`append`] method, which works in a similar way.

```js
import { $append } from 'domose';

$append(element, child1, child2);
$append(element, child1, 'a new text node');
```

**Cost**: Up to 116 bytes to your gzipped script.

### The $before Method

The `$before` method inserts content before an element. It returns the element.
If possible, use the native [`before`] method, which works in a similar way.

```js
import { $before } from 'domose';

$before(element, sibling1, sibling2, 'a new text node');
```

**Cost**: Up to 80 bytes to your gzipped script.

### The $closest Method

The `$closest` method returns the closest ancestor element that matches a
given selector. If possible, use the native [`closest`] method, which works in
a similar way.

```js
import { $closest } from 'domose';

$closest(element, '.some-class');
```

**Cost**: Up to 182 bytes to your gzipped script.

### The $matches Methods

The `$matches` method returns whether or not a DOM element matches a given
selector. If possible, use the native [`matches`] method, which works in a
similar way.

```js
import { $matches } from 'domose';

$matches(element, '.some-class');
```

**Cost**: Up to 128 bytes to your gzipped script.

### The $prepend Method

The `$prepend` method prepends children to an element. It returns the element. If
possible, use the native [`prepend`] method, which works in a similar way.

```js
import { $prepend } from 'domose';

$prepend(element, child1, child2);
$prepend(element, child1, 'a new text node');
```

**Cost**: Up to 182 bytes to your gzipped script.

### The $remove Method

The `$remove` method removes an element from its parent. It returns the
element. If possible, use the native `remove` method, which works in a similar
way.

```js
import { $remove } from 'domose';

$remove(element);
```

**Cost**: Up to 69 bytes to your gzipped script.

### The $replaceWith Method

The `$replaceWith` method replaces an element within another element. It
returns the element. If possible, use the native [`replaceWith`] method, which
works in a similar way.

```js
import { $replaceWith } from 'domose';

$replaceWith(element, replacer);
```

**Cost**: Up to 63 bytes to your gzipped script.

## Emerging Event Functionality

Use these methods when your supported browsers can’t do them on their own, and
you’re not in a position to add a polyfill.

### The $CustomEvent Method

The `$CustomEvent` creates a custom event. If possible, probably use the native
`new MouseEvent()`, `new CustomEvent()`, etc. methods.

```js
import { $CustomEvent } from 'domose';

element.dispatchEvent(new $CustomEvent('click', { bubbles: true }));
element.dispatchEvent(new $CustomEvent('foo', { detail: { bar: 'qux' } });
```

**Cost**: Up to 154 bytes to your gzipped script.

### The $fetch Method

The `$fetch` method fetches response text from a URL and passes it to a
callback. It returns the XHR request (which is how it works). If possible,
please use the native `fetch` method, which is totally better than this.

```js
import { $fetch } from 'domose';

$fetch('api?foo=bar', (responseText) => { /* do something */ });
```

**Cost**: Up to 159 bytes to your gzipped script.

[Domose]: https://github.com/jonathantneal/domose

[`after`]: http://caniuse.com/#feat=dom-manip-convenience
[`append`]: http://caniuse.com/#feat=dom-manip-convenience
[`before`]: http://caniuse.com/#feat=dom-manip-convenience
[`closest`]: http://caniuse.com/#feat=element-closest
[`matches`]: http://caniuse.com/#search=matches
[`prepend`]: http://caniuse.com/#feat=dom-manip-convenience
[`replaceWith`]: http://caniuse.com/#feat=dom-manip-convenience
