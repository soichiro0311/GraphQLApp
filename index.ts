const { ApolloServer } = require(`apollo-server`)
import User from './User';
import Photo, { PhotoCategory } from './Photo';

const typeDefs = `
  type Photo {
      id: ID!
      url: String!
      name: String!
      description: String
      category: PhotoCategory!
      githubUser: String
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
      githubUser: String
  }

  type Query {
    totalPhotos: Int!
    allPhotos: [Photo!]!
  }

  type Mutation {
      postPhoto(input: PostPhotoInput!): Photo!
  }
`
var users = [
    new User("mHatterup", "Mike"),
    new User("JMMMM", "John"),
    new User("DaveDaveDive", "Dave"),

]
var photos = [
    new Photo("0", "Cute Dog", "Cute dog picture.", PhotoCategory.GRAPHIC, "mHatterup"),
    new Photo("1", "Angry Cat", "Angry cat action movie.", PhotoCategory.ACTION, "JMMMM"),
    new Photo("2", "Big Elephant", "lake like big elephant.", PhotoCategory.LANDSCAPE, "JMMMM"),
]

const resolvers = {
    Query: {
        totalPhotos: () => photos.length,
        allPhotos: () => photos
    },

    Mutation: {
        postPhoto(parent: any, args: any) {
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
        url: (parent: any) => `http://yoursite.com/img/${parent.id}.jpg`
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers
})

server.listen().then(({ url }: any) => console.log(`GraphQL Service runnning on ${url}`))