import { Request as Req, Response as Res, NextFunction as Next, Errback as Err } from 'express'

const handler = (err: Err, req: Req, res: Res, next: Next) => {
    console.error(err)
    res.status(500).send('Something broke!')
}

export default handler