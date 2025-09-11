
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model coments
 * 
 */
export type coments = $Result.DefaultSelection<Prisma.$comentsPayload>
/**
 * Model post
 * 
 */
export type post = $Result.DefaultSelection<Prisma.$postPayload>
/**
 * Model responses
 * 
 */
export type responses = $Result.DefaultSelection<Prisma.$responsesPayload>
/**
 * Model users
 * 
 */
export type users = $Result.DefaultSelection<Prisma.$usersPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const users_acesso: {
  user: 'user',
  admin: 'admin'
};

export type users_acesso = (typeof users_acesso)[keyof typeof users_acesso]

}

export type users_acesso = $Enums.users_acesso

export const users_acesso: typeof $Enums.users_acesso

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Coments
 * const coments = await prisma.coments.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Coments
   * const coments = await prisma.coments.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.coments`: Exposes CRUD operations for the **coments** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Coments
    * const coments = await prisma.coments.findMany()
    * ```
    */
  get coments(): Prisma.comentsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.post`: Exposes CRUD operations for the **post** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Posts
    * const posts = await prisma.post.findMany()
    * ```
    */
  get post(): Prisma.postDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.responses`: Exposes CRUD operations for the **responses** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Responses
    * const responses = await prisma.responses.findMany()
    * ```
    */
  get responses(): Prisma.responsesDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.users`: Exposes CRUD operations for the **users** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.users.findMany()
    * ```
    */
  get users(): Prisma.usersDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.15.0
   * Query Engine version: 85179d7826409ee107a6ba334b5e305ae3fba9fb
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    coments: 'coments',
    post: 'post',
    responses: 'responses',
    users: 'users'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "coments" | "post" | "responses" | "users"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      coments: {
        payload: Prisma.$comentsPayload<ExtArgs>
        fields: Prisma.comentsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.comentsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$comentsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.comentsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$comentsPayload>
          }
          findFirst: {
            args: Prisma.comentsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$comentsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.comentsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$comentsPayload>
          }
          findMany: {
            args: Prisma.comentsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$comentsPayload>[]
          }
          create: {
            args: Prisma.comentsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$comentsPayload>
          }
          createMany: {
            args: Prisma.comentsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.comentsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$comentsPayload>
          }
          update: {
            args: Prisma.comentsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$comentsPayload>
          }
          deleteMany: {
            args: Prisma.comentsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.comentsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.comentsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$comentsPayload>
          }
          aggregate: {
            args: Prisma.ComentsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateComents>
          }
          groupBy: {
            args: Prisma.comentsGroupByArgs<ExtArgs>
            result: $Utils.Optional<ComentsGroupByOutputType>[]
          }
          count: {
            args: Prisma.comentsCountArgs<ExtArgs>
            result: $Utils.Optional<ComentsCountAggregateOutputType> | number
          }
        }
      }
      post: {
        payload: Prisma.$postPayload<ExtArgs>
        fields: Prisma.postFieldRefs
        operations: {
          findUnique: {
            args: Prisma.postFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$postPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.postFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$postPayload>
          }
          findFirst: {
            args: Prisma.postFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$postPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.postFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$postPayload>
          }
          findMany: {
            args: Prisma.postFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$postPayload>[]
          }
          create: {
            args: Prisma.postCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$postPayload>
          }
          createMany: {
            args: Prisma.postCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.postDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$postPayload>
          }
          update: {
            args: Prisma.postUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$postPayload>
          }
          deleteMany: {
            args: Prisma.postDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.postUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.postUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$postPayload>
          }
          aggregate: {
            args: Prisma.PostAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePost>
          }
          groupBy: {
            args: Prisma.postGroupByArgs<ExtArgs>
            result: $Utils.Optional<PostGroupByOutputType>[]
          }
          count: {
            args: Prisma.postCountArgs<ExtArgs>
            result: $Utils.Optional<PostCountAggregateOutputType> | number
          }
        }
      }
      responses: {
        payload: Prisma.$responsesPayload<ExtArgs>
        fields: Prisma.responsesFieldRefs
        operations: {
          findUnique: {
            args: Prisma.responsesFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$responsesPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.responsesFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$responsesPayload>
          }
          findFirst: {
            args: Prisma.responsesFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$responsesPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.responsesFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$responsesPayload>
          }
          findMany: {
            args: Prisma.responsesFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$responsesPayload>[]
          }
          create: {
            args: Prisma.responsesCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$responsesPayload>
          }
          createMany: {
            args: Prisma.responsesCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.responsesDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$responsesPayload>
          }
          update: {
            args: Prisma.responsesUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$responsesPayload>
          }
          deleteMany: {
            args: Prisma.responsesDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.responsesUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.responsesUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$responsesPayload>
          }
          aggregate: {
            args: Prisma.ResponsesAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateResponses>
          }
          groupBy: {
            args: Prisma.responsesGroupByArgs<ExtArgs>
            result: $Utils.Optional<ResponsesGroupByOutputType>[]
          }
          count: {
            args: Prisma.responsesCountArgs<ExtArgs>
            result: $Utils.Optional<ResponsesCountAggregateOutputType> | number
          }
        }
      }
      users: {
        payload: Prisma.$usersPayload<ExtArgs>
        fields: Prisma.usersFieldRefs
        operations: {
          findUnique: {
            args: Prisma.usersFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.usersFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>
          }
          findFirst: {
            args: Prisma.usersFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.usersFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>
          }
          findMany: {
            args: Prisma.usersFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>[]
          }
          create: {
            args: Prisma.usersCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>
          }
          createMany: {
            args: Prisma.usersCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.usersDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>
          }
          update: {
            args: Prisma.usersUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>
          }
          deleteMany: {
            args: Prisma.usersDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.usersUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.usersUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>
          }
          aggregate: {
            args: Prisma.UsersAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUsers>
          }
          groupBy: {
            args: Prisma.usersGroupByArgs<ExtArgs>
            result: $Utils.Optional<UsersGroupByOutputType>[]
          }
          count: {
            args: Prisma.usersCountArgs<ExtArgs>
            result: $Utils.Optional<UsersCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    coments?: comentsOmit
    post?: postOmit
    responses?: responsesOmit
    users?: usersOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type PostCountOutputType
   */

  export type PostCountOutputType = {
    coments: number
    responses: number
  }

  export type PostCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    coments?: boolean | PostCountOutputTypeCountComentsArgs
    responses?: boolean | PostCountOutputTypeCountResponsesArgs
  }

  // Custom InputTypes
  /**
   * PostCountOutputType without action
   */
  export type PostCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostCountOutputType
     */
    select?: PostCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * PostCountOutputType without action
   */
  export type PostCountOutputTypeCountComentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: comentsWhereInput
  }

  /**
   * PostCountOutputType without action
   */
  export type PostCountOutputTypeCountResponsesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: responsesWhereInput
  }


  /**
   * Count Type UsersCountOutputType
   */

  export type UsersCountOutputType = {
    coments: number
    post: number
    responses: number
  }

  export type UsersCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    coments?: boolean | UsersCountOutputTypeCountComentsArgs
    post?: boolean | UsersCountOutputTypeCountPostArgs
    responses?: boolean | UsersCountOutputTypeCountResponsesArgs
  }

  // Custom InputTypes
  /**
   * UsersCountOutputType without action
   */
  export type UsersCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsersCountOutputType
     */
    select?: UsersCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UsersCountOutputType without action
   */
  export type UsersCountOutputTypeCountComentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: comentsWhereInput
  }

  /**
   * UsersCountOutputType without action
   */
  export type UsersCountOutputTypeCountPostArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: postWhereInput
  }

  /**
   * UsersCountOutputType without action
   */
  export type UsersCountOutputTypeCountResponsesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: responsesWhereInput
  }


  /**
   * Models
   */

  /**
   * Model coments
   */

  export type AggregateComents = {
    _count: ComentsCountAggregateOutputType | null
    _avg: ComentsAvgAggregateOutputType | null
    _sum: ComentsSumAggregateOutputType | null
    _min: ComentsMinAggregateOutputType | null
    _max: ComentsMaxAggregateOutputType | null
  }

  export type ComentsAvgAggregateOutputType = {
    idComents: number | null
    Users_id: number | null
    Post_idPost: number | null
  }

  export type ComentsSumAggregateOutputType = {
    idComents: number | null
    Users_id: number | null
    Post_idPost: number | null
  }

  export type ComentsMinAggregateOutputType = {
    idComents: number | null
    content: string | null
    createdAt: Date | null
    Users_id: number | null
    Post_idPost: number | null
  }

  export type ComentsMaxAggregateOutputType = {
    idComents: number | null
    content: string | null
    createdAt: Date | null
    Users_id: number | null
    Post_idPost: number | null
  }

  export type ComentsCountAggregateOutputType = {
    idComents: number
    content: number
    createdAt: number
    Users_id: number
    Post_idPost: number
    _all: number
  }


  export type ComentsAvgAggregateInputType = {
    idComents?: true
    Users_id?: true
    Post_idPost?: true
  }

  export type ComentsSumAggregateInputType = {
    idComents?: true
    Users_id?: true
    Post_idPost?: true
  }

  export type ComentsMinAggregateInputType = {
    idComents?: true
    content?: true
    createdAt?: true
    Users_id?: true
    Post_idPost?: true
  }

  export type ComentsMaxAggregateInputType = {
    idComents?: true
    content?: true
    createdAt?: true
    Users_id?: true
    Post_idPost?: true
  }

  export type ComentsCountAggregateInputType = {
    idComents?: true
    content?: true
    createdAt?: true
    Users_id?: true
    Post_idPost?: true
    _all?: true
  }

  export type ComentsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which coments to aggregate.
     */
    where?: comentsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of coments to fetch.
     */
    orderBy?: comentsOrderByWithRelationInput | comentsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: comentsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` coments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` coments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned coments
    **/
    _count?: true | ComentsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ComentsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ComentsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ComentsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ComentsMaxAggregateInputType
  }

  export type GetComentsAggregateType<T extends ComentsAggregateArgs> = {
        [P in keyof T & keyof AggregateComents]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateComents[P]>
      : GetScalarType<T[P], AggregateComents[P]>
  }




  export type comentsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: comentsWhereInput
    orderBy?: comentsOrderByWithAggregationInput | comentsOrderByWithAggregationInput[]
    by: ComentsScalarFieldEnum[] | ComentsScalarFieldEnum
    having?: comentsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ComentsCountAggregateInputType | true
    _avg?: ComentsAvgAggregateInputType
    _sum?: ComentsSumAggregateInputType
    _min?: ComentsMinAggregateInputType
    _max?: ComentsMaxAggregateInputType
  }

  export type ComentsGroupByOutputType = {
    idComents: number
    content: string
    createdAt: Date
    Users_id: number
    Post_idPost: number
    _count: ComentsCountAggregateOutputType | null
    _avg: ComentsAvgAggregateOutputType | null
    _sum: ComentsSumAggregateOutputType | null
    _min: ComentsMinAggregateOutputType | null
    _max: ComentsMaxAggregateOutputType | null
  }

  type GetComentsGroupByPayload<T extends comentsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ComentsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ComentsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ComentsGroupByOutputType[P]>
            : GetScalarType<T[P], ComentsGroupByOutputType[P]>
        }
      >
    >


  export type comentsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    idComents?: boolean
    content?: boolean
    createdAt?: boolean
    Users_id?: boolean
    Post_idPost?: boolean
    post?: boolean | postDefaultArgs<ExtArgs>
    users?: boolean | usersDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["coments"]>



  export type comentsSelectScalar = {
    idComents?: boolean
    content?: boolean
    createdAt?: boolean
    Users_id?: boolean
    Post_idPost?: boolean
  }

  export type comentsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"idComents" | "content" | "createdAt" | "Users_id" | "Post_idPost", ExtArgs["result"]["coments"]>
  export type comentsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    post?: boolean | postDefaultArgs<ExtArgs>
    users?: boolean | usersDefaultArgs<ExtArgs>
  }

  export type $comentsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "coments"
    objects: {
      post: Prisma.$postPayload<ExtArgs>
      users: Prisma.$usersPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      idComents: number
      content: string
      createdAt: Date
      Users_id: number
      Post_idPost: number
    }, ExtArgs["result"]["coments"]>
    composites: {}
  }

  type comentsGetPayload<S extends boolean | null | undefined | comentsDefaultArgs> = $Result.GetResult<Prisma.$comentsPayload, S>

  type comentsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<comentsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ComentsCountAggregateInputType | true
    }

  export interface comentsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['coments'], meta: { name: 'coments' } }
    /**
     * Find zero or one Coments that matches the filter.
     * @param {comentsFindUniqueArgs} args - Arguments to find a Coments
     * @example
     * // Get one Coments
     * const coments = await prisma.coments.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends comentsFindUniqueArgs>(args: SelectSubset<T, comentsFindUniqueArgs<ExtArgs>>): Prisma__comentsClient<$Result.GetResult<Prisma.$comentsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Coments that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {comentsFindUniqueOrThrowArgs} args - Arguments to find a Coments
     * @example
     * // Get one Coments
     * const coments = await prisma.coments.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends comentsFindUniqueOrThrowArgs>(args: SelectSubset<T, comentsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__comentsClient<$Result.GetResult<Prisma.$comentsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Coments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {comentsFindFirstArgs} args - Arguments to find a Coments
     * @example
     * // Get one Coments
     * const coments = await prisma.coments.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends comentsFindFirstArgs>(args?: SelectSubset<T, comentsFindFirstArgs<ExtArgs>>): Prisma__comentsClient<$Result.GetResult<Prisma.$comentsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Coments that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {comentsFindFirstOrThrowArgs} args - Arguments to find a Coments
     * @example
     * // Get one Coments
     * const coments = await prisma.coments.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends comentsFindFirstOrThrowArgs>(args?: SelectSubset<T, comentsFindFirstOrThrowArgs<ExtArgs>>): Prisma__comentsClient<$Result.GetResult<Prisma.$comentsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Coments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {comentsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Coments
     * const coments = await prisma.coments.findMany()
     * 
     * // Get first 10 Coments
     * const coments = await prisma.coments.findMany({ take: 10 })
     * 
     * // Only select the `idComents`
     * const comentsWithIdComentsOnly = await prisma.coments.findMany({ select: { idComents: true } })
     * 
     */
    findMany<T extends comentsFindManyArgs>(args?: SelectSubset<T, comentsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$comentsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Coments.
     * @param {comentsCreateArgs} args - Arguments to create a Coments.
     * @example
     * // Create one Coments
     * const Coments = await prisma.coments.create({
     *   data: {
     *     // ... data to create a Coments
     *   }
     * })
     * 
     */
    create<T extends comentsCreateArgs>(args: SelectSubset<T, comentsCreateArgs<ExtArgs>>): Prisma__comentsClient<$Result.GetResult<Prisma.$comentsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Coments.
     * @param {comentsCreateManyArgs} args - Arguments to create many Coments.
     * @example
     * // Create many Coments
     * const coments = await prisma.coments.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends comentsCreateManyArgs>(args?: SelectSubset<T, comentsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Coments.
     * @param {comentsDeleteArgs} args - Arguments to delete one Coments.
     * @example
     * // Delete one Coments
     * const Coments = await prisma.coments.delete({
     *   where: {
     *     // ... filter to delete one Coments
     *   }
     * })
     * 
     */
    delete<T extends comentsDeleteArgs>(args: SelectSubset<T, comentsDeleteArgs<ExtArgs>>): Prisma__comentsClient<$Result.GetResult<Prisma.$comentsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Coments.
     * @param {comentsUpdateArgs} args - Arguments to update one Coments.
     * @example
     * // Update one Coments
     * const coments = await prisma.coments.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends comentsUpdateArgs>(args: SelectSubset<T, comentsUpdateArgs<ExtArgs>>): Prisma__comentsClient<$Result.GetResult<Prisma.$comentsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Coments.
     * @param {comentsDeleteManyArgs} args - Arguments to filter Coments to delete.
     * @example
     * // Delete a few Coments
     * const { count } = await prisma.coments.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends comentsDeleteManyArgs>(args?: SelectSubset<T, comentsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Coments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {comentsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Coments
     * const coments = await prisma.coments.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends comentsUpdateManyArgs>(args: SelectSubset<T, comentsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Coments.
     * @param {comentsUpsertArgs} args - Arguments to update or create a Coments.
     * @example
     * // Update or create a Coments
     * const coments = await prisma.coments.upsert({
     *   create: {
     *     // ... data to create a Coments
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Coments we want to update
     *   }
     * })
     */
    upsert<T extends comentsUpsertArgs>(args: SelectSubset<T, comentsUpsertArgs<ExtArgs>>): Prisma__comentsClient<$Result.GetResult<Prisma.$comentsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Coments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {comentsCountArgs} args - Arguments to filter Coments to count.
     * @example
     * // Count the number of Coments
     * const count = await prisma.coments.count({
     *   where: {
     *     // ... the filter for the Coments we want to count
     *   }
     * })
    **/
    count<T extends comentsCountArgs>(
      args?: Subset<T, comentsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ComentsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Coments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ComentsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ComentsAggregateArgs>(args: Subset<T, ComentsAggregateArgs>): Prisma.PrismaPromise<GetComentsAggregateType<T>>

    /**
     * Group by Coments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {comentsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends comentsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: comentsGroupByArgs['orderBy'] }
        : { orderBy?: comentsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, comentsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetComentsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the coments model
   */
  readonly fields: comentsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for coments.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__comentsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    post<T extends postDefaultArgs<ExtArgs> = {}>(args?: Subset<T, postDefaultArgs<ExtArgs>>): Prisma__postClient<$Result.GetResult<Prisma.$postPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    users<T extends usersDefaultArgs<ExtArgs> = {}>(args?: Subset<T, usersDefaultArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the coments model
   */
  interface comentsFieldRefs {
    readonly idComents: FieldRef<"coments", 'Int'>
    readonly content: FieldRef<"coments", 'String'>
    readonly createdAt: FieldRef<"coments", 'DateTime'>
    readonly Users_id: FieldRef<"coments", 'Int'>
    readonly Post_idPost: FieldRef<"coments", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * coments findUnique
   */
  export type comentsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the coments
     */
    select?: comentsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the coments
     */
    omit?: comentsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: comentsInclude<ExtArgs> | null
    /**
     * Filter, which coments to fetch.
     */
    where: comentsWhereUniqueInput
  }

  /**
   * coments findUniqueOrThrow
   */
  export type comentsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the coments
     */
    select?: comentsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the coments
     */
    omit?: comentsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: comentsInclude<ExtArgs> | null
    /**
     * Filter, which coments to fetch.
     */
    where: comentsWhereUniqueInput
  }

  /**
   * coments findFirst
   */
  export type comentsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the coments
     */
    select?: comentsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the coments
     */
    omit?: comentsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: comentsInclude<ExtArgs> | null
    /**
     * Filter, which coments to fetch.
     */
    where?: comentsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of coments to fetch.
     */
    orderBy?: comentsOrderByWithRelationInput | comentsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for coments.
     */
    cursor?: comentsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` coments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` coments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of coments.
     */
    distinct?: ComentsScalarFieldEnum | ComentsScalarFieldEnum[]
  }

  /**
   * coments findFirstOrThrow
   */
  export type comentsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the coments
     */
    select?: comentsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the coments
     */
    omit?: comentsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: comentsInclude<ExtArgs> | null
    /**
     * Filter, which coments to fetch.
     */
    where?: comentsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of coments to fetch.
     */
    orderBy?: comentsOrderByWithRelationInput | comentsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for coments.
     */
    cursor?: comentsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` coments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` coments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of coments.
     */
    distinct?: ComentsScalarFieldEnum | ComentsScalarFieldEnum[]
  }

  /**
   * coments findMany
   */
  export type comentsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the coments
     */
    select?: comentsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the coments
     */
    omit?: comentsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: comentsInclude<ExtArgs> | null
    /**
     * Filter, which coments to fetch.
     */
    where?: comentsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of coments to fetch.
     */
    orderBy?: comentsOrderByWithRelationInput | comentsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing coments.
     */
    cursor?: comentsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` coments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` coments.
     */
    skip?: number
    distinct?: ComentsScalarFieldEnum | ComentsScalarFieldEnum[]
  }

  /**
   * coments create
   */
  export type comentsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the coments
     */
    select?: comentsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the coments
     */
    omit?: comentsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: comentsInclude<ExtArgs> | null
    /**
     * The data needed to create a coments.
     */
    data: XOR<comentsCreateInput, comentsUncheckedCreateInput>
  }

  /**
   * coments createMany
   */
  export type comentsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many coments.
     */
    data: comentsCreateManyInput | comentsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * coments update
   */
  export type comentsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the coments
     */
    select?: comentsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the coments
     */
    omit?: comentsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: comentsInclude<ExtArgs> | null
    /**
     * The data needed to update a coments.
     */
    data: XOR<comentsUpdateInput, comentsUncheckedUpdateInput>
    /**
     * Choose, which coments to update.
     */
    where: comentsWhereUniqueInput
  }

  /**
   * coments updateMany
   */
  export type comentsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update coments.
     */
    data: XOR<comentsUpdateManyMutationInput, comentsUncheckedUpdateManyInput>
    /**
     * Filter which coments to update
     */
    where?: comentsWhereInput
    /**
     * Limit how many coments to update.
     */
    limit?: number
  }

  /**
   * coments upsert
   */
  export type comentsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the coments
     */
    select?: comentsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the coments
     */
    omit?: comentsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: comentsInclude<ExtArgs> | null
    /**
     * The filter to search for the coments to update in case it exists.
     */
    where: comentsWhereUniqueInput
    /**
     * In case the coments found by the `where` argument doesn't exist, create a new coments with this data.
     */
    create: XOR<comentsCreateInput, comentsUncheckedCreateInput>
    /**
     * In case the coments was found with the provided `where` argument, update it with this data.
     */
    update: XOR<comentsUpdateInput, comentsUncheckedUpdateInput>
  }

  /**
   * coments delete
   */
  export type comentsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the coments
     */
    select?: comentsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the coments
     */
    omit?: comentsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: comentsInclude<ExtArgs> | null
    /**
     * Filter which coments to delete.
     */
    where: comentsWhereUniqueInput
  }

  /**
   * coments deleteMany
   */
  export type comentsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which coments to delete
     */
    where?: comentsWhereInput
    /**
     * Limit how many coments to delete.
     */
    limit?: number
  }

  /**
   * coments without action
   */
  export type comentsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the coments
     */
    select?: comentsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the coments
     */
    omit?: comentsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: comentsInclude<ExtArgs> | null
  }


  /**
   * Model post
   */

  export type AggregatePost = {
    _count: PostCountAggregateOutputType | null
    _avg: PostAvgAggregateOutputType | null
    _sum: PostSumAggregateOutputType | null
    _min: PostMinAggregateOutputType | null
    _max: PostMaxAggregateOutputType | null
  }

  export type PostAvgAggregateOutputType = {
    idPost: number | null
    Users_id: number | null
  }

  export type PostSumAggregateOutputType = {
    idPost: number | null
    Users_id: number | null
  }

  export type PostMinAggregateOutputType = {
    idPost: number | null
    region: string | null
    content: string | null
    createdAt: Date | null
    Users_id: number | null
  }

  export type PostMaxAggregateOutputType = {
    idPost: number | null
    region: string | null
    content: string | null
    createdAt: Date | null
    Users_id: number | null
  }

  export type PostCountAggregateOutputType = {
    idPost: number
    region: number
    content: number
    createdAt: number
    Users_id: number
    _all: number
  }


  export type PostAvgAggregateInputType = {
    idPost?: true
    Users_id?: true
  }

  export type PostSumAggregateInputType = {
    idPost?: true
    Users_id?: true
  }

  export type PostMinAggregateInputType = {
    idPost?: true
    region?: true
    content?: true
    createdAt?: true
    Users_id?: true
  }

  export type PostMaxAggregateInputType = {
    idPost?: true
    region?: true
    content?: true
    createdAt?: true
    Users_id?: true
  }

  export type PostCountAggregateInputType = {
    idPost?: true
    region?: true
    content?: true
    createdAt?: true
    Users_id?: true
    _all?: true
  }

  export type PostAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which post to aggregate.
     */
    where?: postWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of posts to fetch.
     */
    orderBy?: postOrderByWithRelationInput | postOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: postWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` posts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` posts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned posts
    **/
    _count?: true | PostCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PostAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PostSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PostMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PostMaxAggregateInputType
  }

  export type GetPostAggregateType<T extends PostAggregateArgs> = {
        [P in keyof T & keyof AggregatePost]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePost[P]>
      : GetScalarType<T[P], AggregatePost[P]>
  }




  export type postGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: postWhereInput
    orderBy?: postOrderByWithAggregationInput | postOrderByWithAggregationInput[]
    by: PostScalarFieldEnum[] | PostScalarFieldEnum
    having?: postScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PostCountAggregateInputType | true
    _avg?: PostAvgAggregateInputType
    _sum?: PostSumAggregateInputType
    _min?: PostMinAggregateInputType
    _max?: PostMaxAggregateInputType
  }

  export type PostGroupByOutputType = {
    idPost: number
    region: string
    content: string
    createdAt: Date
    Users_id: number
    _count: PostCountAggregateOutputType | null
    _avg: PostAvgAggregateOutputType | null
    _sum: PostSumAggregateOutputType | null
    _min: PostMinAggregateOutputType | null
    _max: PostMaxAggregateOutputType | null
  }

  type GetPostGroupByPayload<T extends postGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PostGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PostGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PostGroupByOutputType[P]>
            : GetScalarType<T[P], PostGroupByOutputType[P]>
        }
      >
    >


  export type postSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    idPost?: boolean
    region?: boolean
    content?: boolean
    createdAt?: boolean
    Users_id?: boolean
    coments?: boolean | post$comentsArgs<ExtArgs>
    users?: boolean | usersDefaultArgs<ExtArgs>
    responses?: boolean | post$responsesArgs<ExtArgs>
    _count?: boolean | PostCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["post"]>



  export type postSelectScalar = {
    idPost?: boolean
    region?: boolean
    content?: boolean
    createdAt?: boolean
    Users_id?: boolean
  }

  export type postOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"idPost" | "region" | "content" | "createdAt" | "Users_id", ExtArgs["result"]["post"]>
  export type postInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    coments?: boolean | post$comentsArgs<ExtArgs>
    users?: boolean | usersDefaultArgs<ExtArgs>
    responses?: boolean | post$responsesArgs<ExtArgs>
    _count?: boolean | PostCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $postPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "post"
    objects: {
      coments: Prisma.$comentsPayload<ExtArgs>[]
      users: Prisma.$usersPayload<ExtArgs>
      responses: Prisma.$responsesPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      idPost: number
      region: string
      content: string
      createdAt: Date
      Users_id: number
    }, ExtArgs["result"]["post"]>
    composites: {}
  }

  type postGetPayload<S extends boolean | null | undefined | postDefaultArgs> = $Result.GetResult<Prisma.$postPayload, S>

  type postCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<postFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PostCountAggregateInputType | true
    }

  export interface postDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['post'], meta: { name: 'post' } }
    /**
     * Find zero or one Post that matches the filter.
     * @param {postFindUniqueArgs} args - Arguments to find a Post
     * @example
     * // Get one Post
     * const post = await prisma.post.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends postFindUniqueArgs>(args: SelectSubset<T, postFindUniqueArgs<ExtArgs>>): Prisma__postClient<$Result.GetResult<Prisma.$postPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Post that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {postFindUniqueOrThrowArgs} args - Arguments to find a Post
     * @example
     * // Get one Post
     * const post = await prisma.post.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends postFindUniqueOrThrowArgs>(args: SelectSubset<T, postFindUniqueOrThrowArgs<ExtArgs>>): Prisma__postClient<$Result.GetResult<Prisma.$postPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Post that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {postFindFirstArgs} args - Arguments to find a Post
     * @example
     * // Get one Post
     * const post = await prisma.post.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends postFindFirstArgs>(args?: SelectSubset<T, postFindFirstArgs<ExtArgs>>): Prisma__postClient<$Result.GetResult<Prisma.$postPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Post that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {postFindFirstOrThrowArgs} args - Arguments to find a Post
     * @example
     * // Get one Post
     * const post = await prisma.post.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends postFindFirstOrThrowArgs>(args?: SelectSubset<T, postFindFirstOrThrowArgs<ExtArgs>>): Prisma__postClient<$Result.GetResult<Prisma.$postPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Posts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {postFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Posts
     * const posts = await prisma.post.findMany()
     * 
     * // Get first 10 Posts
     * const posts = await prisma.post.findMany({ take: 10 })
     * 
     * // Only select the `idPost`
     * const postWithIdPostOnly = await prisma.post.findMany({ select: { idPost: true } })
     * 
     */
    findMany<T extends postFindManyArgs>(args?: SelectSubset<T, postFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$postPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Post.
     * @param {postCreateArgs} args - Arguments to create a Post.
     * @example
     * // Create one Post
     * const Post = await prisma.post.create({
     *   data: {
     *     // ... data to create a Post
     *   }
     * })
     * 
     */
    create<T extends postCreateArgs>(args: SelectSubset<T, postCreateArgs<ExtArgs>>): Prisma__postClient<$Result.GetResult<Prisma.$postPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Posts.
     * @param {postCreateManyArgs} args - Arguments to create many Posts.
     * @example
     * // Create many Posts
     * const post = await prisma.post.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends postCreateManyArgs>(args?: SelectSubset<T, postCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Post.
     * @param {postDeleteArgs} args - Arguments to delete one Post.
     * @example
     * // Delete one Post
     * const Post = await prisma.post.delete({
     *   where: {
     *     // ... filter to delete one Post
     *   }
     * })
     * 
     */
    delete<T extends postDeleteArgs>(args: SelectSubset<T, postDeleteArgs<ExtArgs>>): Prisma__postClient<$Result.GetResult<Prisma.$postPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Post.
     * @param {postUpdateArgs} args - Arguments to update one Post.
     * @example
     * // Update one Post
     * const post = await prisma.post.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends postUpdateArgs>(args: SelectSubset<T, postUpdateArgs<ExtArgs>>): Prisma__postClient<$Result.GetResult<Prisma.$postPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Posts.
     * @param {postDeleteManyArgs} args - Arguments to filter Posts to delete.
     * @example
     * // Delete a few Posts
     * const { count } = await prisma.post.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends postDeleteManyArgs>(args?: SelectSubset<T, postDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Posts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {postUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Posts
     * const post = await prisma.post.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends postUpdateManyArgs>(args: SelectSubset<T, postUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Post.
     * @param {postUpsertArgs} args - Arguments to update or create a Post.
     * @example
     * // Update or create a Post
     * const post = await prisma.post.upsert({
     *   create: {
     *     // ... data to create a Post
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Post we want to update
     *   }
     * })
     */
    upsert<T extends postUpsertArgs>(args: SelectSubset<T, postUpsertArgs<ExtArgs>>): Prisma__postClient<$Result.GetResult<Prisma.$postPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Posts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {postCountArgs} args - Arguments to filter Posts to count.
     * @example
     * // Count the number of Posts
     * const count = await prisma.post.count({
     *   where: {
     *     // ... the filter for the Posts we want to count
     *   }
     * })
    **/
    count<T extends postCountArgs>(
      args?: Subset<T, postCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PostCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Post.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PostAggregateArgs>(args: Subset<T, PostAggregateArgs>): Prisma.PrismaPromise<GetPostAggregateType<T>>

    /**
     * Group by Post.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {postGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends postGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: postGroupByArgs['orderBy'] }
        : { orderBy?: postGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, postGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPostGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the post model
   */
  readonly fields: postFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for post.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__postClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    coments<T extends post$comentsArgs<ExtArgs> = {}>(args?: Subset<T, post$comentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$comentsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    users<T extends usersDefaultArgs<ExtArgs> = {}>(args?: Subset<T, usersDefaultArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    responses<T extends post$responsesArgs<ExtArgs> = {}>(args?: Subset<T, post$responsesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$responsesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the post model
   */
  interface postFieldRefs {
    readonly idPost: FieldRef<"post", 'Int'>
    readonly region: FieldRef<"post", 'String'>
    readonly content: FieldRef<"post", 'String'>
    readonly createdAt: FieldRef<"post", 'DateTime'>
    readonly Users_id: FieldRef<"post", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * post findUnique
   */
  export type postFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the post
     */
    select?: postSelect<ExtArgs> | null
    /**
     * Omit specific fields from the post
     */
    omit?: postOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: postInclude<ExtArgs> | null
    /**
     * Filter, which post to fetch.
     */
    where: postWhereUniqueInput
  }

  /**
   * post findUniqueOrThrow
   */
  export type postFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the post
     */
    select?: postSelect<ExtArgs> | null
    /**
     * Omit specific fields from the post
     */
    omit?: postOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: postInclude<ExtArgs> | null
    /**
     * Filter, which post to fetch.
     */
    where: postWhereUniqueInput
  }

  /**
   * post findFirst
   */
  export type postFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the post
     */
    select?: postSelect<ExtArgs> | null
    /**
     * Omit specific fields from the post
     */
    omit?: postOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: postInclude<ExtArgs> | null
    /**
     * Filter, which post to fetch.
     */
    where?: postWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of posts to fetch.
     */
    orderBy?: postOrderByWithRelationInput | postOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for posts.
     */
    cursor?: postWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` posts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` posts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of posts.
     */
    distinct?: PostScalarFieldEnum | PostScalarFieldEnum[]
  }

  /**
   * post findFirstOrThrow
   */
  export type postFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the post
     */
    select?: postSelect<ExtArgs> | null
    /**
     * Omit specific fields from the post
     */
    omit?: postOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: postInclude<ExtArgs> | null
    /**
     * Filter, which post to fetch.
     */
    where?: postWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of posts to fetch.
     */
    orderBy?: postOrderByWithRelationInput | postOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for posts.
     */
    cursor?: postWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` posts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` posts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of posts.
     */
    distinct?: PostScalarFieldEnum | PostScalarFieldEnum[]
  }

  /**
   * post findMany
   */
  export type postFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the post
     */
    select?: postSelect<ExtArgs> | null
    /**
     * Omit specific fields from the post
     */
    omit?: postOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: postInclude<ExtArgs> | null
    /**
     * Filter, which posts to fetch.
     */
    where?: postWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of posts to fetch.
     */
    orderBy?: postOrderByWithRelationInput | postOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing posts.
     */
    cursor?: postWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` posts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` posts.
     */
    skip?: number
    distinct?: PostScalarFieldEnum | PostScalarFieldEnum[]
  }

  /**
   * post create
   */
  export type postCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the post
     */
    select?: postSelect<ExtArgs> | null
    /**
     * Omit specific fields from the post
     */
    omit?: postOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: postInclude<ExtArgs> | null
    /**
     * The data needed to create a post.
     */
    data: XOR<postCreateInput, postUncheckedCreateInput>
  }

  /**
   * post createMany
   */
  export type postCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many posts.
     */
    data: postCreateManyInput | postCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * post update
   */
  export type postUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the post
     */
    select?: postSelect<ExtArgs> | null
    /**
     * Omit specific fields from the post
     */
    omit?: postOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: postInclude<ExtArgs> | null
    /**
     * The data needed to update a post.
     */
    data: XOR<postUpdateInput, postUncheckedUpdateInput>
    /**
     * Choose, which post to update.
     */
    where: postWhereUniqueInput
  }

  /**
   * post updateMany
   */
  export type postUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update posts.
     */
    data: XOR<postUpdateManyMutationInput, postUncheckedUpdateManyInput>
    /**
     * Filter which posts to update
     */
    where?: postWhereInput
    /**
     * Limit how many posts to update.
     */
    limit?: number
  }

  /**
   * post upsert
   */
  export type postUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the post
     */
    select?: postSelect<ExtArgs> | null
    /**
     * Omit specific fields from the post
     */
    omit?: postOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: postInclude<ExtArgs> | null
    /**
     * The filter to search for the post to update in case it exists.
     */
    where: postWhereUniqueInput
    /**
     * In case the post found by the `where` argument doesn't exist, create a new post with this data.
     */
    create: XOR<postCreateInput, postUncheckedCreateInput>
    /**
     * In case the post was found with the provided `where` argument, update it with this data.
     */
    update: XOR<postUpdateInput, postUncheckedUpdateInput>
  }

  /**
   * post delete
   */
  export type postDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the post
     */
    select?: postSelect<ExtArgs> | null
    /**
     * Omit specific fields from the post
     */
    omit?: postOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: postInclude<ExtArgs> | null
    /**
     * Filter which post to delete.
     */
    where: postWhereUniqueInput
  }

  /**
   * post deleteMany
   */
  export type postDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which posts to delete
     */
    where?: postWhereInput
    /**
     * Limit how many posts to delete.
     */
    limit?: number
  }

  /**
   * post.coments
   */
  export type post$comentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the coments
     */
    select?: comentsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the coments
     */
    omit?: comentsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: comentsInclude<ExtArgs> | null
    where?: comentsWhereInput
    orderBy?: comentsOrderByWithRelationInput | comentsOrderByWithRelationInput[]
    cursor?: comentsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ComentsScalarFieldEnum | ComentsScalarFieldEnum[]
  }

  /**
   * post.responses
   */
  export type post$responsesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the responses
     */
    select?: responsesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the responses
     */
    omit?: responsesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: responsesInclude<ExtArgs> | null
    where?: responsesWhereInput
    orderBy?: responsesOrderByWithRelationInput | responsesOrderByWithRelationInput[]
    cursor?: responsesWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ResponsesScalarFieldEnum | ResponsesScalarFieldEnum[]
  }

  /**
   * post without action
   */
  export type postDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the post
     */
    select?: postSelect<ExtArgs> | null
    /**
     * Omit specific fields from the post
     */
    omit?: postOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: postInclude<ExtArgs> | null
  }


  /**
   * Model responses
   */

  export type AggregateResponses = {
    _count: ResponsesCountAggregateOutputType | null
    _avg: ResponsesAvgAggregateOutputType | null
    _sum: ResponsesSumAggregateOutputType | null
    _min: ResponsesMinAggregateOutputType | null
    _max: ResponsesMaxAggregateOutputType | null
  }

  export type ResponsesAvgAggregateOutputType = {
    idResponse: number | null
    Users_id: number | null
    Post_idPost: number | null
  }

  export type ResponsesSumAggregateOutputType = {
    idResponse: number | null
    Users_id: number | null
    Post_idPost: number | null
  }

  export type ResponsesMinAggregateOutputType = {
    idResponse: number | null
    content: string | null
    createdAt: Date | null
    Users_id: number | null
    Post_idPost: number | null
  }

  export type ResponsesMaxAggregateOutputType = {
    idResponse: number | null
    content: string | null
    createdAt: Date | null
    Users_id: number | null
    Post_idPost: number | null
  }

  export type ResponsesCountAggregateOutputType = {
    idResponse: number
    content: number
    createdAt: number
    Users_id: number
    Post_idPost: number
    _all: number
  }


  export type ResponsesAvgAggregateInputType = {
    idResponse?: true
    Users_id?: true
    Post_idPost?: true
  }

  export type ResponsesSumAggregateInputType = {
    idResponse?: true
    Users_id?: true
    Post_idPost?: true
  }

  export type ResponsesMinAggregateInputType = {
    idResponse?: true
    content?: true
    createdAt?: true
    Users_id?: true
    Post_idPost?: true
  }

  export type ResponsesMaxAggregateInputType = {
    idResponse?: true
    content?: true
    createdAt?: true
    Users_id?: true
    Post_idPost?: true
  }

  export type ResponsesCountAggregateInputType = {
    idResponse?: true
    content?: true
    createdAt?: true
    Users_id?: true
    Post_idPost?: true
    _all?: true
  }

  export type ResponsesAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which responses to aggregate.
     */
    where?: responsesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of responses to fetch.
     */
    orderBy?: responsesOrderByWithRelationInput | responsesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: responsesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` responses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` responses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned responses
    **/
    _count?: true | ResponsesCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ResponsesAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ResponsesSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ResponsesMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ResponsesMaxAggregateInputType
  }

  export type GetResponsesAggregateType<T extends ResponsesAggregateArgs> = {
        [P in keyof T & keyof AggregateResponses]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateResponses[P]>
      : GetScalarType<T[P], AggregateResponses[P]>
  }




  export type responsesGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: responsesWhereInput
    orderBy?: responsesOrderByWithAggregationInput | responsesOrderByWithAggregationInput[]
    by: ResponsesScalarFieldEnum[] | ResponsesScalarFieldEnum
    having?: responsesScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ResponsesCountAggregateInputType | true
    _avg?: ResponsesAvgAggregateInputType
    _sum?: ResponsesSumAggregateInputType
    _min?: ResponsesMinAggregateInputType
    _max?: ResponsesMaxAggregateInputType
  }

  export type ResponsesGroupByOutputType = {
    idResponse: number
    content: string
    createdAt: Date
    Users_id: number
    Post_idPost: number
    _count: ResponsesCountAggregateOutputType | null
    _avg: ResponsesAvgAggregateOutputType | null
    _sum: ResponsesSumAggregateOutputType | null
    _min: ResponsesMinAggregateOutputType | null
    _max: ResponsesMaxAggregateOutputType | null
  }

  type GetResponsesGroupByPayload<T extends responsesGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ResponsesGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ResponsesGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ResponsesGroupByOutputType[P]>
            : GetScalarType<T[P], ResponsesGroupByOutputType[P]>
        }
      >
    >


  export type responsesSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    idResponse?: boolean
    content?: boolean
    createdAt?: boolean
    Users_id?: boolean
    Post_idPost?: boolean
    post?: boolean | postDefaultArgs<ExtArgs>
    users?: boolean | usersDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["responses"]>



  export type responsesSelectScalar = {
    idResponse?: boolean
    content?: boolean
    createdAt?: boolean
    Users_id?: boolean
    Post_idPost?: boolean
  }

  export type responsesOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"idResponse" | "content" | "createdAt" | "Users_id" | "Post_idPost", ExtArgs["result"]["responses"]>
  export type responsesInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    post?: boolean | postDefaultArgs<ExtArgs>
    users?: boolean | usersDefaultArgs<ExtArgs>
  }

  export type $responsesPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "responses"
    objects: {
      post: Prisma.$postPayload<ExtArgs>
      users: Prisma.$usersPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      idResponse: number
      content: string
      createdAt: Date
      Users_id: number
      Post_idPost: number
    }, ExtArgs["result"]["responses"]>
    composites: {}
  }

  type responsesGetPayload<S extends boolean | null | undefined | responsesDefaultArgs> = $Result.GetResult<Prisma.$responsesPayload, S>

  type responsesCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<responsesFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ResponsesCountAggregateInputType | true
    }

  export interface responsesDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['responses'], meta: { name: 'responses' } }
    /**
     * Find zero or one Responses that matches the filter.
     * @param {responsesFindUniqueArgs} args - Arguments to find a Responses
     * @example
     * // Get one Responses
     * const responses = await prisma.responses.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends responsesFindUniqueArgs>(args: SelectSubset<T, responsesFindUniqueArgs<ExtArgs>>): Prisma__responsesClient<$Result.GetResult<Prisma.$responsesPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Responses that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {responsesFindUniqueOrThrowArgs} args - Arguments to find a Responses
     * @example
     * // Get one Responses
     * const responses = await prisma.responses.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends responsesFindUniqueOrThrowArgs>(args: SelectSubset<T, responsesFindUniqueOrThrowArgs<ExtArgs>>): Prisma__responsesClient<$Result.GetResult<Prisma.$responsesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Responses that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {responsesFindFirstArgs} args - Arguments to find a Responses
     * @example
     * // Get one Responses
     * const responses = await prisma.responses.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends responsesFindFirstArgs>(args?: SelectSubset<T, responsesFindFirstArgs<ExtArgs>>): Prisma__responsesClient<$Result.GetResult<Prisma.$responsesPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Responses that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {responsesFindFirstOrThrowArgs} args - Arguments to find a Responses
     * @example
     * // Get one Responses
     * const responses = await prisma.responses.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends responsesFindFirstOrThrowArgs>(args?: SelectSubset<T, responsesFindFirstOrThrowArgs<ExtArgs>>): Prisma__responsesClient<$Result.GetResult<Prisma.$responsesPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Responses that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {responsesFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Responses
     * const responses = await prisma.responses.findMany()
     * 
     * // Get first 10 Responses
     * const responses = await prisma.responses.findMany({ take: 10 })
     * 
     * // Only select the `idResponse`
     * const responsesWithIdResponseOnly = await prisma.responses.findMany({ select: { idResponse: true } })
     * 
     */
    findMany<T extends responsesFindManyArgs>(args?: SelectSubset<T, responsesFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$responsesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Responses.
     * @param {responsesCreateArgs} args - Arguments to create a Responses.
     * @example
     * // Create one Responses
     * const Responses = await prisma.responses.create({
     *   data: {
     *     // ... data to create a Responses
     *   }
     * })
     * 
     */
    create<T extends responsesCreateArgs>(args: SelectSubset<T, responsesCreateArgs<ExtArgs>>): Prisma__responsesClient<$Result.GetResult<Prisma.$responsesPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Responses.
     * @param {responsesCreateManyArgs} args - Arguments to create many Responses.
     * @example
     * // Create many Responses
     * const responses = await prisma.responses.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends responsesCreateManyArgs>(args?: SelectSubset<T, responsesCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Responses.
     * @param {responsesDeleteArgs} args - Arguments to delete one Responses.
     * @example
     * // Delete one Responses
     * const Responses = await prisma.responses.delete({
     *   where: {
     *     // ... filter to delete one Responses
     *   }
     * })
     * 
     */
    delete<T extends responsesDeleteArgs>(args: SelectSubset<T, responsesDeleteArgs<ExtArgs>>): Prisma__responsesClient<$Result.GetResult<Prisma.$responsesPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Responses.
     * @param {responsesUpdateArgs} args - Arguments to update one Responses.
     * @example
     * // Update one Responses
     * const responses = await prisma.responses.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends responsesUpdateArgs>(args: SelectSubset<T, responsesUpdateArgs<ExtArgs>>): Prisma__responsesClient<$Result.GetResult<Prisma.$responsesPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Responses.
     * @param {responsesDeleteManyArgs} args - Arguments to filter Responses to delete.
     * @example
     * // Delete a few Responses
     * const { count } = await prisma.responses.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends responsesDeleteManyArgs>(args?: SelectSubset<T, responsesDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Responses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {responsesUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Responses
     * const responses = await prisma.responses.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends responsesUpdateManyArgs>(args: SelectSubset<T, responsesUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Responses.
     * @param {responsesUpsertArgs} args - Arguments to update or create a Responses.
     * @example
     * // Update or create a Responses
     * const responses = await prisma.responses.upsert({
     *   create: {
     *     // ... data to create a Responses
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Responses we want to update
     *   }
     * })
     */
    upsert<T extends responsesUpsertArgs>(args: SelectSubset<T, responsesUpsertArgs<ExtArgs>>): Prisma__responsesClient<$Result.GetResult<Prisma.$responsesPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Responses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {responsesCountArgs} args - Arguments to filter Responses to count.
     * @example
     * // Count the number of Responses
     * const count = await prisma.responses.count({
     *   where: {
     *     // ... the filter for the Responses we want to count
     *   }
     * })
    **/
    count<T extends responsesCountArgs>(
      args?: Subset<T, responsesCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ResponsesCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Responses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResponsesAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ResponsesAggregateArgs>(args: Subset<T, ResponsesAggregateArgs>): Prisma.PrismaPromise<GetResponsesAggregateType<T>>

    /**
     * Group by Responses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {responsesGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends responsesGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: responsesGroupByArgs['orderBy'] }
        : { orderBy?: responsesGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, responsesGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetResponsesGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the responses model
   */
  readonly fields: responsesFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for responses.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__responsesClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    post<T extends postDefaultArgs<ExtArgs> = {}>(args?: Subset<T, postDefaultArgs<ExtArgs>>): Prisma__postClient<$Result.GetResult<Prisma.$postPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    users<T extends usersDefaultArgs<ExtArgs> = {}>(args?: Subset<T, usersDefaultArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the responses model
   */
  interface responsesFieldRefs {
    readonly idResponse: FieldRef<"responses", 'Int'>
    readonly content: FieldRef<"responses", 'String'>
    readonly createdAt: FieldRef<"responses", 'DateTime'>
    readonly Users_id: FieldRef<"responses", 'Int'>
    readonly Post_idPost: FieldRef<"responses", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * responses findUnique
   */
  export type responsesFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the responses
     */
    select?: responsesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the responses
     */
    omit?: responsesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: responsesInclude<ExtArgs> | null
    /**
     * Filter, which responses to fetch.
     */
    where: responsesWhereUniqueInput
  }

  /**
   * responses findUniqueOrThrow
   */
  export type responsesFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the responses
     */
    select?: responsesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the responses
     */
    omit?: responsesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: responsesInclude<ExtArgs> | null
    /**
     * Filter, which responses to fetch.
     */
    where: responsesWhereUniqueInput
  }

  /**
   * responses findFirst
   */
  export type responsesFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the responses
     */
    select?: responsesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the responses
     */
    omit?: responsesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: responsesInclude<ExtArgs> | null
    /**
     * Filter, which responses to fetch.
     */
    where?: responsesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of responses to fetch.
     */
    orderBy?: responsesOrderByWithRelationInput | responsesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for responses.
     */
    cursor?: responsesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` responses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` responses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of responses.
     */
    distinct?: ResponsesScalarFieldEnum | ResponsesScalarFieldEnum[]
  }

  /**
   * responses findFirstOrThrow
   */
  export type responsesFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the responses
     */
    select?: responsesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the responses
     */
    omit?: responsesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: responsesInclude<ExtArgs> | null
    /**
     * Filter, which responses to fetch.
     */
    where?: responsesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of responses to fetch.
     */
    orderBy?: responsesOrderByWithRelationInput | responsesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for responses.
     */
    cursor?: responsesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` responses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` responses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of responses.
     */
    distinct?: ResponsesScalarFieldEnum | ResponsesScalarFieldEnum[]
  }

  /**
   * responses findMany
   */
  export type responsesFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the responses
     */
    select?: responsesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the responses
     */
    omit?: responsesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: responsesInclude<ExtArgs> | null
    /**
     * Filter, which responses to fetch.
     */
    where?: responsesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of responses to fetch.
     */
    orderBy?: responsesOrderByWithRelationInput | responsesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing responses.
     */
    cursor?: responsesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` responses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` responses.
     */
    skip?: number
    distinct?: ResponsesScalarFieldEnum | ResponsesScalarFieldEnum[]
  }

  /**
   * responses create
   */
  export type responsesCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the responses
     */
    select?: responsesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the responses
     */
    omit?: responsesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: responsesInclude<ExtArgs> | null
    /**
     * The data needed to create a responses.
     */
    data: XOR<responsesCreateInput, responsesUncheckedCreateInput>
  }

  /**
   * responses createMany
   */
  export type responsesCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many responses.
     */
    data: responsesCreateManyInput | responsesCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * responses update
   */
  export type responsesUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the responses
     */
    select?: responsesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the responses
     */
    omit?: responsesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: responsesInclude<ExtArgs> | null
    /**
     * The data needed to update a responses.
     */
    data: XOR<responsesUpdateInput, responsesUncheckedUpdateInput>
    /**
     * Choose, which responses to update.
     */
    where: responsesWhereUniqueInput
  }

  /**
   * responses updateMany
   */
  export type responsesUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update responses.
     */
    data: XOR<responsesUpdateManyMutationInput, responsesUncheckedUpdateManyInput>
    /**
     * Filter which responses to update
     */
    where?: responsesWhereInput
    /**
     * Limit how many responses to update.
     */
    limit?: number
  }

  /**
   * responses upsert
   */
  export type responsesUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the responses
     */
    select?: responsesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the responses
     */
    omit?: responsesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: responsesInclude<ExtArgs> | null
    /**
     * The filter to search for the responses to update in case it exists.
     */
    where: responsesWhereUniqueInput
    /**
     * In case the responses found by the `where` argument doesn't exist, create a new responses with this data.
     */
    create: XOR<responsesCreateInput, responsesUncheckedCreateInput>
    /**
     * In case the responses was found with the provided `where` argument, update it with this data.
     */
    update: XOR<responsesUpdateInput, responsesUncheckedUpdateInput>
  }

  /**
   * responses delete
   */
  export type responsesDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the responses
     */
    select?: responsesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the responses
     */
    omit?: responsesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: responsesInclude<ExtArgs> | null
    /**
     * Filter which responses to delete.
     */
    where: responsesWhereUniqueInput
  }

  /**
   * responses deleteMany
   */
  export type responsesDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which responses to delete
     */
    where?: responsesWhereInput
    /**
     * Limit how many responses to delete.
     */
    limit?: number
  }

  /**
   * responses without action
   */
  export type responsesDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the responses
     */
    select?: responsesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the responses
     */
    omit?: responsesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: responsesInclude<ExtArgs> | null
  }


  /**
   * Model users
   */

  export type AggregateUsers = {
    _count: UsersCountAggregateOutputType | null
    _avg: UsersAvgAggregateOutputType | null
    _sum: UsersSumAggregateOutputType | null
    _min: UsersMinAggregateOutputType | null
    _max: UsersMaxAggregateOutputType | null
  }

  export type UsersAvgAggregateOutputType = {
    id: number | null
    ativo: number | null
  }

  export type UsersSumAggregateOutputType = {
    id: number | null
    ativo: number | null
  }

  export type UsersMinAggregateOutputType = {
    id: number | null
    nome: string | null
    email: string | null
    senha: string | null
    foto: string | null
    acesso: $Enums.users_acesso | null
    ativo: number | null
  }

  export type UsersMaxAggregateOutputType = {
    id: number | null
    nome: string | null
    email: string | null
    senha: string | null
    foto: string | null
    acesso: $Enums.users_acesso | null
    ativo: number | null
  }

  export type UsersCountAggregateOutputType = {
    id: number
    nome: number
    email: number
    senha: number
    foto: number
    acesso: number
    ativo: number
    _all: number
  }


  export type UsersAvgAggregateInputType = {
    id?: true
    ativo?: true
  }

  export type UsersSumAggregateInputType = {
    id?: true
    ativo?: true
  }

  export type UsersMinAggregateInputType = {
    id?: true
    nome?: true
    email?: true
    senha?: true
    foto?: true
    acesso?: true
    ativo?: true
  }

  export type UsersMaxAggregateInputType = {
    id?: true
    nome?: true
    email?: true
    senha?: true
    foto?: true
    acesso?: true
    ativo?: true
  }

  export type UsersCountAggregateInputType = {
    id?: true
    nome?: true
    email?: true
    senha?: true
    foto?: true
    acesso?: true
    ativo?: true
    _all?: true
  }

  export type UsersAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which users to aggregate.
     */
    where?: usersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of users to fetch.
     */
    orderBy?: usersOrderByWithRelationInput | usersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: usersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned users
    **/
    _count?: true | UsersCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UsersAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UsersSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UsersMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UsersMaxAggregateInputType
  }

  export type GetUsersAggregateType<T extends UsersAggregateArgs> = {
        [P in keyof T & keyof AggregateUsers]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUsers[P]>
      : GetScalarType<T[P], AggregateUsers[P]>
  }




  export type usersGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: usersWhereInput
    orderBy?: usersOrderByWithAggregationInput | usersOrderByWithAggregationInput[]
    by: UsersScalarFieldEnum[] | UsersScalarFieldEnum
    having?: usersScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UsersCountAggregateInputType | true
    _avg?: UsersAvgAggregateInputType
    _sum?: UsersSumAggregateInputType
    _min?: UsersMinAggregateInputType
    _max?: UsersMaxAggregateInputType
  }

  export type UsersGroupByOutputType = {
    id: number
    nome: string
    email: string
    senha: string
    foto: string | null
    acesso: $Enums.users_acesso
    ativo: number
    _count: UsersCountAggregateOutputType | null
    _avg: UsersAvgAggregateOutputType | null
    _sum: UsersSumAggregateOutputType | null
    _min: UsersMinAggregateOutputType | null
    _max: UsersMaxAggregateOutputType | null
  }

  type GetUsersGroupByPayload<T extends usersGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UsersGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UsersGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UsersGroupByOutputType[P]>
            : GetScalarType<T[P], UsersGroupByOutputType[P]>
        }
      >
    >


  export type usersSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nome?: boolean
    email?: boolean
    senha?: boolean
    foto?: boolean
    acesso?: boolean
    ativo?: boolean
    coments?: boolean | users$comentsArgs<ExtArgs>
    post?: boolean | users$postArgs<ExtArgs>
    responses?: boolean | users$responsesArgs<ExtArgs>
    _count?: boolean | UsersCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["users"]>



  export type usersSelectScalar = {
    id?: boolean
    nome?: boolean
    email?: boolean
    senha?: boolean
    foto?: boolean
    acesso?: boolean
    ativo?: boolean
  }

  export type usersOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "nome" | "email" | "senha" | "foto" | "acesso" | "ativo", ExtArgs["result"]["users"]>
  export type usersInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    coments?: boolean | users$comentsArgs<ExtArgs>
    post?: boolean | users$postArgs<ExtArgs>
    responses?: boolean | users$responsesArgs<ExtArgs>
    _count?: boolean | UsersCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $usersPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "users"
    objects: {
      coments: Prisma.$comentsPayload<ExtArgs>[]
      post: Prisma.$postPayload<ExtArgs>[]
      responses: Prisma.$responsesPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      nome: string
      email: string
      senha: string
      foto: string | null
      acesso: $Enums.users_acesso
      ativo: number
    }, ExtArgs["result"]["users"]>
    composites: {}
  }

  type usersGetPayload<S extends boolean | null | undefined | usersDefaultArgs> = $Result.GetResult<Prisma.$usersPayload, S>

  type usersCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<usersFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UsersCountAggregateInputType | true
    }

  export interface usersDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['users'], meta: { name: 'users' } }
    /**
     * Find zero or one Users that matches the filter.
     * @param {usersFindUniqueArgs} args - Arguments to find a Users
     * @example
     * // Get one Users
     * const users = await prisma.users.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends usersFindUniqueArgs>(args: SelectSubset<T, usersFindUniqueArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Users that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {usersFindUniqueOrThrowArgs} args - Arguments to find a Users
     * @example
     * // Get one Users
     * const users = await prisma.users.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends usersFindUniqueOrThrowArgs>(args: SelectSubset<T, usersFindUniqueOrThrowArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersFindFirstArgs} args - Arguments to find a Users
     * @example
     * // Get one Users
     * const users = await prisma.users.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends usersFindFirstArgs>(args?: SelectSubset<T, usersFindFirstArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Users that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersFindFirstOrThrowArgs} args - Arguments to find a Users
     * @example
     * // Get one Users
     * const users = await prisma.users.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends usersFindFirstOrThrowArgs>(args?: SelectSubset<T, usersFindFirstOrThrowArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.users.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.users.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const usersWithIdOnly = await prisma.users.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends usersFindManyArgs>(args?: SelectSubset<T, usersFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Users.
     * @param {usersCreateArgs} args - Arguments to create a Users.
     * @example
     * // Create one Users
     * const Users = await prisma.users.create({
     *   data: {
     *     // ... data to create a Users
     *   }
     * })
     * 
     */
    create<T extends usersCreateArgs>(args: SelectSubset<T, usersCreateArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {usersCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const users = await prisma.users.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends usersCreateManyArgs>(args?: SelectSubset<T, usersCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Users.
     * @param {usersDeleteArgs} args - Arguments to delete one Users.
     * @example
     * // Delete one Users
     * const Users = await prisma.users.delete({
     *   where: {
     *     // ... filter to delete one Users
     *   }
     * })
     * 
     */
    delete<T extends usersDeleteArgs>(args: SelectSubset<T, usersDeleteArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Users.
     * @param {usersUpdateArgs} args - Arguments to update one Users.
     * @example
     * // Update one Users
     * const users = await prisma.users.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends usersUpdateArgs>(args: SelectSubset<T, usersUpdateArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {usersDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.users.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends usersDeleteManyArgs>(args?: SelectSubset<T, usersDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const users = await prisma.users.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends usersUpdateManyArgs>(args: SelectSubset<T, usersUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Users.
     * @param {usersUpsertArgs} args - Arguments to update or create a Users.
     * @example
     * // Update or create a Users
     * const users = await prisma.users.upsert({
     *   create: {
     *     // ... data to create a Users
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Users we want to update
     *   }
     * })
     */
    upsert<T extends usersUpsertArgs>(args: SelectSubset<T, usersUpsertArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.users.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends usersCountArgs>(
      args?: Subset<T, usersCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UsersCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsersAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UsersAggregateArgs>(args: Subset<T, UsersAggregateArgs>): Prisma.PrismaPromise<GetUsersAggregateType<T>>

    /**
     * Group by Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends usersGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: usersGroupByArgs['orderBy'] }
        : { orderBy?: usersGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, usersGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUsersGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the users model
   */
  readonly fields: usersFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for users.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__usersClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    coments<T extends users$comentsArgs<ExtArgs> = {}>(args?: Subset<T, users$comentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$comentsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    post<T extends users$postArgs<ExtArgs> = {}>(args?: Subset<T, users$postArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$postPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    responses<T extends users$responsesArgs<ExtArgs> = {}>(args?: Subset<T, users$responsesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$responsesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the users model
   */
  interface usersFieldRefs {
    readonly id: FieldRef<"users", 'Int'>
    readonly nome: FieldRef<"users", 'String'>
    readonly email: FieldRef<"users", 'String'>
    readonly senha: FieldRef<"users", 'String'>
    readonly foto: FieldRef<"users", 'String'>
    readonly acesso: FieldRef<"users", 'users_acesso'>
    readonly ativo: FieldRef<"users", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * users findUnique
   */
  export type usersFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * Filter, which users to fetch.
     */
    where: usersWhereUniqueInput
  }

  /**
   * users findUniqueOrThrow
   */
  export type usersFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * Filter, which users to fetch.
     */
    where: usersWhereUniqueInput
  }

  /**
   * users findFirst
   */
  export type usersFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * Filter, which users to fetch.
     */
    where?: usersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of users to fetch.
     */
    orderBy?: usersOrderByWithRelationInput | usersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for users.
     */
    cursor?: usersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of users.
     */
    distinct?: UsersScalarFieldEnum | UsersScalarFieldEnum[]
  }

  /**
   * users findFirstOrThrow
   */
  export type usersFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * Filter, which users to fetch.
     */
    where?: usersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of users to fetch.
     */
    orderBy?: usersOrderByWithRelationInput | usersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for users.
     */
    cursor?: usersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of users.
     */
    distinct?: UsersScalarFieldEnum | UsersScalarFieldEnum[]
  }

  /**
   * users findMany
   */
  export type usersFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * Filter, which users to fetch.
     */
    where?: usersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of users to fetch.
     */
    orderBy?: usersOrderByWithRelationInput | usersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing users.
     */
    cursor?: usersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` users.
     */
    skip?: number
    distinct?: UsersScalarFieldEnum | UsersScalarFieldEnum[]
  }

  /**
   * users create
   */
  export type usersCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * The data needed to create a users.
     */
    data: XOR<usersCreateInput, usersUncheckedCreateInput>
  }

  /**
   * users createMany
   */
  export type usersCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many users.
     */
    data: usersCreateManyInput | usersCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * users update
   */
  export type usersUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * The data needed to update a users.
     */
    data: XOR<usersUpdateInput, usersUncheckedUpdateInput>
    /**
     * Choose, which users to update.
     */
    where: usersWhereUniqueInput
  }

  /**
   * users updateMany
   */
  export type usersUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update users.
     */
    data: XOR<usersUpdateManyMutationInput, usersUncheckedUpdateManyInput>
    /**
     * Filter which users to update
     */
    where?: usersWhereInput
    /**
     * Limit how many users to update.
     */
    limit?: number
  }

  /**
   * users upsert
   */
  export type usersUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * The filter to search for the users to update in case it exists.
     */
    where: usersWhereUniqueInput
    /**
     * In case the users found by the `where` argument doesn't exist, create a new users with this data.
     */
    create: XOR<usersCreateInput, usersUncheckedCreateInput>
    /**
     * In case the users was found with the provided `where` argument, update it with this data.
     */
    update: XOR<usersUpdateInput, usersUncheckedUpdateInput>
  }

  /**
   * users delete
   */
  export type usersDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * Filter which users to delete.
     */
    where: usersWhereUniqueInput
  }

  /**
   * users deleteMany
   */
  export type usersDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which users to delete
     */
    where?: usersWhereInput
    /**
     * Limit how many users to delete.
     */
    limit?: number
  }

  /**
   * users.coments
   */
  export type users$comentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the coments
     */
    select?: comentsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the coments
     */
    omit?: comentsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: comentsInclude<ExtArgs> | null
    where?: comentsWhereInput
    orderBy?: comentsOrderByWithRelationInput | comentsOrderByWithRelationInput[]
    cursor?: comentsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ComentsScalarFieldEnum | ComentsScalarFieldEnum[]
  }

  /**
   * users.post
   */
  export type users$postArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the post
     */
    select?: postSelect<ExtArgs> | null
    /**
     * Omit specific fields from the post
     */
    omit?: postOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: postInclude<ExtArgs> | null
    where?: postWhereInput
    orderBy?: postOrderByWithRelationInput | postOrderByWithRelationInput[]
    cursor?: postWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PostScalarFieldEnum | PostScalarFieldEnum[]
  }

  /**
   * users.responses
   */
  export type users$responsesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the responses
     */
    select?: responsesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the responses
     */
    omit?: responsesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: responsesInclude<ExtArgs> | null
    where?: responsesWhereInput
    orderBy?: responsesOrderByWithRelationInput | responsesOrderByWithRelationInput[]
    cursor?: responsesWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ResponsesScalarFieldEnum | ResponsesScalarFieldEnum[]
  }

  /**
   * users without action
   */
  export type usersDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const ComentsScalarFieldEnum: {
    idComents: 'idComents',
    content: 'content',
    createdAt: 'createdAt',
    Users_id: 'Users_id',
    Post_idPost: 'Post_idPost'
  };

  export type ComentsScalarFieldEnum = (typeof ComentsScalarFieldEnum)[keyof typeof ComentsScalarFieldEnum]


  export const PostScalarFieldEnum: {
    idPost: 'idPost',
    region: 'region',
    content: 'content',
    createdAt: 'createdAt',
    Users_id: 'Users_id'
  };

  export type PostScalarFieldEnum = (typeof PostScalarFieldEnum)[keyof typeof PostScalarFieldEnum]


  export const ResponsesScalarFieldEnum: {
    idResponse: 'idResponse',
    content: 'content',
    createdAt: 'createdAt',
    Users_id: 'Users_id',
    Post_idPost: 'Post_idPost'
  };

  export type ResponsesScalarFieldEnum = (typeof ResponsesScalarFieldEnum)[keyof typeof ResponsesScalarFieldEnum]


  export const UsersScalarFieldEnum: {
    id: 'id',
    nome: 'nome',
    email: 'email',
    senha: 'senha',
    foto: 'foto',
    acesso: 'acesso',
    ativo: 'ativo'
  };

  export type UsersScalarFieldEnum = (typeof UsersScalarFieldEnum)[keyof typeof UsersScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const comentsOrderByRelevanceFieldEnum: {
    content: 'content'
  };

  export type comentsOrderByRelevanceFieldEnum = (typeof comentsOrderByRelevanceFieldEnum)[keyof typeof comentsOrderByRelevanceFieldEnum]


  export const postOrderByRelevanceFieldEnum: {
    region: 'region',
    content: 'content'
  };

  export type postOrderByRelevanceFieldEnum = (typeof postOrderByRelevanceFieldEnum)[keyof typeof postOrderByRelevanceFieldEnum]


  export const responsesOrderByRelevanceFieldEnum: {
    content: 'content'
  };

  export type responsesOrderByRelevanceFieldEnum = (typeof responsesOrderByRelevanceFieldEnum)[keyof typeof responsesOrderByRelevanceFieldEnum]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const usersOrderByRelevanceFieldEnum: {
    nome: 'nome',
    email: 'email',
    senha: 'senha',
    foto: 'foto'
  };

  export type usersOrderByRelevanceFieldEnum = (typeof usersOrderByRelevanceFieldEnum)[keyof typeof usersOrderByRelevanceFieldEnum]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'users_acesso'
   */
  export type Enumusers_acessoFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'users_acesso'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    
  /**
   * Deep Input Types
   */


  export type comentsWhereInput = {
    AND?: comentsWhereInput | comentsWhereInput[]
    OR?: comentsWhereInput[]
    NOT?: comentsWhereInput | comentsWhereInput[]
    idComents?: IntFilter<"coments"> | number
    content?: StringFilter<"coments"> | string
    createdAt?: DateTimeFilter<"coments"> | Date | string
    Users_id?: IntFilter<"coments"> | number
    Post_idPost?: IntFilter<"coments"> | number
    post?: XOR<PostScalarRelationFilter, postWhereInput>
    users?: XOR<UsersScalarRelationFilter, usersWhereInput>
  }

  export type comentsOrderByWithRelationInput = {
    idComents?: SortOrder
    content?: SortOrder
    createdAt?: SortOrder
    Users_id?: SortOrder
    Post_idPost?: SortOrder
    post?: postOrderByWithRelationInput
    users?: usersOrderByWithRelationInput
    _relevance?: comentsOrderByRelevanceInput
  }

  export type comentsWhereUniqueInput = Prisma.AtLeast<{
    idComents?: number
    AND?: comentsWhereInput | comentsWhereInput[]
    OR?: comentsWhereInput[]
    NOT?: comentsWhereInput | comentsWhereInput[]
    content?: StringFilter<"coments"> | string
    createdAt?: DateTimeFilter<"coments"> | Date | string
    Users_id?: IntFilter<"coments"> | number
    Post_idPost?: IntFilter<"coments"> | number
    post?: XOR<PostScalarRelationFilter, postWhereInput>
    users?: XOR<UsersScalarRelationFilter, usersWhereInput>
  }, "idComents">

  export type comentsOrderByWithAggregationInput = {
    idComents?: SortOrder
    content?: SortOrder
    createdAt?: SortOrder
    Users_id?: SortOrder
    Post_idPost?: SortOrder
    _count?: comentsCountOrderByAggregateInput
    _avg?: comentsAvgOrderByAggregateInput
    _max?: comentsMaxOrderByAggregateInput
    _min?: comentsMinOrderByAggregateInput
    _sum?: comentsSumOrderByAggregateInput
  }

  export type comentsScalarWhereWithAggregatesInput = {
    AND?: comentsScalarWhereWithAggregatesInput | comentsScalarWhereWithAggregatesInput[]
    OR?: comentsScalarWhereWithAggregatesInput[]
    NOT?: comentsScalarWhereWithAggregatesInput | comentsScalarWhereWithAggregatesInput[]
    idComents?: IntWithAggregatesFilter<"coments"> | number
    content?: StringWithAggregatesFilter<"coments"> | string
    createdAt?: DateTimeWithAggregatesFilter<"coments"> | Date | string
    Users_id?: IntWithAggregatesFilter<"coments"> | number
    Post_idPost?: IntWithAggregatesFilter<"coments"> | number
  }

  export type postWhereInput = {
    AND?: postWhereInput | postWhereInput[]
    OR?: postWhereInput[]
    NOT?: postWhereInput | postWhereInput[]
    idPost?: IntFilter<"post"> | number
    region?: StringFilter<"post"> | string
    content?: StringFilter<"post"> | string
    createdAt?: DateTimeFilter<"post"> | Date | string
    Users_id?: IntFilter<"post"> | number
    coments?: ComentsListRelationFilter
    users?: XOR<UsersScalarRelationFilter, usersWhereInput>
    responses?: ResponsesListRelationFilter
  }

  export type postOrderByWithRelationInput = {
    idPost?: SortOrder
    region?: SortOrder
    content?: SortOrder
    createdAt?: SortOrder
    Users_id?: SortOrder
    coments?: comentsOrderByRelationAggregateInput
    users?: usersOrderByWithRelationInput
    responses?: responsesOrderByRelationAggregateInput
    _relevance?: postOrderByRelevanceInput
  }

  export type postWhereUniqueInput = Prisma.AtLeast<{
    idPost?: number
    AND?: postWhereInput | postWhereInput[]
    OR?: postWhereInput[]
    NOT?: postWhereInput | postWhereInput[]
    region?: StringFilter<"post"> | string
    content?: StringFilter<"post"> | string
    createdAt?: DateTimeFilter<"post"> | Date | string
    Users_id?: IntFilter<"post"> | number
    coments?: ComentsListRelationFilter
    users?: XOR<UsersScalarRelationFilter, usersWhereInput>
    responses?: ResponsesListRelationFilter
  }, "idPost">

  export type postOrderByWithAggregationInput = {
    idPost?: SortOrder
    region?: SortOrder
    content?: SortOrder
    createdAt?: SortOrder
    Users_id?: SortOrder
    _count?: postCountOrderByAggregateInput
    _avg?: postAvgOrderByAggregateInput
    _max?: postMaxOrderByAggregateInput
    _min?: postMinOrderByAggregateInput
    _sum?: postSumOrderByAggregateInput
  }

  export type postScalarWhereWithAggregatesInput = {
    AND?: postScalarWhereWithAggregatesInput | postScalarWhereWithAggregatesInput[]
    OR?: postScalarWhereWithAggregatesInput[]
    NOT?: postScalarWhereWithAggregatesInput | postScalarWhereWithAggregatesInput[]
    idPost?: IntWithAggregatesFilter<"post"> | number
    region?: StringWithAggregatesFilter<"post"> | string
    content?: StringWithAggregatesFilter<"post"> | string
    createdAt?: DateTimeWithAggregatesFilter<"post"> | Date | string
    Users_id?: IntWithAggregatesFilter<"post"> | number
  }

  export type responsesWhereInput = {
    AND?: responsesWhereInput | responsesWhereInput[]
    OR?: responsesWhereInput[]
    NOT?: responsesWhereInput | responsesWhereInput[]
    idResponse?: IntFilter<"responses"> | number
    content?: StringFilter<"responses"> | string
    createdAt?: DateTimeFilter<"responses"> | Date | string
    Users_id?: IntFilter<"responses"> | number
    Post_idPost?: IntFilter<"responses"> | number
    post?: XOR<PostScalarRelationFilter, postWhereInput>
    users?: XOR<UsersScalarRelationFilter, usersWhereInput>
  }

  export type responsesOrderByWithRelationInput = {
    idResponse?: SortOrder
    content?: SortOrder
    createdAt?: SortOrder
    Users_id?: SortOrder
    Post_idPost?: SortOrder
    post?: postOrderByWithRelationInput
    users?: usersOrderByWithRelationInput
    _relevance?: responsesOrderByRelevanceInput
  }

  export type responsesWhereUniqueInput = Prisma.AtLeast<{
    idResponse?: number
    AND?: responsesWhereInput | responsesWhereInput[]
    OR?: responsesWhereInput[]
    NOT?: responsesWhereInput | responsesWhereInput[]
    content?: StringFilter<"responses"> | string
    createdAt?: DateTimeFilter<"responses"> | Date | string
    Users_id?: IntFilter<"responses"> | number
    Post_idPost?: IntFilter<"responses"> | number
    post?: XOR<PostScalarRelationFilter, postWhereInput>
    users?: XOR<UsersScalarRelationFilter, usersWhereInput>
  }, "idResponse">

  export type responsesOrderByWithAggregationInput = {
    idResponse?: SortOrder
    content?: SortOrder
    createdAt?: SortOrder
    Users_id?: SortOrder
    Post_idPost?: SortOrder
    _count?: responsesCountOrderByAggregateInput
    _avg?: responsesAvgOrderByAggregateInput
    _max?: responsesMaxOrderByAggregateInput
    _min?: responsesMinOrderByAggregateInput
    _sum?: responsesSumOrderByAggregateInput
  }

  export type responsesScalarWhereWithAggregatesInput = {
    AND?: responsesScalarWhereWithAggregatesInput | responsesScalarWhereWithAggregatesInput[]
    OR?: responsesScalarWhereWithAggregatesInput[]
    NOT?: responsesScalarWhereWithAggregatesInput | responsesScalarWhereWithAggregatesInput[]
    idResponse?: IntWithAggregatesFilter<"responses"> | number
    content?: StringWithAggregatesFilter<"responses"> | string
    createdAt?: DateTimeWithAggregatesFilter<"responses"> | Date | string
    Users_id?: IntWithAggregatesFilter<"responses"> | number
    Post_idPost?: IntWithAggregatesFilter<"responses"> | number
  }

  export type usersWhereInput = {
    AND?: usersWhereInput | usersWhereInput[]
    OR?: usersWhereInput[]
    NOT?: usersWhereInput | usersWhereInput[]
    id?: IntFilter<"users"> | number
    nome?: StringFilter<"users"> | string
    email?: StringFilter<"users"> | string
    senha?: StringFilter<"users"> | string
    foto?: StringNullableFilter<"users"> | string | null
    acesso?: Enumusers_acessoFilter<"users"> | $Enums.users_acesso
    ativo?: IntFilter<"users"> | number
    coments?: ComentsListRelationFilter
    post?: PostListRelationFilter
    responses?: ResponsesListRelationFilter
  }

  export type usersOrderByWithRelationInput = {
    id?: SortOrder
    nome?: SortOrder
    email?: SortOrder
    senha?: SortOrder
    foto?: SortOrderInput | SortOrder
    acesso?: SortOrder
    ativo?: SortOrder
    coments?: comentsOrderByRelationAggregateInput
    post?: postOrderByRelationAggregateInput
    responses?: responsesOrderByRelationAggregateInput
    _relevance?: usersOrderByRelevanceInput
  }

  export type usersWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    email?: string
    AND?: usersWhereInput | usersWhereInput[]
    OR?: usersWhereInput[]
    NOT?: usersWhereInput | usersWhereInput[]
    nome?: StringFilter<"users"> | string
    senha?: StringFilter<"users"> | string
    foto?: StringNullableFilter<"users"> | string | null
    acesso?: Enumusers_acessoFilter<"users"> | $Enums.users_acesso
    ativo?: IntFilter<"users"> | number
    coments?: ComentsListRelationFilter
    post?: PostListRelationFilter
    responses?: ResponsesListRelationFilter
  }, "id" | "email">

  export type usersOrderByWithAggregationInput = {
    id?: SortOrder
    nome?: SortOrder
    email?: SortOrder
    senha?: SortOrder
    foto?: SortOrderInput | SortOrder
    acesso?: SortOrder
    ativo?: SortOrder
    _count?: usersCountOrderByAggregateInput
    _avg?: usersAvgOrderByAggregateInput
    _max?: usersMaxOrderByAggregateInput
    _min?: usersMinOrderByAggregateInput
    _sum?: usersSumOrderByAggregateInput
  }

  export type usersScalarWhereWithAggregatesInput = {
    AND?: usersScalarWhereWithAggregatesInput | usersScalarWhereWithAggregatesInput[]
    OR?: usersScalarWhereWithAggregatesInput[]
    NOT?: usersScalarWhereWithAggregatesInput | usersScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"users"> | number
    nome?: StringWithAggregatesFilter<"users"> | string
    email?: StringWithAggregatesFilter<"users"> | string
    senha?: StringWithAggregatesFilter<"users"> | string
    foto?: StringNullableWithAggregatesFilter<"users"> | string | null
    acesso?: Enumusers_acessoWithAggregatesFilter<"users"> | $Enums.users_acesso
    ativo?: IntWithAggregatesFilter<"users"> | number
  }

  export type comentsCreateInput = {
    content: string
    createdAt: Date | string
    post: postCreateNestedOneWithoutComentsInput
    users: usersCreateNestedOneWithoutComentsInput
  }

  export type comentsUncheckedCreateInput = {
    idComents?: number
    content: string
    createdAt: Date | string
    Users_id: number
    Post_idPost: number
  }

  export type comentsUpdateInput = {
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    post?: postUpdateOneRequiredWithoutComentsNestedInput
    users?: usersUpdateOneRequiredWithoutComentsNestedInput
  }

  export type comentsUncheckedUpdateInput = {
    idComents?: IntFieldUpdateOperationsInput | number
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    Users_id?: IntFieldUpdateOperationsInput | number
    Post_idPost?: IntFieldUpdateOperationsInput | number
  }

  export type comentsCreateManyInput = {
    idComents?: number
    content: string
    createdAt: Date | string
    Users_id: number
    Post_idPost: number
  }

  export type comentsUpdateManyMutationInput = {
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type comentsUncheckedUpdateManyInput = {
    idComents?: IntFieldUpdateOperationsInput | number
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    Users_id?: IntFieldUpdateOperationsInput | number
    Post_idPost?: IntFieldUpdateOperationsInput | number
  }

  export type postCreateInput = {
    region: string
    content: string
    createdAt: Date | string
    coments?: comentsCreateNestedManyWithoutPostInput
    users: usersCreateNestedOneWithoutPostInput
    responses?: responsesCreateNestedManyWithoutPostInput
  }

  export type postUncheckedCreateInput = {
    idPost?: number
    region: string
    content: string
    createdAt: Date | string
    Users_id: number
    coments?: comentsUncheckedCreateNestedManyWithoutPostInput
    responses?: responsesUncheckedCreateNestedManyWithoutPostInput
  }

  export type postUpdateInput = {
    region?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    coments?: comentsUpdateManyWithoutPostNestedInput
    users?: usersUpdateOneRequiredWithoutPostNestedInput
    responses?: responsesUpdateManyWithoutPostNestedInput
  }

  export type postUncheckedUpdateInput = {
    idPost?: IntFieldUpdateOperationsInput | number
    region?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    Users_id?: IntFieldUpdateOperationsInput | number
    coments?: comentsUncheckedUpdateManyWithoutPostNestedInput
    responses?: responsesUncheckedUpdateManyWithoutPostNestedInput
  }

  export type postCreateManyInput = {
    idPost?: number
    region: string
    content: string
    createdAt: Date | string
    Users_id: number
  }

  export type postUpdateManyMutationInput = {
    region?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type postUncheckedUpdateManyInput = {
    idPost?: IntFieldUpdateOperationsInput | number
    region?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    Users_id?: IntFieldUpdateOperationsInput | number
  }

  export type responsesCreateInput = {
    content: string
    createdAt: Date | string
    post: postCreateNestedOneWithoutResponsesInput
    users: usersCreateNestedOneWithoutResponsesInput
  }

  export type responsesUncheckedCreateInput = {
    idResponse?: number
    content: string
    createdAt: Date | string
    Users_id: number
    Post_idPost: number
  }

  export type responsesUpdateInput = {
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    post?: postUpdateOneRequiredWithoutResponsesNestedInput
    users?: usersUpdateOneRequiredWithoutResponsesNestedInput
  }

  export type responsesUncheckedUpdateInput = {
    idResponse?: IntFieldUpdateOperationsInput | number
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    Users_id?: IntFieldUpdateOperationsInput | number
    Post_idPost?: IntFieldUpdateOperationsInput | number
  }

  export type responsesCreateManyInput = {
    idResponse?: number
    content: string
    createdAt: Date | string
    Users_id: number
    Post_idPost: number
  }

  export type responsesUpdateManyMutationInput = {
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type responsesUncheckedUpdateManyInput = {
    idResponse?: IntFieldUpdateOperationsInput | number
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    Users_id?: IntFieldUpdateOperationsInput | number
    Post_idPost?: IntFieldUpdateOperationsInput | number
  }

  export type usersCreateInput = {
    nome: string
    email: string
    senha: string
    foto?: string | null
    acesso?: $Enums.users_acesso
    ativo?: number
    coments?: comentsCreateNestedManyWithoutUsersInput
    post?: postCreateNestedManyWithoutUsersInput
    responses?: responsesCreateNestedManyWithoutUsersInput
  }

  export type usersUncheckedCreateInput = {
    id?: number
    nome: string
    email: string
    senha: string
    foto?: string | null
    acesso?: $Enums.users_acesso
    ativo?: number
    coments?: comentsUncheckedCreateNestedManyWithoutUsersInput
    post?: postUncheckedCreateNestedManyWithoutUsersInput
    responses?: responsesUncheckedCreateNestedManyWithoutUsersInput
  }

  export type usersUpdateInput = {
    nome?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    senha?: StringFieldUpdateOperationsInput | string
    foto?: NullableStringFieldUpdateOperationsInput | string | null
    acesso?: Enumusers_acessoFieldUpdateOperationsInput | $Enums.users_acesso
    ativo?: IntFieldUpdateOperationsInput | number
    coments?: comentsUpdateManyWithoutUsersNestedInput
    post?: postUpdateManyWithoutUsersNestedInput
    responses?: responsesUpdateManyWithoutUsersNestedInput
  }

  export type usersUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    nome?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    senha?: StringFieldUpdateOperationsInput | string
    foto?: NullableStringFieldUpdateOperationsInput | string | null
    acesso?: Enumusers_acessoFieldUpdateOperationsInput | $Enums.users_acesso
    ativo?: IntFieldUpdateOperationsInput | number
    coments?: comentsUncheckedUpdateManyWithoutUsersNestedInput
    post?: postUncheckedUpdateManyWithoutUsersNestedInput
    responses?: responsesUncheckedUpdateManyWithoutUsersNestedInput
  }

  export type usersCreateManyInput = {
    id?: number
    nome: string
    email: string
    senha: string
    foto?: string | null
    acesso?: $Enums.users_acesso
    ativo?: number
  }

  export type usersUpdateManyMutationInput = {
    nome?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    senha?: StringFieldUpdateOperationsInput | string
    foto?: NullableStringFieldUpdateOperationsInput | string | null
    acesso?: Enumusers_acessoFieldUpdateOperationsInput | $Enums.users_acesso
    ativo?: IntFieldUpdateOperationsInput | number
  }

  export type usersUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    nome?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    senha?: StringFieldUpdateOperationsInput | string
    foto?: NullableStringFieldUpdateOperationsInput | string | null
    acesso?: Enumusers_acessoFieldUpdateOperationsInput | $Enums.users_acesso
    ativo?: IntFieldUpdateOperationsInput | number
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type PostScalarRelationFilter = {
    is?: postWhereInput
    isNot?: postWhereInput
  }

  export type UsersScalarRelationFilter = {
    is?: usersWhereInput
    isNot?: usersWhereInput
  }

  export type comentsOrderByRelevanceInput = {
    fields: comentsOrderByRelevanceFieldEnum | comentsOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type comentsCountOrderByAggregateInput = {
    idComents?: SortOrder
    content?: SortOrder
    createdAt?: SortOrder
    Users_id?: SortOrder
    Post_idPost?: SortOrder
  }

  export type comentsAvgOrderByAggregateInput = {
    idComents?: SortOrder
    Users_id?: SortOrder
    Post_idPost?: SortOrder
  }

  export type comentsMaxOrderByAggregateInput = {
    idComents?: SortOrder
    content?: SortOrder
    createdAt?: SortOrder
    Users_id?: SortOrder
    Post_idPost?: SortOrder
  }

  export type comentsMinOrderByAggregateInput = {
    idComents?: SortOrder
    content?: SortOrder
    createdAt?: SortOrder
    Users_id?: SortOrder
    Post_idPost?: SortOrder
  }

  export type comentsSumOrderByAggregateInput = {
    idComents?: SortOrder
    Users_id?: SortOrder
    Post_idPost?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type ComentsListRelationFilter = {
    every?: comentsWhereInput
    some?: comentsWhereInput
    none?: comentsWhereInput
  }

  export type ResponsesListRelationFilter = {
    every?: responsesWhereInput
    some?: responsesWhereInput
    none?: responsesWhereInput
  }

  export type comentsOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type responsesOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type postOrderByRelevanceInput = {
    fields: postOrderByRelevanceFieldEnum | postOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type postCountOrderByAggregateInput = {
    idPost?: SortOrder
    region?: SortOrder
    content?: SortOrder
    createdAt?: SortOrder
    Users_id?: SortOrder
  }

  export type postAvgOrderByAggregateInput = {
    idPost?: SortOrder
    Users_id?: SortOrder
  }

  export type postMaxOrderByAggregateInput = {
    idPost?: SortOrder
    region?: SortOrder
    content?: SortOrder
    createdAt?: SortOrder
    Users_id?: SortOrder
  }

  export type postMinOrderByAggregateInput = {
    idPost?: SortOrder
    region?: SortOrder
    content?: SortOrder
    createdAt?: SortOrder
    Users_id?: SortOrder
  }

  export type postSumOrderByAggregateInput = {
    idPost?: SortOrder
    Users_id?: SortOrder
  }

  export type responsesOrderByRelevanceInput = {
    fields: responsesOrderByRelevanceFieldEnum | responsesOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type responsesCountOrderByAggregateInput = {
    idResponse?: SortOrder
    content?: SortOrder
    createdAt?: SortOrder
    Users_id?: SortOrder
    Post_idPost?: SortOrder
  }

  export type responsesAvgOrderByAggregateInput = {
    idResponse?: SortOrder
    Users_id?: SortOrder
    Post_idPost?: SortOrder
  }

  export type responsesMaxOrderByAggregateInput = {
    idResponse?: SortOrder
    content?: SortOrder
    createdAt?: SortOrder
    Users_id?: SortOrder
    Post_idPost?: SortOrder
  }

  export type responsesMinOrderByAggregateInput = {
    idResponse?: SortOrder
    content?: SortOrder
    createdAt?: SortOrder
    Users_id?: SortOrder
    Post_idPost?: SortOrder
  }

  export type responsesSumOrderByAggregateInput = {
    idResponse?: SortOrder
    Users_id?: SortOrder
    Post_idPost?: SortOrder
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type Enumusers_acessoFilter<$PrismaModel = never> = {
    equals?: $Enums.users_acesso | Enumusers_acessoFieldRefInput<$PrismaModel>
    in?: $Enums.users_acesso[]
    notIn?: $Enums.users_acesso[]
    not?: NestedEnumusers_acessoFilter<$PrismaModel> | $Enums.users_acesso
  }

  export type PostListRelationFilter = {
    every?: postWhereInput
    some?: postWhereInput
    none?: postWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type postOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type usersOrderByRelevanceInput = {
    fields: usersOrderByRelevanceFieldEnum | usersOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type usersCountOrderByAggregateInput = {
    id?: SortOrder
    nome?: SortOrder
    email?: SortOrder
    senha?: SortOrder
    foto?: SortOrder
    acesso?: SortOrder
    ativo?: SortOrder
  }

  export type usersAvgOrderByAggregateInput = {
    id?: SortOrder
    ativo?: SortOrder
  }

  export type usersMaxOrderByAggregateInput = {
    id?: SortOrder
    nome?: SortOrder
    email?: SortOrder
    senha?: SortOrder
    foto?: SortOrder
    acesso?: SortOrder
    ativo?: SortOrder
  }

  export type usersMinOrderByAggregateInput = {
    id?: SortOrder
    nome?: SortOrder
    email?: SortOrder
    senha?: SortOrder
    foto?: SortOrder
    acesso?: SortOrder
    ativo?: SortOrder
  }

  export type usersSumOrderByAggregateInput = {
    id?: SortOrder
    ativo?: SortOrder
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type Enumusers_acessoWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.users_acesso | Enumusers_acessoFieldRefInput<$PrismaModel>
    in?: $Enums.users_acesso[]
    notIn?: $Enums.users_acesso[]
    not?: NestedEnumusers_acessoWithAggregatesFilter<$PrismaModel> | $Enums.users_acesso
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumusers_acessoFilter<$PrismaModel>
    _max?: NestedEnumusers_acessoFilter<$PrismaModel>
  }

  export type postCreateNestedOneWithoutComentsInput = {
    create?: XOR<postCreateWithoutComentsInput, postUncheckedCreateWithoutComentsInput>
    connectOrCreate?: postCreateOrConnectWithoutComentsInput
    connect?: postWhereUniqueInput
  }

  export type usersCreateNestedOneWithoutComentsInput = {
    create?: XOR<usersCreateWithoutComentsInput, usersUncheckedCreateWithoutComentsInput>
    connectOrCreate?: usersCreateOrConnectWithoutComentsInput
    connect?: usersWhereUniqueInput
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type postUpdateOneRequiredWithoutComentsNestedInput = {
    create?: XOR<postCreateWithoutComentsInput, postUncheckedCreateWithoutComentsInput>
    connectOrCreate?: postCreateOrConnectWithoutComentsInput
    upsert?: postUpsertWithoutComentsInput
    connect?: postWhereUniqueInput
    update?: XOR<XOR<postUpdateToOneWithWhereWithoutComentsInput, postUpdateWithoutComentsInput>, postUncheckedUpdateWithoutComentsInput>
  }

  export type usersUpdateOneRequiredWithoutComentsNestedInput = {
    create?: XOR<usersCreateWithoutComentsInput, usersUncheckedCreateWithoutComentsInput>
    connectOrCreate?: usersCreateOrConnectWithoutComentsInput
    upsert?: usersUpsertWithoutComentsInput
    connect?: usersWhereUniqueInput
    update?: XOR<XOR<usersUpdateToOneWithWhereWithoutComentsInput, usersUpdateWithoutComentsInput>, usersUncheckedUpdateWithoutComentsInput>
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type comentsCreateNestedManyWithoutPostInput = {
    create?: XOR<comentsCreateWithoutPostInput, comentsUncheckedCreateWithoutPostInput> | comentsCreateWithoutPostInput[] | comentsUncheckedCreateWithoutPostInput[]
    connectOrCreate?: comentsCreateOrConnectWithoutPostInput | comentsCreateOrConnectWithoutPostInput[]
    createMany?: comentsCreateManyPostInputEnvelope
    connect?: comentsWhereUniqueInput | comentsWhereUniqueInput[]
  }

  export type usersCreateNestedOneWithoutPostInput = {
    create?: XOR<usersCreateWithoutPostInput, usersUncheckedCreateWithoutPostInput>
    connectOrCreate?: usersCreateOrConnectWithoutPostInput
    connect?: usersWhereUniqueInput
  }

  export type responsesCreateNestedManyWithoutPostInput = {
    create?: XOR<responsesCreateWithoutPostInput, responsesUncheckedCreateWithoutPostInput> | responsesCreateWithoutPostInput[] | responsesUncheckedCreateWithoutPostInput[]
    connectOrCreate?: responsesCreateOrConnectWithoutPostInput | responsesCreateOrConnectWithoutPostInput[]
    createMany?: responsesCreateManyPostInputEnvelope
    connect?: responsesWhereUniqueInput | responsesWhereUniqueInput[]
  }

  export type comentsUncheckedCreateNestedManyWithoutPostInput = {
    create?: XOR<comentsCreateWithoutPostInput, comentsUncheckedCreateWithoutPostInput> | comentsCreateWithoutPostInput[] | comentsUncheckedCreateWithoutPostInput[]
    connectOrCreate?: comentsCreateOrConnectWithoutPostInput | comentsCreateOrConnectWithoutPostInput[]
    createMany?: comentsCreateManyPostInputEnvelope
    connect?: comentsWhereUniqueInput | comentsWhereUniqueInput[]
  }

  export type responsesUncheckedCreateNestedManyWithoutPostInput = {
    create?: XOR<responsesCreateWithoutPostInput, responsesUncheckedCreateWithoutPostInput> | responsesCreateWithoutPostInput[] | responsesUncheckedCreateWithoutPostInput[]
    connectOrCreate?: responsesCreateOrConnectWithoutPostInput | responsesCreateOrConnectWithoutPostInput[]
    createMany?: responsesCreateManyPostInputEnvelope
    connect?: responsesWhereUniqueInput | responsesWhereUniqueInput[]
  }

  export type comentsUpdateManyWithoutPostNestedInput = {
    create?: XOR<comentsCreateWithoutPostInput, comentsUncheckedCreateWithoutPostInput> | comentsCreateWithoutPostInput[] | comentsUncheckedCreateWithoutPostInput[]
    connectOrCreate?: comentsCreateOrConnectWithoutPostInput | comentsCreateOrConnectWithoutPostInput[]
    upsert?: comentsUpsertWithWhereUniqueWithoutPostInput | comentsUpsertWithWhereUniqueWithoutPostInput[]
    createMany?: comentsCreateManyPostInputEnvelope
    set?: comentsWhereUniqueInput | comentsWhereUniqueInput[]
    disconnect?: comentsWhereUniqueInput | comentsWhereUniqueInput[]
    delete?: comentsWhereUniqueInput | comentsWhereUniqueInput[]
    connect?: comentsWhereUniqueInput | comentsWhereUniqueInput[]
    update?: comentsUpdateWithWhereUniqueWithoutPostInput | comentsUpdateWithWhereUniqueWithoutPostInput[]
    updateMany?: comentsUpdateManyWithWhereWithoutPostInput | comentsUpdateManyWithWhereWithoutPostInput[]
    deleteMany?: comentsScalarWhereInput | comentsScalarWhereInput[]
  }

  export type usersUpdateOneRequiredWithoutPostNestedInput = {
    create?: XOR<usersCreateWithoutPostInput, usersUncheckedCreateWithoutPostInput>
    connectOrCreate?: usersCreateOrConnectWithoutPostInput
    upsert?: usersUpsertWithoutPostInput
    connect?: usersWhereUniqueInput
    update?: XOR<XOR<usersUpdateToOneWithWhereWithoutPostInput, usersUpdateWithoutPostInput>, usersUncheckedUpdateWithoutPostInput>
  }

  export type responsesUpdateManyWithoutPostNestedInput = {
    create?: XOR<responsesCreateWithoutPostInput, responsesUncheckedCreateWithoutPostInput> | responsesCreateWithoutPostInput[] | responsesUncheckedCreateWithoutPostInput[]
    connectOrCreate?: responsesCreateOrConnectWithoutPostInput | responsesCreateOrConnectWithoutPostInput[]
    upsert?: responsesUpsertWithWhereUniqueWithoutPostInput | responsesUpsertWithWhereUniqueWithoutPostInput[]
    createMany?: responsesCreateManyPostInputEnvelope
    set?: responsesWhereUniqueInput | responsesWhereUniqueInput[]
    disconnect?: responsesWhereUniqueInput | responsesWhereUniqueInput[]
    delete?: responsesWhereUniqueInput | responsesWhereUniqueInput[]
    connect?: responsesWhereUniqueInput | responsesWhereUniqueInput[]
    update?: responsesUpdateWithWhereUniqueWithoutPostInput | responsesUpdateWithWhereUniqueWithoutPostInput[]
    updateMany?: responsesUpdateManyWithWhereWithoutPostInput | responsesUpdateManyWithWhereWithoutPostInput[]
    deleteMany?: responsesScalarWhereInput | responsesScalarWhereInput[]
  }

  export type comentsUncheckedUpdateManyWithoutPostNestedInput = {
    create?: XOR<comentsCreateWithoutPostInput, comentsUncheckedCreateWithoutPostInput> | comentsCreateWithoutPostInput[] | comentsUncheckedCreateWithoutPostInput[]
    connectOrCreate?: comentsCreateOrConnectWithoutPostInput | comentsCreateOrConnectWithoutPostInput[]
    upsert?: comentsUpsertWithWhereUniqueWithoutPostInput | comentsUpsertWithWhereUniqueWithoutPostInput[]
    createMany?: comentsCreateManyPostInputEnvelope
    set?: comentsWhereUniqueInput | comentsWhereUniqueInput[]
    disconnect?: comentsWhereUniqueInput | comentsWhereUniqueInput[]
    delete?: comentsWhereUniqueInput | comentsWhereUniqueInput[]
    connect?: comentsWhereUniqueInput | comentsWhereUniqueInput[]
    update?: comentsUpdateWithWhereUniqueWithoutPostInput | comentsUpdateWithWhereUniqueWithoutPostInput[]
    updateMany?: comentsUpdateManyWithWhereWithoutPostInput | comentsUpdateManyWithWhereWithoutPostInput[]
    deleteMany?: comentsScalarWhereInput | comentsScalarWhereInput[]
  }

  export type responsesUncheckedUpdateManyWithoutPostNestedInput = {
    create?: XOR<responsesCreateWithoutPostInput, responsesUncheckedCreateWithoutPostInput> | responsesCreateWithoutPostInput[] | responsesUncheckedCreateWithoutPostInput[]
    connectOrCreate?: responsesCreateOrConnectWithoutPostInput | responsesCreateOrConnectWithoutPostInput[]
    upsert?: responsesUpsertWithWhereUniqueWithoutPostInput | responsesUpsertWithWhereUniqueWithoutPostInput[]
    createMany?: responsesCreateManyPostInputEnvelope
    set?: responsesWhereUniqueInput | responsesWhereUniqueInput[]
    disconnect?: responsesWhereUniqueInput | responsesWhereUniqueInput[]
    delete?: responsesWhereUniqueInput | responsesWhereUniqueInput[]
    connect?: responsesWhereUniqueInput | responsesWhereUniqueInput[]
    update?: responsesUpdateWithWhereUniqueWithoutPostInput | responsesUpdateWithWhereUniqueWithoutPostInput[]
    updateMany?: responsesUpdateManyWithWhereWithoutPostInput | responsesUpdateManyWithWhereWithoutPostInput[]
    deleteMany?: responsesScalarWhereInput | responsesScalarWhereInput[]
  }

  export type postCreateNestedOneWithoutResponsesInput = {
    create?: XOR<postCreateWithoutResponsesInput, postUncheckedCreateWithoutResponsesInput>
    connectOrCreate?: postCreateOrConnectWithoutResponsesInput
    connect?: postWhereUniqueInput
  }

  export type usersCreateNestedOneWithoutResponsesInput = {
    create?: XOR<usersCreateWithoutResponsesInput, usersUncheckedCreateWithoutResponsesInput>
    connectOrCreate?: usersCreateOrConnectWithoutResponsesInput
    connect?: usersWhereUniqueInput
  }

  export type postUpdateOneRequiredWithoutResponsesNestedInput = {
    create?: XOR<postCreateWithoutResponsesInput, postUncheckedCreateWithoutResponsesInput>
    connectOrCreate?: postCreateOrConnectWithoutResponsesInput
    upsert?: postUpsertWithoutResponsesInput
    connect?: postWhereUniqueInput
    update?: XOR<XOR<postUpdateToOneWithWhereWithoutResponsesInput, postUpdateWithoutResponsesInput>, postUncheckedUpdateWithoutResponsesInput>
  }

  export type usersUpdateOneRequiredWithoutResponsesNestedInput = {
    create?: XOR<usersCreateWithoutResponsesInput, usersUncheckedCreateWithoutResponsesInput>
    connectOrCreate?: usersCreateOrConnectWithoutResponsesInput
    upsert?: usersUpsertWithoutResponsesInput
    connect?: usersWhereUniqueInput
    update?: XOR<XOR<usersUpdateToOneWithWhereWithoutResponsesInput, usersUpdateWithoutResponsesInput>, usersUncheckedUpdateWithoutResponsesInput>
  }

  export type comentsCreateNestedManyWithoutUsersInput = {
    create?: XOR<comentsCreateWithoutUsersInput, comentsUncheckedCreateWithoutUsersInput> | comentsCreateWithoutUsersInput[] | comentsUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: comentsCreateOrConnectWithoutUsersInput | comentsCreateOrConnectWithoutUsersInput[]
    createMany?: comentsCreateManyUsersInputEnvelope
    connect?: comentsWhereUniqueInput | comentsWhereUniqueInput[]
  }

  export type postCreateNestedManyWithoutUsersInput = {
    create?: XOR<postCreateWithoutUsersInput, postUncheckedCreateWithoutUsersInput> | postCreateWithoutUsersInput[] | postUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: postCreateOrConnectWithoutUsersInput | postCreateOrConnectWithoutUsersInput[]
    createMany?: postCreateManyUsersInputEnvelope
    connect?: postWhereUniqueInput | postWhereUniqueInput[]
  }

  export type responsesCreateNestedManyWithoutUsersInput = {
    create?: XOR<responsesCreateWithoutUsersInput, responsesUncheckedCreateWithoutUsersInput> | responsesCreateWithoutUsersInput[] | responsesUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: responsesCreateOrConnectWithoutUsersInput | responsesCreateOrConnectWithoutUsersInput[]
    createMany?: responsesCreateManyUsersInputEnvelope
    connect?: responsesWhereUniqueInput | responsesWhereUniqueInput[]
  }

  export type comentsUncheckedCreateNestedManyWithoutUsersInput = {
    create?: XOR<comentsCreateWithoutUsersInput, comentsUncheckedCreateWithoutUsersInput> | comentsCreateWithoutUsersInput[] | comentsUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: comentsCreateOrConnectWithoutUsersInput | comentsCreateOrConnectWithoutUsersInput[]
    createMany?: comentsCreateManyUsersInputEnvelope
    connect?: comentsWhereUniqueInput | comentsWhereUniqueInput[]
  }

  export type postUncheckedCreateNestedManyWithoutUsersInput = {
    create?: XOR<postCreateWithoutUsersInput, postUncheckedCreateWithoutUsersInput> | postCreateWithoutUsersInput[] | postUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: postCreateOrConnectWithoutUsersInput | postCreateOrConnectWithoutUsersInput[]
    createMany?: postCreateManyUsersInputEnvelope
    connect?: postWhereUniqueInput | postWhereUniqueInput[]
  }

  export type responsesUncheckedCreateNestedManyWithoutUsersInput = {
    create?: XOR<responsesCreateWithoutUsersInput, responsesUncheckedCreateWithoutUsersInput> | responsesCreateWithoutUsersInput[] | responsesUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: responsesCreateOrConnectWithoutUsersInput | responsesCreateOrConnectWithoutUsersInput[]
    createMany?: responsesCreateManyUsersInputEnvelope
    connect?: responsesWhereUniqueInput | responsesWhereUniqueInput[]
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type Enumusers_acessoFieldUpdateOperationsInput = {
    set?: $Enums.users_acesso
  }

  export type comentsUpdateManyWithoutUsersNestedInput = {
    create?: XOR<comentsCreateWithoutUsersInput, comentsUncheckedCreateWithoutUsersInput> | comentsCreateWithoutUsersInput[] | comentsUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: comentsCreateOrConnectWithoutUsersInput | comentsCreateOrConnectWithoutUsersInput[]
    upsert?: comentsUpsertWithWhereUniqueWithoutUsersInput | comentsUpsertWithWhereUniqueWithoutUsersInput[]
    createMany?: comentsCreateManyUsersInputEnvelope
    set?: comentsWhereUniqueInput | comentsWhereUniqueInput[]
    disconnect?: comentsWhereUniqueInput | comentsWhereUniqueInput[]
    delete?: comentsWhereUniqueInput | comentsWhereUniqueInput[]
    connect?: comentsWhereUniqueInput | comentsWhereUniqueInput[]
    update?: comentsUpdateWithWhereUniqueWithoutUsersInput | comentsUpdateWithWhereUniqueWithoutUsersInput[]
    updateMany?: comentsUpdateManyWithWhereWithoutUsersInput | comentsUpdateManyWithWhereWithoutUsersInput[]
    deleteMany?: comentsScalarWhereInput | comentsScalarWhereInput[]
  }

  export type postUpdateManyWithoutUsersNestedInput = {
    create?: XOR<postCreateWithoutUsersInput, postUncheckedCreateWithoutUsersInput> | postCreateWithoutUsersInput[] | postUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: postCreateOrConnectWithoutUsersInput | postCreateOrConnectWithoutUsersInput[]
    upsert?: postUpsertWithWhereUniqueWithoutUsersInput | postUpsertWithWhereUniqueWithoutUsersInput[]
    createMany?: postCreateManyUsersInputEnvelope
    set?: postWhereUniqueInput | postWhereUniqueInput[]
    disconnect?: postWhereUniqueInput | postWhereUniqueInput[]
    delete?: postWhereUniqueInput | postWhereUniqueInput[]
    connect?: postWhereUniqueInput | postWhereUniqueInput[]
    update?: postUpdateWithWhereUniqueWithoutUsersInput | postUpdateWithWhereUniqueWithoutUsersInput[]
    updateMany?: postUpdateManyWithWhereWithoutUsersInput | postUpdateManyWithWhereWithoutUsersInput[]
    deleteMany?: postScalarWhereInput | postScalarWhereInput[]
  }

  export type responsesUpdateManyWithoutUsersNestedInput = {
    create?: XOR<responsesCreateWithoutUsersInput, responsesUncheckedCreateWithoutUsersInput> | responsesCreateWithoutUsersInput[] | responsesUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: responsesCreateOrConnectWithoutUsersInput | responsesCreateOrConnectWithoutUsersInput[]
    upsert?: responsesUpsertWithWhereUniqueWithoutUsersInput | responsesUpsertWithWhereUniqueWithoutUsersInput[]
    createMany?: responsesCreateManyUsersInputEnvelope
    set?: responsesWhereUniqueInput | responsesWhereUniqueInput[]
    disconnect?: responsesWhereUniqueInput | responsesWhereUniqueInput[]
    delete?: responsesWhereUniqueInput | responsesWhereUniqueInput[]
    connect?: responsesWhereUniqueInput | responsesWhereUniqueInput[]
    update?: responsesUpdateWithWhereUniqueWithoutUsersInput | responsesUpdateWithWhereUniqueWithoutUsersInput[]
    updateMany?: responsesUpdateManyWithWhereWithoutUsersInput | responsesUpdateManyWithWhereWithoutUsersInput[]
    deleteMany?: responsesScalarWhereInput | responsesScalarWhereInput[]
  }

  export type comentsUncheckedUpdateManyWithoutUsersNestedInput = {
    create?: XOR<comentsCreateWithoutUsersInput, comentsUncheckedCreateWithoutUsersInput> | comentsCreateWithoutUsersInput[] | comentsUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: comentsCreateOrConnectWithoutUsersInput | comentsCreateOrConnectWithoutUsersInput[]
    upsert?: comentsUpsertWithWhereUniqueWithoutUsersInput | comentsUpsertWithWhereUniqueWithoutUsersInput[]
    createMany?: comentsCreateManyUsersInputEnvelope
    set?: comentsWhereUniqueInput | comentsWhereUniqueInput[]
    disconnect?: comentsWhereUniqueInput | comentsWhereUniqueInput[]
    delete?: comentsWhereUniqueInput | comentsWhereUniqueInput[]
    connect?: comentsWhereUniqueInput | comentsWhereUniqueInput[]
    update?: comentsUpdateWithWhereUniqueWithoutUsersInput | comentsUpdateWithWhereUniqueWithoutUsersInput[]
    updateMany?: comentsUpdateManyWithWhereWithoutUsersInput | comentsUpdateManyWithWhereWithoutUsersInput[]
    deleteMany?: comentsScalarWhereInput | comentsScalarWhereInput[]
  }

  export type postUncheckedUpdateManyWithoutUsersNestedInput = {
    create?: XOR<postCreateWithoutUsersInput, postUncheckedCreateWithoutUsersInput> | postCreateWithoutUsersInput[] | postUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: postCreateOrConnectWithoutUsersInput | postCreateOrConnectWithoutUsersInput[]
    upsert?: postUpsertWithWhereUniqueWithoutUsersInput | postUpsertWithWhereUniqueWithoutUsersInput[]
    createMany?: postCreateManyUsersInputEnvelope
    set?: postWhereUniqueInput | postWhereUniqueInput[]
    disconnect?: postWhereUniqueInput | postWhereUniqueInput[]
    delete?: postWhereUniqueInput | postWhereUniqueInput[]
    connect?: postWhereUniqueInput | postWhereUniqueInput[]
    update?: postUpdateWithWhereUniqueWithoutUsersInput | postUpdateWithWhereUniqueWithoutUsersInput[]
    updateMany?: postUpdateManyWithWhereWithoutUsersInput | postUpdateManyWithWhereWithoutUsersInput[]
    deleteMany?: postScalarWhereInput | postScalarWhereInput[]
  }

  export type responsesUncheckedUpdateManyWithoutUsersNestedInput = {
    create?: XOR<responsesCreateWithoutUsersInput, responsesUncheckedCreateWithoutUsersInput> | responsesCreateWithoutUsersInput[] | responsesUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: responsesCreateOrConnectWithoutUsersInput | responsesCreateOrConnectWithoutUsersInput[]
    upsert?: responsesUpsertWithWhereUniqueWithoutUsersInput | responsesUpsertWithWhereUniqueWithoutUsersInput[]
    createMany?: responsesCreateManyUsersInputEnvelope
    set?: responsesWhereUniqueInput | responsesWhereUniqueInput[]
    disconnect?: responsesWhereUniqueInput | responsesWhereUniqueInput[]
    delete?: responsesWhereUniqueInput | responsesWhereUniqueInput[]
    connect?: responsesWhereUniqueInput | responsesWhereUniqueInput[]
    update?: responsesUpdateWithWhereUniqueWithoutUsersInput | responsesUpdateWithWhereUniqueWithoutUsersInput[]
    updateMany?: responsesUpdateManyWithWhereWithoutUsersInput | responsesUpdateManyWithWhereWithoutUsersInput[]
    deleteMany?: responsesScalarWhereInput | responsesScalarWhereInput[]
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedEnumusers_acessoFilter<$PrismaModel = never> = {
    equals?: $Enums.users_acesso | Enumusers_acessoFieldRefInput<$PrismaModel>
    in?: $Enums.users_acesso[]
    notIn?: $Enums.users_acesso[]
    not?: NestedEnumusers_acessoFilter<$PrismaModel> | $Enums.users_acesso
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedEnumusers_acessoWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.users_acesso | Enumusers_acessoFieldRefInput<$PrismaModel>
    in?: $Enums.users_acesso[]
    notIn?: $Enums.users_acesso[]
    not?: NestedEnumusers_acessoWithAggregatesFilter<$PrismaModel> | $Enums.users_acesso
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumusers_acessoFilter<$PrismaModel>
    _max?: NestedEnumusers_acessoFilter<$PrismaModel>
  }

  export type postCreateWithoutComentsInput = {
    region: string
    content: string
    createdAt: Date | string
    users: usersCreateNestedOneWithoutPostInput
    responses?: responsesCreateNestedManyWithoutPostInput
  }

  export type postUncheckedCreateWithoutComentsInput = {
    idPost?: number
    region: string
    content: string
    createdAt: Date | string
    Users_id: number
    responses?: responsesUncheckedCreateNestedManyWithoutPostInput
  }

  export type postCreateOrConnectWithoutComentsInput = {
    where: postWhereUniqueInput
    create: XOR<postCreateWithoutComentsInput, postUncheckedCreateWithoutComentsInput>
  }

  export type usersCreateWithoutComentsInput = {
    nome: string
    email: string
    senha: string
    foto?: string | null
    acesso?: $Enums.users_acesso
    ativo?: number
    post?: postCreateNestedManyWithoutUsersInput
    responses?: responsesCreateNestedManyWithoutUsersInput
  }

  export type usersUncheckedCreateWithoutComentsInput = {
    id?: number
    nome: string
    email: string
    senha: string
    foto?: string | null
    acesso?: $Enums.users_acesso
    ativo?: number
    post?: postUncheckedCreateNestedManyWithoutUsersInput
    responses?: responsesUncheckedCreateNestedManyWithoutUsersInput
  }

  export type usersCreateOrConnectWithoutComentsInput = {
    where: usersWhereUniqueInput
    create: XOR<usersCreateWithoutComentsInput, usersUncheckedCreateWithoutComentsInput>
  }

  export type postUpsertWithoutComentsInput = {
    update: XOR<postUpdateWithoutComentsInput, postUncheckedUpdateWithoutComentsInput>
    create: XOR<postCreateWithoutComentsInput, postUncheckedCreateWithoutComentsInput>
    where?: postWhereInput
  }

  export type postUpdateToOneWithWhereWithoutComentsInput = {
    where?: postWhereInput
    data: XOR<postUpdateWithoutComentsInput, postUncheckedUpdateWithoutComentsInput>
  }

  export type postUpdateWithoutComentsInput = {
    region?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: usersUpdateOneRequiredWithoutPostNestedInput
    responses?: responsesUpdateManyWithoutPostNestedInput
  }

  export type postUncheckedUpdateWithoutComentsInput = {
    idPost?: IntFieldUpdateOperationsInput | number
    region?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    Users_id?: IntFieldUpdateOperationsInput | number
    responses?: responsesUncheckedUpdateManyWithoutPostNestedInput
  }

  export type usersUpsertWithoutComentsInput = {
    update: XOR<usersUpdateWithoutComentsInput, usersUncheckedUpdateWithoutComentsInput>
    create: XOR<usersCreateWithoutComentsInput, usersUncheckedCreateWithoutComentsInput>
    where?: usersWhereInput
  }

  export type usersUpdateToOneWithWhereWithoutComentsInput = {
    where?: usersWhereInput
    data: XOR<usersUpdateWithoutComentsInput, usersUncheckedUpdateWithoutComentsInput>
  }

  export type usersUpdateWithoutComentsInput = {
    nome?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    senha?: StringFieldUpdateOperationsInput | string
    foto?: NullableStringFieldUpdateOperationsInput | string | null
    acesso?: Enumusers_acessoFieldUpdateOperationsInput | $Enums.users_acesso
    ativo?: IntFieldUpdateOperationsInput | number
    post?: postUpdateManyWithoutUsersNestedInput
    responses?: responsesUpdateManyWithoutUsersNestedInput
  }

  export type usersUncheckedUpdateWithoutComentsInput = {
    id?: IntFieldUpdateOperationsInput | number
    nome?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    senha?: StringFieldUpdateOperationsInput | string
    foto?: NullableStringFieldUpdateOperationsInput | string | null
    acesso?: Enumusers_acessoFieldUpdateOperationsInput | $Enums.users_acesso
    ativo?: IntFieldUpdateOperationsInput | number
    post?: postUncheckedUpdateManyWithoutUsersNestedInput
    responses?: responsesUncheckedUpdateManyWithoutUsersNestedInput
  }

  export type comentsCreateWithoutPostInput = {
    content: string
    createdAt: Date | string
    users: usersCreateNestedOneWithoutComentsInput
  }

  export type comentsUncheckedCreateWithoutPostInput = {
    idComents?: number
    content: string
    createdAt: Date | string
    Users_id: number
  }

  export type comentsCreateOrConnectWithoutPostInput = {
    where: comentsWhereUniqueInput
    create: XOR<comentsCreateWithoutPostInput, comentsUncheckedCreateWithoutPostInput>
  }

  export type comentsCreateManyPostInputEnvelope = {
    data: comentsCreateManyPostInput | comentsCreateManyPostInput[]
    skipDuplicates?: boolean
  }

  export type usersCreateWithoutPostInput = {
    nome: string
    email: string
    senha: string
    foto?: string | null
    acesso?: $Enums.users_acesso
    ativo?: number
    coments?: comentsCreateNestedManyWithoutUsersInput
    responses?: responsesCreateNestedManyWithoutUsersInput
  }

  export type usersUncheckedCreateWithoutPostInput = {
    id?: number
    nome: string
    email: string
    senha: string
    foto?: string | null
    acesso?: $Enums.users_acesso
    ativo?: number
    coments?: comentsUncheckedCreateNestedManyWithoutUsersInput
    responses?: responsesUncheckedCreateNestedManyWithoutUsersInput
  }

  export type usersCreateOrConnectWithoutPostInput = {
    where: usersWhereUniqueInput
    create: XOR<usersCreateWithoutPostInput, usersUncheckedCreateWithoutPostInput>
  }

  export type responsesCreateWithoutPostInput = {
    content: string
    createdAt: Date | string
    users: usersCreateNestedOneWithoutResponsesInput
  }

  export type responsesUncheckedCreateWithoutPostInput = {
    idResponse?: number
    content: string
    createdAt: Date | string
    Users_id: number
  }

  export type responsesCreateOrConnectWithoutPostInput = {
    where: responsesWhereUniqueInput
    create: XOR<responsesCreateWithoutPostInput, responsesUncheckedCreateWithoutPostInput>
  }

  export type responsesCreateManyPostInputEnvelope = {
    data: responsesCreateManyPostInput | responsesCreateManyPostInput[]
    skipDuplicates?: boolean
  }

  export type comentsUpsertWithWhereUniqueWithoutPostInput = {
    where: comentsWhereUniqueInput
    update: XOR<comentsUpdateWithoutPostInput, comentsUncheckedUpdateWithoutPostInput>
    create: XOR<comentsCreateWithoutPostInput, comentsUncheckedCreateWithoutPostInput>
  }

  export type comentsUpdateWithWhereUniqueWithoutPostInput = {
    where: comentsWhereUniqueInput
    data: XOR<comentsUpdateWithoutPostInput, comentsUncheckedUpdateWithoutPostInput>
  }

  export type comentsUpdateManyWithWhereWithoutPostInput = {
    where: comentsScalarWhereInput
    data: XOR<comentsUpdateManyMutationInput, comentsUncheckedUpdateManyWithoutPostInput>
  }

  export type comentsScalarWhereInput = {
    AND?: comentsScalarWhereInput | comentsScalarWhereInput[]
    OR?: comentsScalarWhereInput[]
    NOT?: comentsScalarWhereInput | comentsScalarWhereInput[]
    idComents?: IntFilter<"coments"> | number
    content?: StringFilter<"coments"> | string
    createdAt?: DateTimeFilter<"coments"> | Date | string
    Users_id?: IntFilter<"coments"> | number
    Post_idPost?: IntFilter<"coments"> | number
  }

  export type usersUpsertWithoutPostInput = {
    update: XOR<usersUpdateWithoutPostInput, usersUncheckedUpdateWithoutPostInput>
    create: XOR<usersCreateWithoutPostInput, usersUncheckedCreateWithoutPostInput>
    where?: usersWhereInput
  }

  export type usersUpdateToOneWithWhereWithoutPostInput = {
    where?: usersWhereInput
    data: XOR<usersUpdateWithoutPostInput, usersUncheckedUpdateWithoutPostInput>
  }

  export type usersUpdateWithoutPostInput = {
    nome?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    senha?: StringFieldUpdateOperationsInput | string
    foto?: NullableStringFieldUpdateOperationsInput | string | null
    acesso?: Enumusers_acessoFieldUpdateOperationsInput | $Enums.users_acesso
    ativo?: IntFieldUpdateOperationsInput | number
    coments?: comentsUpdateManyWithoutUsersNestedInput
    responses?: responsesUpdateManyWithoutUsersNestedInput
  }

  export type usersUncheckedUpdateWithoutPostInput = {
    id?: IntFieldUpdateOperationsInput | number
    nome?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    senha?: StringFieldUpdateOperationsInput | string
    foto?: NullableStringFieldUpdateOperationsInput | string | null
    acesso?: Enumusers_acessoFieldUpdateOperationsInput | $Enums.users_acesso
    ativo?: IntFieldUpdateOperationsInput | number
    coments?: comentsUncheckedUpdateManyWithoutUsersNestedInput
    responses?: responsesUncheckedUpdateManyWithoutUsersNestedInput
  }

  export type responsesUpsertWithWhereUniqueWithoutPostInput = {
    where: responsesWhereUniqueInput
    update: XOR<responsesUpdateWithoutPostInput, responsesUncheckedUpdateWithoutPostInput>
    create: XOR<responsesCreateWithoutPostInput, responsesUncheckedCreateWithoutPostInput>
  }

  export type responsesUpdateWithWhereUniqueWithoutPostInput = {
    where: responsesWhereUniqueInput
    data: XOR<responsesUpdateWithoutPostInput, responsesUncheckedUpdateWithoutPostInput>
  }

  export type responsesUpdateManyWithWhereWithoutPostInput = {
    where: responsesScalarWhereInput
    data: XOR<responsesUpdateManyMutationInput, responsesUncheckedUpdateManyWithoutPostInput>
  }

  export type responsesScalarWhereInput = {
    AND?: responsesScalarWhereInput | responsesScalarWhereInput[]
    OR?: responsesScalarWhereInput[]
    NOT?: responsesScalarWhereInput | responsesScalarWhereInput[]
    idResponse?: IntFilter<"responses"> | number
    content?: StringFilter<"responses"> | string
    createdAt?: DateTimeFilter<"responses"> | Date | string
    Users_id?: IntFilter<"responses"> | number
    Post_idPost?: IntFilter<"responses"> | number
  }

  export type postCreateWithoutResponsesInput = {
    region: string
    content: string
    createdAt: Date | string
    coments?: comentsCreateNestedManyWithoutPostInput
    users: usersCreateNestedOneWithoutPostInput
  }

  export type postUncheckedCreateWithoutResponsesInput = {
    idPost?: number
    region: string
    content: string
    createdAt: Date | string
    Users_id: number
    coments?: comentsUncheckedCreateNestedManyWithoutPostInput
  }

  export type postCreateOrConnectWithoutResponsesInput = {
    where: postWhereUniqueInput
    create: XOR<postCreateWithoutResponsesInput, postUncheckedCreateWithoutResponsesInput>
  }

  export type usersCreateWithoutResponsesInput = {
    nome: string
    email: string
    senha: string
    foto?: string | null
    acesso?: $Enums.users_acesso
    ativo?: number
    coments?: comentsCreateNestedManyWithoutUsersInput
    post?: postCreateNestedManyWithoutUsersInput
  }

  export type usersUncheckedCreateWithoutResponsesInput = {
    id?: number
    nome: string
    email: string
    senha: string
    foto?: string | null
    acesso?: $Enums.users_acesso
    ativo?: number
    coments?: comentsUncheckedCreateNestedManyWithoutUsersInput
    post?: postUncheckedCreateNestedManyWithoutUsersInput
  }

  export type usersCreateOrConnectWithoutResponsesInput = {
    where: usersWhereUniqueInput
    create: XOR<usersCreateWithoutResponsesInput, usersUncheckedCreateWithoutResponsesInput>
  }

  export type postUpsertWithoutResponsesInput = {
    update: XOR<postUpdateWithoutResponsesInput, postUncheckedUpdateWithoutResponsesInput>
    create: XOR<postCreateWithoutResponsesInput, postUncheckedCreateWithoutResponsesInput>
    where?: postWhereInput
  }

  export type postUpdateToOneWithWhereWithoutResponsesInput = {
    where?: postWhereInput
    data: XOR<postUpdateWithoutResponsesInput, postUncheckedUpdateWithoutResponsesInput>
  }

  export type postUpdateWithoutResponsesInput = {
    region?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    coments?: comentsUpdateManyWithoutPostNestedInput
    users?: usersUpdateOneRequiredWithoutPostNestedInput
  }

  export type postUncheckedUpdateWithoutResponsesInput = {
    idPost?: IntFieldUpdateOperationsInput | number
    region?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    Users_id?: IntFieldUpdateOperationsInput | number
    coments?: comentsUncheckedUpdateManyWithoutPostNestedInput
  }

  export type usersUpsertWithoutResponsesInput = {
    update: XOR<usersUpdateWithoutResponsesInput, usersUncheckedUpdateWithoutResponsesInput>
    create: XOR<usersCreateWithoutResponsesInput, usersUncheckedCreateWithoutResponsesInput>
    where?: usersWhereInput
  }

  export type usersUpdateToOneWithWhereWithoutResponsesInput = {
    where?: usersWhereInput
    data: XOR<usersUpdateWithoutResponsesInput, usersUncheckedUpdateWithoutResponsesInput>
  }

  export type usersUpdateWithoutResponsesInput = {
    nome?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    senha?: StringFieldUpdateOperationsInput | string
    foto?: NullableStringFieldUpdateOperationsInput | string | null
    acesso?: Enumusers_acessoFieldUpdateOperationsInput | $Enums.users_acesso
    ativo?: IntFieldUpdateOperationsInput | number
    coments?: comentsUpdateManyWithoutUsersNestedInput
    post?: postUpdateManyWithoutUsersNestedInput
  }

  export type usersUncheckedUpdateWithoutResponsesInput = {
    id?: IntFieldUpdateOperationsInput | number
    nome?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    senha?: StringFieldUpdateOperationsInput | string
    foto?: NullableStringFieldUpdateOperationsInput | string | null
    acesso?: Enumusers_acessoFieldUpdateOperationsInput | $Enums.users_acesso
    ativo?: IntFieldUpdateOperationsInput | number
    coments?: comentsUncheckedUpdateManyWithoutUsersNestedInput
    post?: postUncheckedUpdateManyWithoutUsersNestedInput
  }

  export type comentsCreateWithoutUsersInput = {
    content: string
    createdAt: Date | string
    post: postCreateNestedOneWithoutComentsInput
  }

  export type comentsUncheckedCreateWithoutUsersInput = {
    idComents?: number
    content: string
    createdAt: Date | string
    Post_idPost: number
  }

  export type comentsCreateOrConnectWithoutUsersInput = {
    where: comentsWhereUniqueInput
    create: XOR<comentsCreateWithoutUsersInput, comentsUncheckedCreateWithoutUsersInput>
  }

  export type comentsCreateManyUsersInputEnvelope = {
    data: comentsCreateManyUsersInput | comentsCreateManyUsersInput[]
    skipDuplicates?: boolean
  }

  export type postCreateWithoutUsersInput = {
    region: string
    content: string
    createdAt: Date | string
    coments?: comentsCreateNestedManyWithoutPostInput
    responses?: responsesCreateNestedManyWithoutPostInput
  }

  export type postUncheckedCreateWithoutUsersInput = {
    idPost?: number
    region: string
    content: string
    createdAt: Date | string
    coments?: comentsUncheckedCreateNestedManyWithoutPostInput
    responses?: responsesUncheckedCreateNestedManyWithoutPostInput
  }

  export type postCreateOrConnectWithoutUsersInput = {
    where: postWhereUniqueInput
    create: XOR<postCreateWithoutUsersInput, postUncheckedCreateWithoutUsersInput>
  }

  export type postCreateManyUsersInputEnvelope = {
    data: postCreateManyUsersInput | postCreateManyUsersInput[]
    skipDuplicates?: boolean
  }

  export type responsesCreateWithoutUsersInput = {
    content: string
    createdAt: Date | string
    post: postCreateNestedOneWithoutResponsesInput
  }

  export type responsesUncheckedCreateWithoutUsersInput = {
    idResponse?: number
    content: string
    createdAt: Date | string
    Post_idPost: number
  }

  export type responsesCreateOrConnectWithoutUsersInput = {
    where: responsesWhereUniqueInput
    create: XOR<responsesCreateWithoutUsersInput, responsesUncheckedCreateWithoutUsersInput>
  }

  export type responsesCreateManyUsersInputEnvelope = {
    data: responsesCreateManyUsersInput | responsesCreateManyUsersInput[]
    skipDuplicates?: boolean
  }

  export type comentsUpsertWithWhereUniqueWithoutUsersInput = {
    where: comentsWhereUniqueInput
    update: XOR<comentsUpdateWithoutUsersInput, comentsUncheckedUpdateWithoutUsersInput>
    create: XOR<comentsCreateWithoutUsersInput, comentsUncheckedCreateWithoutUsersInput>
  }

  export type comentsUpdateWithWhereUniqueWithoutUsersInput = {
    where: comentsWhereUniqueInput
    data: XOR<comentsUpdateWithoutUsersInput, comentsUncheckedUpdateWithoutUsersInput>
  }

  export type comentsUpdateManyWithWhereWithoutUsersInput = {
    where: comentsScalarWhereInput
    data: XOR<comentsUpdateManyMutationInput, comentsUncheckedUpdateManyWithoutUsersInput>
  }

  export type postUpsertWithWhereUniqueWithoutUsersInput = {
    where: postWhereUniqueInput
    update: XOR<postUpdateWithoutUsersInput, postUncheckedUpdateWithoutUsersInput>
    create: XOR<postCreateWithoutUsersInput, postUncheckedCreateWithoutUsersInput>
  }

  export type postUpdateWithWhereUniqueWithoutUsersInput = {
    where: postWhereUniqueInput
    data: XOR<postUpdateWithoutUsersInput, postUncheckedUpdateWithoutUsersInput>
  }

  export type postUpdateManyWithWhereWithoutUsersInput = {
    where: postScalarWhereInput
    data: XOR<postUpdateManyMutationInput, postUncheckedUpdateManyWithoutUsersInput>
  }

  export type postScalarWhereInput = {
    AND?: postScalarWhereInput | postScalarWhereInput[]
    OR?: postScalarWhereInput[]
    NOT?: postScalarWhereInput | postScalarWhereInput[]
    idPost?: IntFilter<"post"> | number
    region?: StringFilter<"post"> | string
    content?: StringFilter<"post"> | string
    createdAt?: DateTimeFilter<"post"> | Date | string
    Users_id?: IntFilter<"post"> | number
  }

  export type responsesUpsertWithWhereUniqueWithoutUsersInput = {
    where: responsesWhereUniqueInput
    update: XOR<responsesUpdateWithoutUsersInput, responsesUncheckedUpdateWithoutUsersInput>
    create: XOR<responsesCreateWithoutUsersInput, responsesUncheckedCreateWithoutUsersInput>
  }

  export type responsesUpdateWithWhereUniqueWithoutUsersInput = {
    where: responsesWhereUniqueInput
    data: XOR<responsesUpdateWithoutUsersInput, responsesUncheckedUpdateWithoutUsersInput>
  }

  export type responsesUpdateManyWithWhereWithoutUsersInput = {
    where: responsesScalarWhereInput
    data: XOR<responsesUpdateManyMutationInput, responsesUncheckedUpdateManyWithoutUsersInput>
  }

  export type comentsCreateManyPostInput = {
    idComents?: number
    content: string
    createdAt: Date | string
    Users_id: number
  }

  export type responsesCreateManyPostInput = {
    idResponse?: number
    content: string
    createdAt: Date | string
    Users_id: number
  }

  export type comentsUpdateWithoutPostInput = {
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: usersUpdateOneRequiredWithoutComentsNestedInput
  }

  export type comentsUncheckedUpdateWithoutPostInput = {
    idComents?: IntFieldUpdateOperationsInput | number
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    Users_id?: IntFieldUpdateOperationsInput | number
  }

  export type comentsUncheckedUpdateManyWithoutPostInput = {
    idComents?: IntFieldUpdateOperationsInput | number
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    Users_id?: IntFieldUpdateOperationsInput | number
  }

  export type responsesUpdateWithoutPostInput = {
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: usersUpdateOneRequiredWithoutResponsesNestedInput
  }

  export type responsesUncheckedUpdateWithoutPostInput = {
    idResponse?: IntFieldUpdateOperationsInput | number
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    Users_id?: IntFieldUpdateOperationsInput | number
  }

  export type responsesUncheckedUpdateManyWithoutPostInput = {
    idResponse?: IntFieldUpdateOperationsInput | number
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    Users_id?: IntFieldUpdateOperationsInput | number
  }

  export type comentsCreateManyUsersInput = {
    idComents?: number
    content: string
    createdAt: Date | string
    Post_idPost: number
  }

  export type postCreateManyUsersInput = {
    idPost?: number
    region: string
    content: string
    createdAt: Date | string
  }

  export type responsesCreateManyUsersInput = {
    idResponse?: number
    content: string
    createdAt: Date | string
    Post_idPost: number
  }

  export type comentsUpdateWithoutUsersInput = {
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    post?: postUpdateOneRequiredWithoutComentsNestedInput
  }

  export type comentsUncheckedUpdateWithoutUsersInput = {
    idComents?: IntFieldUpdateOperationsInput | number
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    Post_idPost?: IntFieldUpdateOperationsInput | number
  }

  export type comentsUncheckedUpdateManyWithoutUsersInput = {
    idComents?: IntFieldUpdateOperationsInput | number
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    Post_idPost?: IntFieldUpdateOperationsInput | number
  }

  export type postUpdateWithoutUsersInput = {
    region?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    coments?: comentsUpdateManyWithoutPostNestedInput
    responses?: responsesUpdateManyWithoutPostNestedInput
  }

  export type postUncheckedUpdateWithoutUsersInput = {
    idPost?: IntFieldUpdateOperationsInput | number
    region?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    coments?: comentsUncheckedUpdateManyWithoutPostNestedInput
    responses?: responsesUncheckedUpdateManyWithoutPostNestedInput
  }

  export type postUncheckedUpdateManyWithoutUsersInput = {
    idPost?: IntFieldUpdateOperationsInput | number
    region?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type responsesUpdateWithoutUsersInput = {
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    post?: postUpdateOneRequiredWithoutResponsesNestedInput
  }

  export type responsesUncheckedUpdateWithoutUsersInput = {
    idResponse?: IntFieldUpdateOperationsInput | number
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    Post_idPost?: IntFieldUpdateOperationsInput | number
  }

  export type responsesUncheckedUpdateManyWithoutUsersInput = {
    idResponse?: IntFieldUpdateOperationsInput | number
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    Post_idPost?: IntFieldUpdateOperationsInput | number
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}