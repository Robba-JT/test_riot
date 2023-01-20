import { config } from './../tools/config'

import axios from 'axios'

async function getRate(date: Date): Promise<number> {
    const res = await axios.get(config.rate_api, {
        headers: {
            Authorization: `ApiKey ${config.rate_key}`,
        },
        params: {
            date: date.toISOString().split('T')[0],
        }
    })
    return res.data.quote
}

export default getRate