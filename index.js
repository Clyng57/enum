
export default class Enum {
  static from (obj) {
    class RevivedEnum extends Enum {}
    const keys = Object.keys(obj)

    for (let index = 0; index < keys.length; index++) {
      const key = keys[index]
      RevivedEnum[key] = new RevivedEnum(obj[key])
    }

    RevivedEnum.build()
    return RevivedEnum
  }

  /**
   *
   * @template {object} T
   * @param {T} obj
   * @returns {typeof this & {[P in keyof T]: Enum<T[P]>} }
   */
  static initialize (obj) {
    const keys = Object.keys(obj)

    for (let index = 0; index < keys.length; index++) {
      const key = keys[index]
      this[key] = new this(obj[key])
    }

    this.build()
    return this
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
        if (this[key].ordinal === undefined) {
          this[key].ordinal = index
        }

        this.keys[index] = this[key].key
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

    throw new SyntaxError(`${input} does not exist in ${this.name}`)
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

    throw new SyntaxError(`${input} does not exist in ${this.name}`)
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

    throw new SyntaxError(`${input} does not exist in ${this.name}`)
  }

  static has (input) {
    if (this[input] !== undefined) {
      return true
    }

    for (let index = 0; index < this.keys.length; index++) {
      const item = this[this.keys[index]]
      if (item.value === input) {
        return true
      }
    }

    return false
  }

  static values () {
    const self = this
    let index = -1

    return {
      next: () => {
        if (++index >= self.keys.length) {
          return {
            value: undefined,
            done: true
          }
        }

        return {
          value: self[self.keys[index]].value,
          done: false
        }
      },
      [Symbol.iterator] () {
        return this
      }
    }
  }

  static entries () {
    return this[Symbol.iterator]()
  }

  static [Symbol.iterator] () {
    const self = this
    let index = -1

    return {
      next: () => {
        if (++index >= self.keys.length) {
          return {
            value: undefined,
            done: true
          }
        }

        return {
          value: self[self.keys[index]],
          done: false
        }
      },
      [Symbol.iterator] () {
        return this
      }
    }
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
  ordinal

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
