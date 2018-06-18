import {
    GraphQLString as StringType,
    GraphQLNonNull as NonNull,
    GraphQLID as ID,
    GraphQLInputObjectType
  } from 'graphql';

const DataInputType = new GraphQLInputObjectType({
    name: 'DataInputType',
    fields: {
      id: { type: new NonNull(ID) },
      label: { type: StringType },
      val: { type: StringType },
    },
  });

  export default DataInputType; 