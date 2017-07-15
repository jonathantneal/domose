# Domose [<img src="https://jonathantneal.github.io/domose/domose.svg" alt="Domose" width="90" height="90" align="right">][Domose]

> Old Fashioned DOM Sugar

[Domose] is one of those old fashioned sugary micro libraries that aims to give
you delicious DOM functionality in every browser.

```sh
npm install domose --save
```

Half of this stuff should be native, and I hope one day it is. The other half
is here because I still support IE9 or Edge often enough. The good news is,
it’s all modular, so you can just use the parts you need, and it’s also super
tiny, so even using the whole thing costs less than 1 kilobyte.

Here are some no-nonsense explanations about new functionality you’ll get.

### The $ Method

The `$` method creates or updates an element with attributes, events, and
children. It returns the element.

```js
import { $ } from 'domose';

$(element, { arialabel: 'some element', onclick: () => { /* do something */ } });
$('button', { arialabel: 'new element', class: 'btn' }, [ child1, child2 ]);
$('svg http://www.w3.org/2000/svg', { dataval: 'a data value' });
```

Did I mention that `arialabel` becomes `aria-label` and `dataval` becomes
`data-val`? I think that’s kinda cool.

**Cost**: Up to 278 bytes to your gzipped script.

### The $_ Method

The `$_` method removes attributes and events from an element. It returns the
element.

```js
import { $_ } from 'domose';

$_(element, 'arialabel class');
$_(element, { 0: 'arialabel', onclick: () => {} });
```

Things like `arialabel` becomes `aria-label`, just like with the `$` method.

**Cost**: Up to 176 bytes to your gzipped script.

### The $empty Method

The `$empty` method removes all the children in an element and optionally adds
new children. It returns the element.

```js
import { $empty } from 'domose';

$empty(element);
$empty(element, [ child1, child2 ]);
$empty(element, [ child1, 'a new text node' ]);
```

We need a native `empty` method, I think.

**Cost**: Up to 88 bytes to your gzipped script.

### The $wrapWith Method

The `$wrapWith` method wraps an element within another element. It returns the
element.

```js
import { $wrapWith } from 'domose';

$wrapWith(element, wrapper);
```

We also need a native `wrapWith` method, wouldn’t you agree?

**Cost**: Up to 75 bytes to your gzipped script.

## Modern DOM Methods

You might also enjoy these DOM4+ methods. Use these when your supported
browsers can’t do them on their own, and you’re not in a position to add a
polyfill.

### The $after Method

The `$after` method inserts content after an element. It returns the element.
If possible, use the native [`after`] method, which works in a similar way.

```js
import { $after } from 'domose';

$after(element, [ sibling1, sibling2 ]);
$after(element, [ sibling1, 'a new text node' ]);
```

**Cost**: Up to 98 bytes to your gzipped script.

### The $append Method

The `$append` method appends children to an element. It returns the element. If
possible, use the native [`append`] method, which works in a similar way.

```js
import { $append } from 'domose';

$append(element, [ child1, child2 ]);
$append(element, [ child1, 'a new text node' ]);
```

**Cost**: Up to 116 bytes to your gzipped script.

### The $before Method

The `$before` method inserts content before an element. It returns the element.
If possible, use the native [`before`] method, which works in a similar way.

```js
import { $before } from 'domose';

$before(element, [ sibling1, sibling2 ]);
$before(element, [ sibling1, 'a new text node' ]);
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

## Event Fallbacks

You might also enjoy these modern event methods. Use these when your supported
browsers can’t do them on their own, and you’re not in a position to add a
polyfill.

### The $dispatch Method

The `$dispatch` method dispatches an event on an element. It returns the
element. If possible, probably use the native `new MouseEvent()`,
`new CustomEvent()`, etc. methods, even though they're way uglier to write out.

```js
import { $dispatch } from 'domose';

$dispatch('click', element);
$dispatch('custom', element, { some: 'detail value' });
```

**Cost**: Up to 116 bytes to your gzipped script.

### The $fetch Method

The `$fetch` method fetches response text from a URL and passes it to a
callback. It returns the XHR request, which is how it works. If possible,
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
