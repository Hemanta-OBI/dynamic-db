// src/dynamic-schema.service.ts
import { Injectable } from '@nestjs/common';
import { Connection, Model, Schema } from 'mongoose';

@Injectable()
export class DynamicSchemaService {
  private modelCache = new Map<string, Model<any>>();

  getModelForConnection(
    connection: Connection,
    schemaName: string,
    schemaDefinition?: any,
  ): Model<any> {
    const cacheKey = `${connection.name}_${schemaName}`;
    console.log('cacheKey', cacheKey);
    // Check if the model is already cached
    if (this.modelCache.has(cacheKey)) {
      console.log('this.modelCache.has(cacheKey)');
      return this.modelCache.get(cacheKey);
    }

    // Check if the model is already defined in the connection
    if (connection.models[schemaName]) {
      const model = connection.model(schemaName);
      console.log('connection.models[schemaName]', model);
      this.modelCache.set(cacheKey, model);
      return model;
    }

    // Define a new model and cache it
    const schema = new Schema(schemaDefinition, {
      strict: false,
      versionKey: false,
    });

    const model = connection.model(schemaName, schema);
    this.modelCache.set(cacheKey, model);
    return model;
  }
}
