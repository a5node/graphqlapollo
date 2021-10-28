'use strict';
import 'reflect-metadata';
import { GraphQLSchema } from 'graphql';
import { ObjectId } from 'mongodb';
import { buildSchema, NonEmptyArray } from 'type-graphql';
import { ObjectIdScalar } from '../scalar/ObjectId.scalar';

// import { gql } from 'apollo-server';

class builderSchema {
  private schema!: GraphQLSchema;
  private resolvers!: NonEmptyArray<string>;

  public async initResolvers(resolver: any) {
    const res: any = [];

    if (this.resolvers) {
      console.dir('value 2');

      res.push(resolver, this.resolvers);
      this.resolvers = res;
    } else {
      console.dir('value 1');
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
