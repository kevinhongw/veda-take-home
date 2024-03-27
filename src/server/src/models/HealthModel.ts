import { DateType, Model } from './baseModel';

export type HealthType = {
  id: number;
  status: string;
};

export class HealthModel extends Model {
  static tableName = 'health';

  //   public static async create<Payload>(data: Payload): Promise<HealthType & DateType> {
  //     return super.insert<Payload, HealthType>({
  //       ...data,
  //     });
  //   }

  //   public static findByEmail(email: string): Promise<HealthType> {
  //     return this.findBy<
  //       {
  //         email: string;
  //       },
  //       HealthType
  //     >({ email });
  //   }
}
