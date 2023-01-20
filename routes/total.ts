import { Request as Req, Response as Res } from 'express'
import { ResponseData, Result } from "../classes/response"

export default function total (req: Req, res: Res) {
    const data = req.data
    const results: Result[] = []
    data.forEach((response: ResponseData, index : number) => {
        const result = response.result
        if (index) {
            result.difference = `${((result.MRR - results[index - 1].MRR) / results[index - 1].MRR * 100).toFixed(2)}%`
        }
        results.push(result)
    })
    res.json(results)
}