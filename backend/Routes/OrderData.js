const express = require('express');
const router = express.Router();
const Order = require('../models/Orders');

router.post('/orderData', async (req, res) => {
    let fetched_data = req.body.order_data;
    fetched_data.unshift({ Order_date: req.body.order_date });

    console.log("Request email:", req.body.email);

    try {
        let eId = await Order.findOne({ 'email': req.body.email });

        if (eId === null) {
            await Order.create({
                email: req.body.email,
                order_data: fetched_data
            });
        } else {
            await Order.findOneAndUpdate(
                { email: req.body.email },
                { $push: { order_data: { $each: [fetched_data] } } }
            );
        }

        res.json({ success: true });
    } catch (error) {
        console.error("Error in /orderData:", error.message);
        res.status(500).json({ error: 'Server Error', details: error.message });
    }
});

//my order
router.post('/myorderData', async (req, res) => {
    try {
        let myData = await Order.findOne({ 'email': req.body.email })
        res.json({ orderData: myData })

    } catch (error) {
        res.send("Server Error", error.message)
    }
})
module.exports = router;



// const express = require('express')
// const router = express.Router()
// const Order = require('../models/Orders')

// router.post('/orderData', async (req, res) => {
//     let fetched_data = req.body.order_data
//     await fetched_data.splice(0,0,{Order_date:req.body.order_date})
//     console.log("1231242343242354",req.body.email)

//     //if email not exisitng in db then create: else: InsertMany()
//     let eId = await Order.findOne({ 'email': req.body.email })
//     console.log(eId)
//     if (eId === null) {
//         try {
//             console.log(fetched_data)
//             console.log("1231242343242354",req.body.email)
//             await Order.create({
//                 email: req.body.email,
//                 order_data:[fetched_data]
//             }).then(() => {
//                 res.json({ success: true })
//             })
//         } catch (error) {
//             console.log(error.message)
//             res.status(500).send("Server Error", error.message)

//         }
//     }

//     else {
//         try {
//             await Order.findOneAndUpdate({email: req.body.email},
//                 { $push : {order_data : fetched_data} }).then(() => {
//                     res.json({ success: true })
//                 })
//         } catch (error) {
//             console.log(error.message)
//             res.status(500).send("Server Error", error.message)
//         }
//     }
// })
// module.exports = router;

