
declare module '@neumatter/enum'

declare class RevivedEnum extends Enum {}

type EnumJSON<T> = Omit<T, 'keys'>

export default class Enum<T extends string | number | symbol> {
  static from<T> (obj: T): typeof RevivedEnum & { [P in keyof T]: RevivedEnum<T[P]> }
  static initialize<T> (obj: T): typeof this & { [P in keyof T]: Enum<T[P]> }

  static build (): typeof Enum<T>

  static get (input: Enum<T>['key'] | Enum<T>['value']): Enum<T>

  static getKey (input: Enum<T>['key'] | Enum<T>['value']): Enum<T>['key']

  static getValue (input: Enum<T>['key'] | Enum<T>['value']): Enum<T>['value']

  static has (input: Enum<T>['key'] | Enum<T>['value']): boolean

  static values (): IterableIterator<Enum<T>['value']>

  static entries (): IterableIterator<Enum<T>>

  static [Symbol.iterator] (): IterableIterator<Enum<T>>

  static toJSON (): EnumJSON<Enum<T>>

  static inspect (): string

  key: string
  value: T
  ordinal: number

  /**
   *
   * @param {T} value
   */
  constructor (value?: T | undefined)

  is (input: Enum<T>['key'] | Enum<T>['value'] | Enum<T>): boolean

  toKeyString (): `${Enum<T>['constructor']['name']}.${Enum<T>['key']}`

  toString (): `${Enum<T>['value']}`

  toJSON (): Enum<T>['value']
}
