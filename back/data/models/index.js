/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import mongoose from 'mongoose';
import TemplateSchema from './TemplateSchema';
import DocumentSchema from './DocumentSchema';
/*
initialize models
*/

const TemplateModel = mongoose.model('Template', TemplateSchema);

const DocumentModel = mongoose.model('Document', DocumentSchema);
export {
  TemplateModel,
  DocumentModel,
};
