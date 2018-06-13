import {
  GraphQLObjectType as ObjectType,
  GraphQLString as StringType,
  GraphQLNonNull as NonNull,
  GraphQLInt as Int,
  GraphQLID as ID,
  GraphQLList,
} from 'graphql';

const TemplateType = new ObjectType({
  name: 'TemplateType',
  fields: {
    id: { type: new NonNull(ID), resolve: t => t._id },
    name: { type: new NonNull(StringType) },
    width: { type: new NonNull(StringType) },
    height: { type: new NonNull(StringType) },
    pages: {
      type: new GraphQLList(new ObjectType({
        name: 'PageType',
        fields: {
          url: { type: StringType },
        },
      })),
    },
    uri: { type: new NonNull(StringType) },
    data: {
      type: new GraphQLList(new ObjectType({
        name: 'DataType',
        fields: {
          id: { type: new NonNull(ID) },
          label: { type: StringType },
          val: { type: StringType },
        },
      })),
    },
    rects: {
      type: new GraphQLList(new ObjectType({
        name: 'RectsType',
        fields: {
          id: { type: new NonNull(ID) },
          page: { type: Int },
          style: { type: StringType },
        },
      })),
    },
  },
});

export default TemplateType;
