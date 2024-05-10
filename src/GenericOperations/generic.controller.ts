// src/sample.controller.ts
import { Controller, Post, Body, Delete, Patch, Get } from '@nestjs/common';
import { GenericService } from './generic.service';

function getMongoUrl(tenant: string) {
  return `mongodb+srv://mongodb.net/${tenant}?retryWrites=true&w=majority`;
}
@Controller('dynamicSchema')
export class GenericController {
  constructor(private readonly genericService: GenericService) {}

  @Post('create-schema')
  async createSchema(@Body() createDto: any) {
    const { schemaName, schemaDefinition, buId } = createDto;
    return await this.genericService.createSchema(
      getMongoUrl(buId),
      schemaName,
      schemaDefinition,
    );
  }
  // @Post('update-schema')
  // async updateSchema(@Body() createDto: any) {
  //   const { schemaName, schemaDefinition, buId } = createDto;
  //   return await this.genericService.updateSchema(
  //     getMongoUrl(buId),
  //     schemaName,
  //     schemaDefinition,
  //   );
  // }
  @Post()
  async createItem(@Body() createDto: any) {
    const { schemaName, schemaDefinition, data, buId } = createDto;
    return await this.genericService.insertRecord(
      getMongoUrl(buId),
      schemaName,
      schemaDefinition,
      data,
    );
  }
  @Get()
  async getRecords(@Body() createDto: any) {
    const { schemaName, buId } = createDto;
    return await this.genericService.fetchRecords(
      getMongoUrl(buId),
      schemaName,
    );
  }
  @Delete()
  async deleteItem(@Body() createDto: any) {
    const { schemaName, id, buId } = createDto;
    return await this.genericService.remove(getMongoUrl(buId), schemaName, id);
  }

  @Patch()
  async editItem(@Body() createDto: any) {
    const { schemaName, data, buId } = createDto;
    return await this.genericService.edit(getMongoUrl(buId), schemaName, data);
  }
}
