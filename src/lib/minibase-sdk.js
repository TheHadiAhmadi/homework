import {v4 as uuid} from 'uuid'
import fetch from 'node-fetch'

class MinibaseOffline {
    data = {}

    constructor(appName, apiKey, options) {
        this.appName = appName
        this.apiKet = apiKey

        this.data.users = []
        this.data.tables = options.data ?? []
    }

    async get(tableName) {
        return this.data.tables[tableName] ?? []
    }

    async insert(tableName, data) {
        this.data.tables[tableName] ??= []
        if(Array.isArray(data)) {
            this.data.tables[tableName] = [...this.data.tables[tableName], ...data.map(d => ({id: uuid(), ...d}))]
        } else {
            data.id = uuid()
            this.data.tables[tableName].push(data)
        }

        return data;
    }

    async update(tableName, id, data) {
        console.log('update', {tableName, id, data})
        // this.data.tables[tableName] ??= []
        // if(Array.isArray(data)) {
        //     this.data.tables[tableName] = [...this.data.tables[tableName], ...data.map(d => ({id: uuid(), ...d}))]
        // } else {
        //     data.id = uuid()
        //     this.data.tables[tableName].push(data)
        // }

        return data;
    }

    async login(data) {
        if(!data.username || !data.password) {
            return {
                status: 400,
                message: "username and password are required"
            }
        }
        console.log(this.data.users)
        const user = this.data.users.find(user => {
            return user.username === data.username && user.password === data.password
        })
        if(user) {
            return {
                access_token: user.id,
                user: user
            }
        }
        else {
            return {
                status: 404,
                message: 'account not found or username and password doesn\'t match' 
            }
        }
    }

    async signup(data) {
        if(!data.username || !data.password) {
            return {
                status: 400,
                message: 'username and password are required'
            }
        }
        if(this.data.users.find(u => u.username === data.username)) {
            return {
                status: 409,
                message: "username is not avaialble"
            }
        }

        data.id = uuid()
        const {username, password, ...rest} = data
        this.data.users.push({username, password, data: rest});
        console.log(this.data)

        return {
            access_token: data.id,
            user: data
        }
    }
    async getUser(token) {
        return this.data.users.find(user => user.id === token)

    }
}

class MinibaseOnline {
    appName = ''
    apiKey = ''
    baseUrl = ''
    
    constructor(appName, apiKey, options) {
        this.appName = appName
        this.apiKey = apiKey
        this.baseUrl = options?.baseUrl ?? 'https://minibase.deno.dev'
    }

    _url(tableName, data) {
        return `${this.baseUrl}/${this.appName}/${tableName}${data? `/${data}` : ''}.json`
    }

    async _api(method, url, data) {

        console.log(method, url, this.apiKey, data)
        let opts = {
            method: method,
            headers: {
                apiKey: this.apiKey,
                'content-type': 'application/json' 
            },
        }
        if(data) opts.body = JSON.stringify(data)
        return await fetch(url, opts).then(res => res.json())
    }

    async get(tableName) {
        return (await this._api('GET', this._url(tableName))).values
    }
    async insert(tableName, data) {
        return (await this._api('POST', this._url(tableName), data)).data
    }
    async remove(tableName, id) {
        return (await this._api('DELETE', this._url(tableName, id))).data
    }

    async update(tableName, id, data) {
        console.log("update", {tableName, id, data})
        return (await this._api('PUT', this._url(tableName, id), data)).data
    }

    async login(data) {
        const result = await this._api('POST', this._url('login'), data);
 
        return result;
    }
    
    async signup(data) {
        const result = await this._api('POST', this._url('signup'),data)
        return result
    }

    async logout() {
        console.log('logout')
    }

    async getUser() {
        console.log("TODO: getUser by token")
        return null
    }
}

export default class Minibase {
    appName = ''
    apiKey = ''
    baseUrl = ''
    mode = ''
    instance = null

    constructor(appName, apiKey, options) {
        this.appName = appName
        this.apiKey = apiKey
        this.mode = options?.mode ?? 'offline'

        console.log(`using ${this.mode} Minibase`)
        if(this.mode === 'offline') {
            const data = options?.data ?? {}
            this.instance = new MinibaseOffline(appName, apiKey, {data})
        } else {
            const baseUrl = options?.baseUrl ?? 'https://minibase.deno.dev'
            this.instance = new MinibaseOnline(appName, apiKey, {baseUrl})
        }
    }
    get(tableName) {
        return this.instance.get(tableName)
    }

    insert(tableName, data) {
        
        return this.instance.insert(tableName, data)
    }

    remove(tableName, id) {
        return this.instance.remove(tableName, id)
    }
      
    update(tableName, id, data) {
        return this.instance.update(tableName, id, data)
    }

    login(data) {
        return this.instance.login(data)
    }

    signup(data) {
        return this.instance.signup(data)
    }

    getUser(token) {
        return this.instance.getUser(token);
    }
}