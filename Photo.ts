export default class Photo {
    id: String = ''
    name: String = ''
    description: String = ''
    category: String = ''
    githubUser: String = ''
    created: String = ''

    constructor(id: String, name: String, description: String, category: PhotoCategory, githubUser: String, created: String) {
        this.id = id
        this.name = name
        this.description = name
        this.category = category.toString()
        this.githubUser = githubUser
        this.created = created
    }
}

export enum PhotoCategory {
    SERFIE = 'SERFIE',
    PORTRAIT = 'PORTRAIT',
    ACTION = 'ACTION',
    LANDSCAPE = 'LANDSCAPE',
    GRAPHIC = 'GRAPHIC'
}