import { gql } from 'apollo-boost';

const submitChildrenAndGuardianMutation = gql`
  mutation submitChildrenAndGuardian(
    $children: [ChildInput!]!
    $guardian: GuardianInput!
  ) {
    submitChildrenAndGuardian(
      input: { children: $children, guardian: $guardian }
    ) {
      guardian {
        id
        firstName
        lastName
        email
        phoneNumber
        language
        children {
          edges {
            node {
              id
              firstName
              lastName
              birthdate
              postalCode
              relationships {
                edges {
                  node {
                    type
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

export default submitChildrenAndGuardianMutation;
