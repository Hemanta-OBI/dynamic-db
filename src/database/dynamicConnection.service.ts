// src/dynamic-connection.service.ts
import { Injectable } from '@nestjs/common';
import { Connection, createConnection, ConnectOptions } from 'mongoose';

@Injectable()
export class DynamicConnectionService {
  private connectionCache = new Map<string, Connection>();

  async getOrCreateConnection(
    uri: string,
    options?: ConnectOptions,
  ): Promise<Connection> {
    if (!this.connectionCache.has(uri)) {
      const connection = await createConnection(uri, options);
      this.connectionCache.set(uri, connection);
      return connection;
    }
    return this.connectionCache.get(uri);
  }
}
