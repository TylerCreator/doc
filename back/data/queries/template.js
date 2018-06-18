import { GraphQLString as StringType, GraphQLList as List, GraphQLObjectType as ObjectType,  GraphQLInputObjectType } from 'graphql';
import TemplateType from '../types/TemplateType';
import PageInputType from '../types/PageInputType';
import DataInputType from '../types/DataInputType';
import RectInputType from '../types/RectInputType';
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

const addTemplate = {
  type: TemplateType,
  args: {
    name: {
      description: 'name of the templates',
      type: StringType
    },
    width: {
      description: 'width of the templates',
      type: StringType
    },
    height: {
      description: 'height of the templates',
      type: StringType
    },
    uri: {
      description: 'uri to the templates',
      type: StringType
    },
    pages: {
      type: new List(PageInputType),
    },
    data: {
      type: new List(DataInputType),
    },
    rects: {
      type: new List(RectInputType),
    },
  },
  resolve(parent, args){
    
    return TemplateModel.create({
      name: args.name,
      width: args.width,
      height: args.height,
      uri: args.uri,
      pages: args.pages,
      data: args.data,
      rects: args.rects,
    });
  }
};

const removeTemplate = {
  type: TemplateType,
  args: {
    id: {
      description: 'id of the templates',
      type: StringType,
    },
  },
  resolve(parent, args) {
    return TemplateModel.deleteOne({
      _id: args.id,
    });
  },
};

const updateTemplate = {
  type: TemplateType,
  args: {
    id:{
      description: 'id of the templates',
      type: StringType
    },
    name: {
      description: 'name of the templates',
      type: StringType
    },
    width: {
      description: 'width of the templates',
      type: StringType
    },
    height: {
      description: 'height of the templates',
      type: StringType
    },
    uri: {
      description: 'uri to the templates',
      type: StringType
    },
    pages: {
      type: new List(PageInputType),
    },
    data: {
      type: new List(DataInputType),
    },
    rects: {
      type: new List(RectInputType),
    },
  },
  resolve(parent, args) {
    let template;
    TemplateModel.findById(args.id).then(_template => {
      template = _template;
      if (args.name) {
        template.name = args.name
      }
      if (args.width) {
        template.width = args.width
      }
      if (args.height) {
        template.height = args.height
      }
      if (args.uri) {
        template.uri = args.uri
      }
      if (args.pages) {
        template.pages = args.pages
      }
      if (args.data) {
        template.data = args.data
      }
      if (args.rects) {
        template.rects = args.rects
      }
      return template.save();
    }); 
  },
};

export {templates, addTemplate, removeTemplate, updateTemplate};