import { GraphQLString as StringType, GraphQLInputObjectType } from 'graphql';

const PageInputType = new GraphQLInputObjectType({
    name: 'PageInputType',
    fields:()=> ({
      url: { type: StringType },
    }),
  })

  export default PageInputType; 