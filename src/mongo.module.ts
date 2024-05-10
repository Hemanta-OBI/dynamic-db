import * as mongoose from 'mongoose';

mongoose.set('debug', true);

const createNewConnectionMongo = async (tenant) => {
  return mongoose.createConnection(
    `mongodb+srv://limsLive:h3D6XFB8XXczLshf@cluster0.rxbiy14.mongodb.net/${tenant}?retryWrites=true&w=majority`,
  );
};

export class TenantModuleForMongo {
  createNewConnectionMongo(tenant) {
    return createNewConnectionMongo(tenant);
  }
}
