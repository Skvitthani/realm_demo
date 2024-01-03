import {createRealmContext} from '@realm/react';
import Realm from 'realm';
export class userDetails extends Realm.Object {
  _id!: Realm.BSON.ObjectId;
  name!: string;
  age!: number;
  city!: string;

  static schema = {
    name: 'Users',
    primaryKey: '_id',
    properties: {
      _id: 'objectId',
      name: 'string',
      age: 'int',
      city: 'string',
    },
  };
}

export const RealmContext = createRealmContext({
  schema: [userDetails],
});
