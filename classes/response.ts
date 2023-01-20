import { SubscriptionData, subResult } from "./subscription"

export interface Response {
    date: string
    isoDate: string
    subscriptions: SubscriptionData[]
}

export interface Result {
    date: string
    MRR: number
    difference: string
    by_subscription: subResult[],
}

export class ResponseData {
    date: string
    isoDate: string
    subscriptions: SubscriptionData[]
    total: number

    constructor({ date, isoDate, subscriptions }: Response, rate: number) {
        this.date = date
        this.isoDate = isoDate
        this.subscriptions = subscriptions.map(subscription => new SubscriptionData(subscription, date, rate))
        this.total = this.calcTotal()
    }

    private calcTotal(): number {
        let inc: number = 0
        this.subscriptions.forEach((subscription: SubscriptionData) => {
            inc += subscription.result.converted_total
        })
        return Math.ceil(inc)
    }

    get result(): Result {
        const results: subResult[] = this.subscriptions.map(subscription => subscription.result)
        return {
            date: this.date,
            MRR: this.total,
            difference: "NaN",
            by_subscription: results,
        }
    }
}