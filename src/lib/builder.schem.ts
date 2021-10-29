'use strict';
import 'reflect-metadata';
import { GraphQLSchema } from 'graphql';
import { ObjectId } from 'mongodb';
import { buildSchema, NonEmptyArray } from 'type-graphql';
import { ObjectIdScalar } from '../scalar/ObjectId.scalar';

class builderSchema {
  private schema!: GraphQLSchema;
  private resolvers!: NonEmptyArray<string>;

  public async initResolvers(resolver: any) {
    const res: NonEmptyArray<string> | any = [__dirname + '../modules/**/*.resolver.{ts,js}'];
    if (this.resolvers) {
      res.push(resolver, this.resolvers);
      this.resolvers = res;
    } else {
      this.resolvers = resolver;
    }
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
    });

    return this.schema;
  }
}

export default new builderSchema();
