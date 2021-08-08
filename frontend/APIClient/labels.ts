import { request, GraphQLClient } from 'graphql-request'
import * as gql from 'gql-query-builder'

export const getLabels = async (token: string, owner: string, repo: string) => {
  const labels_limit = 100
  const query = gql.query({
        operation: 'repository',
        variables: {
          owner: {
            value: owner,
            required: true
          },
          name: {
            value: repo,
            required: true
          },
        },
        fields: [{
          operation: 'labels',
          variables: {
            first: {
              value: labels_limit
            }
          },
          fields: [
            {
              edges: [
                {
                  node: [
                    'name',
                    'color'
                  ]
                }
              ]
            }
          ]
        }]
      })

  const client = new GraphQLClient('https://api.github.com/graphql', {
    headers: {'Authorization': token} })

  return await client
    .request(query.query, query.variables)
    .then((data) => {
      const labels = data.repository.labels.edges.map((label) => ({
          label: {
            color: `#${label.node.color}`,
            name: label.node.name,
          },
          labelOpened: true,
        }))
      return labels
    })
}

