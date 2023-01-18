import express from 'express'

const app = express()
const PORT = 8080

app.use(express.json())
app.get('/healthz',(req,res) => {
    res.status(200).json({
        'message': 'Ok, I\'m healthy'
    })
})
app.listen(PORT, () => {
    console.log(
        `Server running on ${PORT}.`
    )
})