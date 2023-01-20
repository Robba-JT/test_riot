import { Request as Req, Response as Res, NextFunction as Next } from 'express'
import { ResponseData } from "../classes/response"
import { SubscriptionData, subDetail } from "../classes/subscription"

export function sub_id (req: Req, res: Res, next: Next, id: string) : void {
    const subs = req.data.map(response => response.subscriptions.map(sub => sub.id)).flat(2)
    if (subs.includes(id)) {
        req.sub_id = id
        next()
    } else {
        next(new Error('Invalid parameter'))
    }
}

export function by_sub (req: Req, res: Res) {
    const detail: subDetail[] = []
    req.data.forEach((response: ResponseData) => {
        response.subscriptions.filter((sub: SubscriptionData) => sub.id === req.sub_id).forEach((sub: SubscriptionData) => detail.push(sub.detail))
    })
    detail.forEach((sub: subDetail, index: number) => {
        if (index && detail[index - 1].total) {
            sub.difference = `${((sub.total - detail[index - 1].total) / detail[index - 1].total * 100).toFixed(2)}%`
        }
    })
    res.json({
        id: req.sub_id,
        detail,
    })
}