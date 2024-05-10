import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { DynamicConnectionService } from './database/dynamicConnection.service';
import { DynamicSchemaService } from './database/dynamicSchema.service';
import { GenericController } from './GenericOperations/generic.controller';
import { GenericService } from './GenericOperations/generic.service';

@Module({
  imports: [],
  controllers: [AppController, GenericController],
  providers: [
    AppService,
    GenericService,
    DynamicConnectionService,
    DynamicSchemaService,
  ],
})
export class AppModule {}
