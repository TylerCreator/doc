import { GraphQLString as StringType, GraphQLList as List } from 'graphql';
import TemplateType from '../types/TemplateType';

import { TemplateModel } from '../models';

const templates = {
  type: new List(TemplateType),
  args: {
    ids: {
      description: 'ids of the templates',
      type: new List(StringType),
    },
  },
  resolve(obj, args) {
    if (args.ids) {
      return TemplateModel.find({ _id: args.ids });
    }
    return TemplateModel.find();
  },
};


export { templates };
