
# Enum
[![JavaScript Style Guide](https://cdn.rawgit.com/standard/standard/master/badge.svg)](https://github.com/standard/standard)

<br />

## Table of Contents
- [ Installation ](#install)
- [ Usage ](#Usage)

<br />

<a name="install"></a>
## Install

```console
npm i @neumatter/enum
```

<br />

<a name="Useage"></a>
## Building Enums

```js
import Enum from '@neumatter/enum'

class Color extends Enum {
  static Blue = new Color()
  static Green = new Color()
  static Red = new Color()
}

const Color = Enum.from({
  Blue: 0,
  Green: 1,
  Red: 2
})

// Builds the objects and freezes all objects within Enum to prevent changes.
Color.build()

Color.Blue.is('Blue') // returns true
Color.Blue.is(0) // returns true
Color.Blue.is(Color.Blue) // returns true

Color.Blue.get('Blue') // returns { key: 'Blue', value: 0 }
Color.Blue.get(0) // returns { key: 'Blue', value: 0 }

Color.getKey('Blue') // returns 'Blue'
Color.getKey(0) // returns 'Blue'

Color.getValue('Blue') // returns 0
Color.getValue(0) // returns 0

Color.Blue.toString() // returns '0'

Color.Blue.toJSON() // returns 0
```
