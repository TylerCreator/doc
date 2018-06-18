import { GraphQLString as StringType, GraphQLList as List, GraphQLObjectType as ObjectType } from 'graphql';
import DocumentType from '../types/DocumentType';
import RectInputType from '../types/RectInputType';

import { DocumentModel } from '../models';

const documents = {
    type: new List(DocumentType),
    args: {
        id: {
            description: 'id of the templates',
            type: new List(StringType),
        },
    },
    resolve(obj, args) {
        if (args.id) {
            return DocumentModel.find({ _id: args.id });
        }
        return DocumentModel.find();
    },
};

const addDocument ={
    type: DocumentType,
    args: {
        name: {
            description: 'name of the document',
            type: StringType
        },
        templateId: {
            description: 'id of document template',
            type: StringType
        },
        rects: {
            type: new List(RectInputType),
        },
        uri: {
            description: 'uri to the templates',
            type: StringType
        },
    },
    resolve(parent, args){
        
        return DocumentModel.create({
            name: args.name,
            templateId: args.templateId,
            uri: args.uri,
            rects: args.rects,
        });
    }
};

const removeDocument = {
    type: DocumentType,
    args: {
        id: {
            description: 'id of the documents',
            type: StringType,
        },
    },
    resolve(parent, args) {
        return DocumentModel.deleteOne({
            _id: args.id,
        });
    },
};

const updateDocument = {
    type: DocumentType,
    args: {
        id: {
            description: 'id of the document',
            type: StringType
        },
        name: {
            description: 'name of the document',
            type: StringType
        },
        templateId: {
            description: 'id of template document ',
            type: StringType
        },
        rects: {
            type: new List(RectInputType),
        },
        uri: {
            description: 'uri to the document',
            type: StringType
        },
    },
    resolve(parent, args){
        let document;
        DocumentModel.findById(args.id).then(_document => {
            document = _document;
            if (args.name) {
                document.name = args.name
            }
            if (args.templateId) {
                document.templateId = args.templateId
            }
            if (args.uri) {
                document.uri = args.uri
            }
            if (args.rects) {
                document.rects = args.rects
            }
            return document.save();
        }); 
    },
};

export {documents, addDocument, updateDocument, removeDocument};
