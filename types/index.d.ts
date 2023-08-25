
declare module '@neumatter/enum'

declare class RevivedEnum extends Enum {}

type EnumJSON<T> = Omit<T, 'keys'>

export default class Enum {
  /**
   *
   * @template {object} T
   * @param {T} obj
   * @returns {typeof RevivedEnum & T}
   */
  static from<T> (obj: T): typeof RevivedEnum & T

  static build (): typeof Enum

  static get (input: Enum['key'] | Enum['value']): Enum

  static getKey (input: Enum['key'] | Enum['value']): Enum['key']

  static getValue (input: Enum['key'] | Enum['value']): Enum['value']

  static toJSON (): EnumJSON<Enum>

  static inspect (): string

  key: string
  value: string | number

  /**
   *
   * @param {string | number} value
   */
  constructor (value?: string | number | undefined)

  is (input: Enum['key'] | Enum['value'] | Enum): boolean

  toKeyString (): `${Enum['constructor']['name']}.${Enum['key']}`

  toString (): `${Enum['value']}`

  toJSON (): Enum['value']
}
