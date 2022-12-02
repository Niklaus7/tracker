/* eslint-disable no-console */
const express = require('express')
const supabase = require('./connectors/supabaseConnector')

const app = express()
const PORT = 3000
app.use(express.json())

app.get('/', (req, res) => {
    res.send('Hello world, I am on !')
})

app.post('/api/trackHistory', async (req, res) => {
    let { item, createdAt } = req.body

    const { data, error } = await supabase.from('TrackHistory').insert([
        {
            item: item,
            created_at:
                createdAt === null ? new Date().toISOString() : createdAt,
        },
    ])

    if (error) {
        res.status(400).json(error)
    }

    res.status(200).json(data)
})

app.post('/api/weight', async (req, res) => {
    let { weight, createdAt } = req.body

    const { data, error } = await supabase.from('WeightHistory').insert([
        {
            weight: weight,
            created_at:
                createdAt === null ? new Date().toISOString() : createdAt,
        },
    ])
    if (error) {
        res.status(400).json(error)
    }

    res.status(200).json(data)
})

app.get('/api/trackItem', async (req, res) => {
    try {
        let { data, error } = await supabase.from('TrackItem').select('*')

        if (error) {
            res.status(400).json(error)
        }

        res.status(200).json(data)
    } catch (ex) {
        console.log(ex)
    }
})

app.listen(PORT, () => {
    console.log('The tracker application is ready')
})
