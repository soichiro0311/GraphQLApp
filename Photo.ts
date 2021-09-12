export default class Photo {
    id: String = ''
    name: String = ''
    description: String = ''
    category: String = ''
    githubUser: String = ''

    constructor(id: String, name: String, description: String, category: PhotoCategory, githubUser: String) {
        this.id = id
        this.name = name
        this.description = name
        this.category = category.toString()
        this.githubUser = githubUser
    }
}

export enum PhotoCategory {
    SERFIE = 'SERFIE',
    PORTRAIT = 'PORTRAIT',
    ACTION = 'ACTION',
    LANDSCAPE = 'LANDSCAPE',
    GRAPHIC = 'GRAPHIC'


}