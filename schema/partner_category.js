import _ from 'lodash';
import gravity from '../lib/loaders/gravity';
import cached from './fields/cached';
import Partners from './partners';
import CategoryType from './input_fields/category_type';
import {
  GraphQLString,
  GraphQLObjectType,
  GraphQLNonNull,
} from 'graphql';

const PartnerCategoryType = new GraphQLObjectType({
  name: 'PartnerCategory',
  fields: () => ({
    cached,
    id: {
      type: GraphQLString,
    },
    name: {
      type: GraphQLString,
    },
    category_type: CategoryType,
    partners: {
      type: Partners.type,
      args: Partners.args,
      resolve: ({ id }, options) => gravity('partners', _.defaults(options, {
        partner_categories: [id],
      })),
    },
  }),
});

const PartnerCategory = {
  type: PartnerCategoryType,
  description: 'A PartnerCategory',
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The slug or ID of the PartnerCategory',
    },
  },
  resolve: (root, { id }) => gravity(`partner_category/${id}`),
};

export default PartnerCategory;
