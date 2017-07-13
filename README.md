# Domose [<img src="https://jonathantneal.github.io/domose/domose.svg" alt="Domose" width="90" height="90" align="right">][Domose]

> Old Fashioned DOM Sugar

[Domose] is one of those old fashioned sugary micro libraries that aims to give
you delicious DOM functionality in every browser.

```sh
npm install jonathantneal/domose --save
```

Half of this stuff should be native, and I hope one day it is. The other half
is here because I still support IE9 or IE11 often enough. The good news is,
it’s all super tiny, so even using the whole thing costs about 500 bytes.

---

Here are some no-nonsense explanations about the functionality you’ll get.

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

**Cost**: Up to 268 bytes to your gzipped script.

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

### The $wrap Method

The `$wrap` method wraps an element within another element. It returns the
element.

```js
import { $wrap } from 'domose';

$wrap(element, wrapper);
```

We also need a native `wrap` method, wouldn’t you agree?

**Cost**: Up to 75 bytes to your gzipped script.

---

You can also use some lesser DOM4-like functions are available to you. Use
these when your supported browsers can’t do them on their own.

### The $append Method

The `$append` method appends children to an element. It returns the element. If
possible, use the native `append`, which works in a similar way.

```js
import { $append } from 'domose';

$append(element, [ child1, child2 ]);
$append(element, [ child1, 'a new text node' ]);
```

**Cost**: Up to 116 bytes to your gzipped script.

### The $remove Method

The `$remove` method removes an element from its parent. It returns the
element. If possible, use the native `remove`, which works the same way.

```js
import { $remove } from 'domose';

$remove(element);
```

**Cost**: Up to 69 bytes to your gzipped script.

### The $replace Method

The `$replace` method replaces an element within another element. It returns
the element. If possible, use the native `replaceWith`, which works the same way.

```js
import { $replace } from 'domose';

$replace(element, replacer);
```

**Cost**: Up to 63 bytes to your gzipped script.

### The $dispatch Method

The `$dispatch` method dispatches an event on an element. It returns the
element. If possible, probably use the native `new MouseEvent()`, `new CustomEvent()`, etc even though
they're way uglier to write out.

```js
import { $dispatch } from 'domose';

$dispatch('click', element);
$dispatch('custom', element, { some: 'detail value' });
```

**Cost**: Up to 116 bytes to your gzipped script.

### The $fetch Method

The `$fetch` method fetches response text from a URL and passes it to a
callback. It returns the XHR request, which is how it works. If possible,
please use the native `fetch`, which is totally better than this.

```js
import { $fetch } from 'domose';

$fetch('api?foo=bar', (responseText) => { /* do something */ });
```

**Cost**: Up to 159 bytes to your gzipped script.

[Domose]: https://github.com/jonathantneal/domose
