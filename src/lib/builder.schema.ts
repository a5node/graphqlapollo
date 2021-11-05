'use strict';
import 'reflect-metadata';
import { GraphQLSchema } from 'graphql';
import { ObjectId } from 'mongodb';
import { buildSchema, NonEmptyArray, AuthChecker } from 'type-graphql';
import { ObjectIdScalar } from '../scalar/ObjectId.scalar';

class builderSchema {
  private schema!: GraphQLSchema;
  private resolvers!: NonEmptyArray<string>;
  private orphanedTypes!: Function[];
  private _authChecker!: AuthChecker;

  public async initResolvers(resolver: any) {
    const res: NonEmptyArray<string> | any = [__dirname + '../modules/**/*.resolver.{ts,js}'];
    if (this.resolvers) {
      res.push(resolver, this.resolvers);
      this.resolvers = res;
    } else {
      this.resolvers = resolver;
    }
  }

  public async initOrphanedTypes(orphanedTypes: Function[]) {
    const res: Function[] = [];
    if (this.orphanedTypes) {
      res.push(...orphanedTypes, ...this.orphanedTypes);
      this.orphanedTypes = res;
    } else {
      this.orphanedTypes = [...orphanedTypes];
    }
  }

  public authChecker(authChecker: AuthChecker) {
    this._authChecker = authChecker;
  }

  public get _resolvers() {
    return this.resolvers;
  }

  public async initSchema(): Promise<GraphQLSchema> {
    this.schema = await buildSchema({
      resolvers: this.resolvers,
      emitSchemaFile: true,
      dateScalarMode: 'timestamp',
      scalarsMap: [{ type: ObjectId, scalar: ObjectIdScalar }],
      orphanedTypes: this.orphanedTypes,
      authChecker: this._authChecker,
      //authMode: 'null', //If we need silent auth guards and don't want to return authorization errors to users
      // validate?: ValidateSettings;
      // pubSub?: PubSubEngine | PubSubOptions;
      // globalMiddlewares?: Array<Middleware<any>>;
      // container?: ContainerType | ContainerGetter<any>;
    });

    return this.schema;
  }
}

export default new builderSchema();
