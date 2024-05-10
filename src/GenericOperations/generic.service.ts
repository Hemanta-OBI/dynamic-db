// src/crud.service.ts
import { Injectable } from '@nestjs/common';
import { DynamicConnectionService } from 'src/database/dynamicConnection.service';
import { DynamicSchemaService } from 'src/database/dynamicSchema.service';

@Injectable()
export class GenericService {
  constructor(
    private dynamicConnectionService: DynamicConnectionService,
    private dynamicSchemaService: DynamicSchemaService,
  ) {}

  async createSchema(uri: string, schemaName: string, schemaDefinition: any) {
    const connection =
      await this.dynamicConnectionService.getOrCreateConnection(uri);
    const model = this.dynamicSchemaService.getModelForConnection(
      connection,
      schemaName,
      schemaDefinition,
    );
    console.log('connection.modelNames()', connection.modelNames());
    console.log('model', model);
    // const document = new model(data);
    // return document.save();

    // Check if the model already exists
  }
  // async updateSchema(
  //   uri: string,
  //   schemaName: string,
  //   updatedSchemaDefinition: any,
  // ) {
  //   const connection =
  //     await this.dynamicConnectionService.getOrCreateConnection(uri);

  //   // Retrieve the existing model
  //   const existingModel = this.dynamicSchemaService.getModelForConnection(
  //     connection,
  //     schemaName,
  //   );
  //   console.log('1 existingModel.schema', existingModel.schema.paths);
  //   console.log('updatedSchemaDefinition', updatedSchemaDefinition);
  //   // Check if the model exists
  //   if (existingModel) {
  //     // Initialize the model if it hasn't been initialized already
  //     if (!existingModel.schema) {
  //       await existingModel.init();
  //       console.log('2 existingModel.schema', existingModel.schema.obj);
  //     }
  //     // Get the existing schema paths
  //     const existingSchemaPaths = Object.keys(existingModel.schema.paths);

  //     // Loop through each field in the updated schema definition
  //     for (const [fieldName, fieldDefinition] of Object.entries(
  //       updatedSchemaDefinition,
  //     )) {
  //       // Check if the field exists in the existing schema
  //       if (!existingSchemaPaths.includes(fieldName)) {
  //         // If the field doesn't exist, add it to the schema
  //         existingModel.schema.add({ [fieldName]: fieldDefinition });
  //       }
  //     }

  //     // Save the updated schema
  //     await existingModel.syncIndexes();
  //     console.log('Schema updated successfully.');

  //     // Optionally, return the updated model
  //     return existingModel;
  //   } else {
  //     throw new Error(`Schema '${schemaName}' does not exist.`);
  //   }
  // }

  async insertRecord(
    uri: string,
    schemaName: string,
    schemaDefinition: any,
    data: any,
  ) {
    const connection =
      await this.dynamicConnectionService.getOrCreateConnection(uri);
    const model = this.dynamicSchemaService.getModelForConnection(
      connection,
      schemaName,
      schemaDefinition,
    );
    const document = new model(data);
    return document.save();
  }
  async fetchRecords(uri: string, schemaName: string) {
    const connection =
      await this.dynamicConnectionService.getOrCreateConnection(uri);
    const model = this.dynamicSchemaService.getModelForConnection(
      connection,
      schemaName,
    );
    return await model.find();
  }
  async remove(uri: string, schemaName: string, id: any) {
    const connection =
      await this.dynamicConnectionService.getOrCreateConnection(uri);
    const model = this.dynamicSchemaService.getModelForConnection(
      connection,
      schemaName,
    );
    return await model.deleteOne({ _id: id });
  }
  async edit(uri: string, schemaName: string, data: any) {
    console.log('data', data);
    const connection =
      await this.dynamicConnectionService.getOrCreateConnection(uri);
    const model = this.dynamicSchemaService.getModelForConnection(
      connection,
      schemaName,
    );
    return await model.updateOne({ _id: data.id }, { name: data.name });
  }
  // Similarly, implement read, update, delete operations
}
