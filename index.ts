import express, * as Express from 'express'
import { Request as Req, Response as Res, NextFunction as Next } from 'Express'
import morgan from 'morgan'

import { config } from './tools/config'
import { ResponseData } from './classes/response' 
import Data from './tools/data'
import routes from './routes'
import errorHandler from './tools/error'

declare global {
    namespace Express {
        interface Request {
            data: ResponseData[]
            sub_id: string
        }
    }
}

Data.then((data) => {
    const app = express()

    app.use(express.json())
    app.use(morgan('dev'))

    app.use((req: Req, res: Res, next: Next) => {
        req.data = data
        next()
    })

    app.use(errorHandler)

    app.use(routes)

    app.listen(config.port, () => {
        console.log(`Server running on ${config.port}.`)
    })
}).catch((err) => {
    console.error(err)
    process.exit(1)
})
