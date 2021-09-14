const { ApolloServer } = require(`apollo-server`)
import User from './User';
import Photo, { PhotoCategory } from './Photo';
import Tag from './Tag';
import { GraphQLScalarType } from './node_modules/graphql';
import PostPhotoInput from './PostPhotoInput';

const typeDefs = `
  scalar DateTime

  type Photo {
      id: ID!
      url: String!
      name: String!
      description: String
      category: PhotoCategory!
      postedBy: User!
      taggedUsers: [User!]!
      created: DateTime!
  }

  type User {
      githubLogin: ID!
      name: String
      avater: String
      postedPhotos: [Photo!]!
      inPhotos: [Photo!]!
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
    new Photo("0", "Cute Dog", "Cute dog picture.", PhotoCategory.GRAPHIC, "mHatterup", "3-28-1977"),
    new Photo("1", "Angry Cat", "Angry cat action movie.", PhotoCategory.ACTION, "JMMMM", "1-2-1985"),
    new Photo("2", "Big Elephant", "lake like big elephant.", PhotoCategory.LANDSCAPE, "JMMMM", "2018-04-15T19:09:57.308Z"),
]
var tags = [
    new Tag("1", "mHatterup"),
    new Tag("2", "JMMMM"),
    new Tag("2", "JMMMM"),
    new Tag("0", "mHatterup"),
]

const resolvers = {
    Query: {
        totalPhotos: () => photos.length,
        allPhotos: () => photos
    },

    Mutation: {
        postPhoto(parent: any, args: any) {
            const input: PostPhotoInput = args.input
            const now = new Date()
            var photo = new Photo(photos.length.toString(), input.name, input.description, input.category, input.githubUser, now.toISOString())
            photos.push(photo)
            return photo
        }
    },

    Photo: {
        url: (parent: any) => `http://yoursite.com/img/${parent.id}.jpg`,
        postedBy: (parent: any) => {

            return users.find(u => u.githubLogin === parent.githubUser)
        },
        taggedUsers: (parent: any) => {
            return tags.filter(tag => tag.photoID === parent.id).map(tag => tag.userID).map(userID => users.find(u => u.githubLogin === userID))
        }
    },

    User: {
        postedPhotos: (parent: any) => {
            return photos.filter(p => p.githubUser === parent.githubLogin)
        },
        inPhotos: (parent: any) => {
            return tags.filter(tag => tag.photoID === parent.id).map(tag => tag.photoID).map(photoID => photos.find(p => p.id === photoID))
        }
    },

    DateTime: new GraphQLScalarType({
        name: `DateTime`,
        description: `A Value date time value.`,
        parseValue: (value: any) => new Date(value),
        serialize: (value: any) => new Date(value).toISOString(),
        parseLiteral: (ast: any) => ast.value
    })
}

const server = new ApolloServer({
    typeDefs,
    resolvers
})

server.listen().then(({ url }: any) => console.log(`GraphQL Service runnning on ${url}`))