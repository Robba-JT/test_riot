import { ItemData } from "./item"

type Status = 'active' | 'completed'
type Interval = 'monthly' | 'yearly'
type Currencies = 'usd' | 'eur'

export interface Subscription {
    id: string
    status: Status
    items: ItemData[]
    interval: Interval
    currency: Currencies
    percent_off: number
}

export interface subResult {
    subscription_id: string
    original_currency: Currencies
    original_total: number
    converted_currency: Currencies
    converted_total: number
}

export interface subDetail {
    date: string
    difference: string
    total: number
}

export class SubscriptionData {
    id: string
    status: Status
    items: ItemData[]
    interval: Interval
    currency: Currencies
    percent_off: number
    date: string

    static exchange_rate : number

    constructor({ id, status, items, interval, currency, percent_off }: Subscription, date: string, rate: number) {
        this.date = date
        this.id = id
        this.status = status
        this.items = items.map(item => new ItemData(item))
        this.interval = interval
        this.currency = currency
        this.percent_off = percent_off

        SubscriptionData.exchange_rate = rate
    }

    get result(): subResult {
        let tot = 0
        if (this.status === 'active') {
            this.items.forEach(item => {
                tot += item.total_by_item / (this.interval === 'yearly' ? 12 : 1)
            })
        }
        const original_total: number = tot * (100 - this.percent_off) / 10000
        const converted_total: number = original_total * (this.currency !== 'usd' ? SubscriptionData.exchange_rate : 1)
        return {
            subscription_id: this.id,
            original_currency: this.currency,
            original_total,
            converted_currency: 'usd',
            converted_total,
        }
    }

    get detail(): subDetail {
        const result: subResult = this.result
        return {
            date: this.date,
            difference: 'NaN',
            total: Math.ceil(result.converted_total),
        }
    }
}
