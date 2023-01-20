import { config } from './../tools/config'
import { ResponseData } from '../classes/response'
import getRate from './../tools/rate'


import axios from 'axios'

class Data {
    private dates : string[] = []
    responses: ResponseData[] = []

    constructor() {
        this.dates = []
        this.responses = []
    }

    private async getData() : Promise<any> {
        const response = await axios.get(config.sub_api)
        return response.data[0]
    }

    private formatData(data : any, rate: number) : ResponseData {
        return new ResponseData(data, rate)
    }

    async init() : Promise<ResponseData[]> {
        let rate: number
        let date: Date
        let sub = await this.getData()
        while (!this.dates.includes(sub.date)) {
            this.dates.push(sub.date)
            date = new Date(`02 ${sub.date}`)
            sub.isoDate = date.toISOString()
            rate = await getRate(date)
            this.responses.push(this.formatData(sub, rate))
            sub = await this.getData()
        }
        this.responses = this.responses.sort((a, b) => {
            if (a.isoDate < b.isoDate) return -1
            if (a.isoDate > b.isoDate) return 1
            return 0
        })
        return this.responses
    }
}

export default new Data().init()