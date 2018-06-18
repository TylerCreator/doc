/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import {
  GraphQLSchema as Schema,
  GraphQLObjectType as ObjectType,
} from 'graphql';
import {templates,addTemplate, removeTemplate, updateTemplate} from './queries/template';
import {documents, addDocument, updateDocument, removeDocument} from './queries/document'


const schema = new Schema({
  query: new ObjectType({
    name: 'Query',
    fields: {
      templates,
      documents,
    },
  }),
  mutation: new ObjectType({
    name: 'Mutation',
    fields: {
      addTemplate,
      removeTemplate,
      updateTemplate,
      addDocument, 
      updateDocument, 
      removeDocument,
    },
  }),
});

export default schema;
