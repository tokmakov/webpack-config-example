class User {
    name: string = 'Аноним'

    hello() {
        console.log(`Привет, ${this.name}!`)
    }
}

export default User
