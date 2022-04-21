const { Router} = require('express')
const { auth } = require('../middleware/auth')
const Flat = require('../models/flat.modal')

const router = Router()

router.post('/flat',auth ,async(req, res)=>{
    try {
        const flat = await Flat.create(req.body)
        return res
        .status(200)
        .send(flat)
    } catch (error) {
        return res
        .status(500)
        .send({
            message : error.message
        })
    }
})
router.get('/flat/:id',auth, async(req, res)=>{
    try {
        const flat = await Flat.findById(req.params.id).lean().exec()
        return res
        .status(200)
        .send(flat)
    } catch (error) {
        return res
        .status(500)
        .send({
            message : error.message
        })
    }
})

router.get('/flats',auth ,async (req, res)=>{
    try {
            const page = req.query.page || 1
            const limit = req.query.limit || 8
            let totolPages = 0
            let flats 
            if(req.query.q){
                if(req.query.q == 'sort')
                {

                    flats = await Flat.find().skip((page - 1) * limit).limit(limit).lean().exec()
                    const totalDocs = await Flat.find().countDocuments()
                    totolPages = (Math.ceil(totalDocs/limit))
                    flats = req.query.sort == 1 ? flats.sort((a,b)=>(a.no - b.no)) : flats.sort((a,b)=>(-a.no + b.no))
                }
                else if(req.query.q == 'filter')
                {
                    flats = await Flat.find({type : req.query.base}).skip((page - 1) * limit).limit(limit).lean().exec()
                    const totalDocs = await Flat.find({type : req.query.base}).countDocuments()
                    totolPages = (Math.ceil(totalDocs/limit))
                }
                else
                {
                    flats = await Flat.find({block : req.query.block}).skip((page - 1) * limit).limit(limit).lean().exec()
                    const totalDocs = await Flat.find({block : req.query.block}).countDocuments()
                    totolPages = (Math.ceil(totalDocs/limit))
                }
            }
            else
            {
                flats = await Flat.find().skip((page - 1) * limit).limit(limit).lean().exec()
                const totalDocs = await Flat.find().countDocuments()
                totolPages = (Math.ceil(totalDocs/limit))
            }
            let arr = []
            for(let i =1;i<=totolPages;i++)
                arr.push(i)
            return res
            .status(200)
            .send({ flats, totolPages : arr})
    } catch (error) {
        return res
        .status(500)
        .send({
            message : error.message
        })       
    }
})


module.exports = router
// sorting 
// http://localhost:7000/flats?q=sort&sort=-1
// http://localhost:7000/flats?q=filter&base=owner
// http://localhost:7000/flats?q=search&block=B