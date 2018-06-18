import {
    GraphQLString as StringType,
    GraphQLNonNull as NonNull,
    GraphQLID as ID,
    GraphQLInt as Int,
    GraphQLInputObjectType
  } from 'graphql';

const RectInputType = new GraphQLInputObjectType({
  name: 'RectInputType',
  fields: {
    id: { type: new NonNull(ID) },
    page: { type: Int },
    style: { type: StringType },
    value: { type: StringType },
  },
});

export default RectInputType; 