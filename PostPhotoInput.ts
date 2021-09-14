import { PhotoCategory } from './Photo'

export default class PostPhotoInput {
    name: String = ''
    category: PhotoCategory = PhotoCategory.PORTRAIT
    description: String = ''
    githubUser: String = ''

    constructor(name: String, category: PhotoCategory, description: String, githubUser: String) {
        this.name = name
        this.category = category
        this.description = description
        this.githubUser = githubUser

    }
}