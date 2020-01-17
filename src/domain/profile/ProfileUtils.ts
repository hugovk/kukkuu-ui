import { ExecutionResult } from 'graphql';
import { get } from 'lodash';

import {
  profileQuery as ProfileQueryType,
  profileQuery_myProfile_children as ProfileChildrenType,
  profileQuery_myProfile_children_edges_node as ChildType,
} from '../api/generatedTypes/profileQuery';

/**
 * Convert submitChildrenAndGuardian mutation result into ProfileQuery.
 */
export const normalizeProfileDataFromMutation = (result: ExecutionResult) => {
  const guardian = get(result, 'data.submitChildrenAndGuardian.guardian');
  if (guardian) {
    const childrenData = get(
      result,
      'data.submitChildrenAndGuardian.guardian.children'
    );
    return Object.assign(guardian, {
      children: normalizeChildren(childrenData),
    });
  }
  return null;
};

export const normalizeProfileData = (data: ProfileQueryType) => {
  if (data?.myProfile?.children) {
    return Object.assign(data.myProfile, {
      children: normalizeChildren(data.myProfile.children),
    });
  }

  return null;
};

export const normalizeChildren = (data: ProfileChildrenType) => {
  if (!data?.edges?.length) {
    return [];
  }
  const nodes = data.edges.map(edge => (edge ? edge.node : edge));
  return nodes.filter((node): node is ChildType => Boolean(node));
};
