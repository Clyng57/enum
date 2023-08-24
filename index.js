
export class NullObject {
  /**
   *
   * @template {{}} Type
   * @param {Type} obj
   * @returns {NullObject & Type}
   */
  static create (obj) {
    const nullObject = new NullObject()
    return Object.assign(nullObject, obj)
  }

  /**
   *
   * @template {NullObject} N
   * @template {{}} T
   * @param {N} nullObject
   * @param {T} obj
   * @returns {N & T}
   */
  static assign (nullObject, obj) {
    return Object.assign(nullObject, obj)
  }

  constructor () {
    Object.setPrototypeOf(this, null)
  }
}

export class FrozenObject {
  /**
   *
   * @template {{}} Type
   * @param {Type} obj
   * @returns {Readonly<FrozenObject & Type>}
   */
  static create (obj) {
    return new FrozenObject(obj)
  }

  isFrozenObject (obj) {
    return obj instanceof FrozenObject
  }

  constructor (obj) {
    Object.assign(this, obj)
    Object.freeze(this)
  }
}

export default class Enum {
  /**
   *
   * @template {object} T
   * @param {T} obj
   * @returns {typeof RevivedEnum & T}
   */
  static from (obj) {
    const keys = Object.keys(obj)
    // this.keys = []
    const RevivedEnum = class extends Enum {}

    for (let index = 0; index < keys.length; index++) {
      const key = keys[index]
      RevivedEnum[key] = new RevivedEnum(obj[key])
    }

    RevivedEnum.build()
    return RevivedEnum
  }

  static build () {
    const keys = Object.keys(this)
    this.keys = []

    for (let index = 0; index < keys.length; index++) {
      const key = keys[index]
      if (this[key] instanceof this) {
        if (this[key].value === undefined) {
          this[key].value = index
        }
        if (this[key].key === undefined) {
          this[key].key = key
        }

        this.keys.push(this[key].key)
        Object.freeze(this[key])
      }
    }

    Object.freeze(this.keys)
    return Object.freeze(this)
  }

  static get (input) {
    if (this[input] !== undefined) {
      return this[input]
    }

    for (let index = 0; index < this.keys.length; index++) {
      const item = this[this.keys[index]]
      if (item.value === input) {
        return item
      }
    }

    return undefined
  }

  static getKey (input) {
    if (this[input] !== undefined) {
      return this[input].key
    }

    for (let index = 0; index < this.keys.length; index++) {
      const item = this[this.keys[index]]
      if (item.value === input) {
        return item.key
      }
    }

    return undefined
  }

  static getValue (input) {
    if (this[input] !== undefined) {
      return this[input].value
    }

    for (let index = 0; index < this.keys.length; index++) {
      const item = this[this.keys[index]]
      if (item.value === input) {
        return item.value
      }
    }

    return undefined
  }

  static toJSON () {
    const response = {}

    for (let index = 0; index < this.keys.length; index++) {
      response[this.keys[index]] = this[this.keys[index]].toJSON()
    }

    return response
  }

  static inspect () {
    return this.name + ' ' + JSON.stringify(this.toJSON(), undefined, 2).replace(/"([A-Za-z0-9_]+)":/g, '$1:')
  }

  static [Symbol.for('nodejs.util.inspect.custom')] () {
    return this.inspect()
  }

  key
  value

  /**
   *
   * @param {string | number} value
   */
  constructor (value) {
    if (value !== undefined) {
      this.value = value
    }
  }

  is (input) {
    return (
      this.value === input ||
      this.key === input || (
        input instanceof this.constructor &&
        this.key === input.key &&
        this.value === input.value
      )
    )
  }

  toKeyString () {
    return this.constructor.name + '.' + this.key
  }

  toString () {
    return String(this.value)
  }

  toJSON () {
    return this.value
  }

  [Symbol.for('nodejs.util.inspect.custom')] () {
    return this.toKeyString() + ' (' + this.value + ')'
  }
}

/**
 *
 * @template T
 */
export class NullArray extends Array {
  /**
   *
   * @param {object | Array<T>} array
   * @returns {{ [P: string]: T, length: number }}
   */
  create (array) {
    const nullArray = new NullArray(array)
    return nullArray
  }

  constructor (array) {
    super(array)
    Object.setPrototypeOf(this, null)
  }
}
