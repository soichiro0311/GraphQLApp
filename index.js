const { ApolloServer } = require(`apollo-server`)

const typeDefs = `
  type Photo {
      id: ID!
      url: String!
      name: String!
      description: String
      category: PhotoCategory!
  }

  enum PhotoCategory {
      SERFIE
      PORTRAIT
      ACTION
      LANDSCAPE
      GRAPHIC
  }

  input PostPhotoInput {
      name: String!
      category: PhotoCategory=PORTRAIT
      description: String
  }

  type Query {
    totalPhotos: Int!
    allPhotos: [Photo!]!
  }

  type Mutation {
      postPhoto(input: PostPhotoInput!): Photo!
  }
`

var photos = []

const resolvers = {
    Query: {
        totalPhotos: () => photos.length,
        allPhotos: () => photos
    },

    Mutation: {
        postPhoto(parent, args) {
            var input = args.input
            var photo = {
                id: photos.length,
                ...args.input
            }
            photos.push(photo)
            return photo
        }
    },

    Photo: {
        url: parent => `http://yoursite.com/img/${parent.id}.jpg`
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers
})

server.listen().then(({ url }) => console.log(`GraphQL Service runnning on ${url}`))