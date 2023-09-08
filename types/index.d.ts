
declare module '@neumatter/enum'

declare class RevivedEnum<T extends string | number | symbol | undefined> extends Enum<T> {}

type EnumJSON<T> = Omit<T, 'keys'>

export type OmitIndexSignature<ObjectType> = {
	[KeyType in keyof ObjectType as {} extends Record<KeyType, unknown>
		? never
		: KeyType]: ObjectType[KeyType];
}

export type PickIndexSignature<ObjectType> = {
	[KeyType in keyof ObjectType as {} extends Record<KeyType, unknown>
		? KeyType
		: never]: ObjectType[KeyType];
}

type SimpleMerge<Destination, Source> = {
	[Key in keyof Destination as Key extends keyof Source ? never : Key]: Destination[Key];
} & Source

export type Merge<Destination, Source> = SimpleMerge<PickIndexSignature<Destination>, PickIndexSignature<Source>>
& SimpleMerge<OmitIndexSignature<Destination>, OmitIndexSignature<Source>>

type ToString<Type extends string | number | undefined> = `${Type}`

export default class Enum<T extends string | number | undefined> {
  static from<T extends Record<string | number, string | number>> (obj: T): typeof Enum & { [P in keyof T]: Enum<T[P]> }
  static initialize<T extends Record<string | number, string | number>> (obj: T): typeof Enum & { [P in keyof T]: Enum<T[P]> }

  static build (): typeof Enum

  static get<T extends string | number> (input: T): Enum<T>

  static getKey<T extends string | number> (input: T): Enum<T>['key']

  static getValue<T extends string | number> (input: T): Enum<T>['value']

  static has<T extends string | number> (input: T | Enum<string | number>): boolean

  static values<T extends string | number> (): IterableIterator<Enum<T>['value']>

  static entries<T extends string | number> (): IterableIterator<Enum<T>>

  static [Symbol.iterator]<T extends string | number> (): IterableIterator<Enum<T>>

  static toJSON<T extends string | number> (): EnumJSON<Enum<T>>

  static inspect (): string

  key: string
  value: T
  ordinal: number

  constructor (value?: T)

  is (input: this['key'] | this['value'] | this): boolean

  toKeyString (): `${Enum<T>['constructor']['name']}.${Enum<T>['key']}`

  toString (): ToString<this['value']>

  toJSON (): Enum<T>['value']
}
