import { Router, Request as Req, Response as Res } from 'express'

import total from './total'
import { sub_id, by_sub } from './by_sub'

const router: Router = Router()


router.get('/',(req: Req, res: Res) => res.send('Hello World!'))
router.get('/healthz',(req: Req, res: Res) => res.send('Ok, I\'m healthy'))

router.get('/total',total)

router.param('sub_id', sub_id)
router.get('/sub/:sub_id', by_sub)

export default router