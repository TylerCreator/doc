import {
  GraphQLObjectType as ObjectType,
  GraphQLString as StringType,
  GraphQLNonNull as NonNull,
  GraphQLInt as Int,
  GraphQLID as ID,
  GraphQLList,
} from 'graphql';
// import mongoose from 'mongoose';
import { documents } from '../queries/document';
// import TemplateType from './TemplateType'


const DocumentType = new ObjectType({
  name: 'DocumentType',
  fields: () => ({
    // eslint-disable-line no-underscore-dangle
    id: { type: new NonNull(ID), resolve: t => t._id },
    name: { type: new NonNull(StringType) },
    templateId: {type: StringType},
    rects: {
      type: new GraphQLList(new ObjectType({
        name: 'RectType',
        fields: {
          id: { type: new NonNull(ID) },
          value: { type: StringType },
        },
      })),
    },
    uri: { type: new NonNull(StringType) },
  }),
});

export default DocumentType;
