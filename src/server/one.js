const Koa = require('Koa')

const mysql = require('./connect')
const alipaySdk = require('./alipayUtil')
const AlipayFormData = require('alipay-sdk/lib/form').default;
const app = new Koa()
const router = require('koa-router')();
const bodyParser = require('koa-bodyparser')
const session = require('koa-session')


const cors = require('koa2-cors');

app.keys = ['some secret message'];
const CONFIG = {
    key: 'MyCookie',   //cookie key (default is koa:sess)
    maxAge: 86400000,  // cookie的过期时间 maxAge in ms (default is 1 days)
    overwrite: true,  //是否可以overwrite    (默认default true)
    httpOnly: true, //cookie是否只有服务器端可以访问 httpOnly or not (default true)
    signed: true,   //签名默认true
    rolling: false,  //在每次请求时强行设置cookie，这将重置cookie过期时间（默认：false）
    renew: false,  //(boolean) renew session when session is nearly expired,
    //store: new sessionStore(redis)
};
app.use(session(CONFIG, app));

app.use(
    cors({
        origin: ['http://localhost:8080'],
        maxAge: 50, //指定本次预检请求的有效期，单位为秒。
        credentials: true, //是否允许发送Cookie
        allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], //设置所允许的HTTP请求方法'
        allowHeaders: ['Content-Type', 'Authorization', 'Accept'], //设置服务器支持的所有头信息字段
        exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'] //设置获取其他自定义字段
    })
);

app.use(bodyParser());

const nodemailer = require('nodemailer')

const userEmail = '17660632279@163.com'
const transporter = nodemailer.createTransport({
    service: '163',
    secureConnection: true,
    auth: {
        user: userEmail,
        pass: 'TRTMNWGWOPCCCKRS'  //这个是开启`POP3/SMTP/IMAP`的授权码
    }
})

var email_code = ''
router.post('/sendcode', async ctx => {
    const email = ctx.request.body.email
    // 记得检测该 email 是否已注册
    email_code = Math.random().toString().slice(2, 6)
    ctx.session.emailcode = email_code //随机验证码

    const mailOptions = {
        from: userEmail,
        cc: userEmail,
        to: email,
        subject: '验证码',
        text: '说明内容',
        html: `<h2>【RANNI】</h2>亲爱的用户，您的验证码：<span>${email_code}</span>,<br>5分钟内有效。如非本人操作请忽略本邮件。`
    }
    try {
        await transporter.sendMail(mailOptions)
        ctx.body = {
            code: 0,
            message: '邮箱验证码发送成功！',
        }
    } catch (e) {
        ctx.body = {
            code: -1,
            message: '邮箱验证码发送失败！',
        }
    }

})

// 登录时判断验证码是否一致即可
router.post('/loginCode', async ctx => {
    const email = ctx.request.body.email
    const emailCode = ctx.request.body.code
    console.log(email_code);
    console.log(emailCode);
    if (emailCode != email_code) {
        ctx.response.body = 'No'
    } else {
        let data = await mysql.getUserByEmail(email)
        ctx.response.body = data[0]
    }
});
//修改密码的判断验证码
router.post('/changeCode', async ctx => {
    const email = ctx.request.body.email
    const emailCode = ctx.request.body.code
    console.log(email_code);
    console.log(emailCode);
    if (emailCode != email_code) {
        ctx.response.body = 'No'
    } else {
        ctx.response.body = 'Ok'
    }
});


router.post('/checkemail', async ctx => {
    let email = ctx.request.body.email
    let data = await mysql.selectEmail()
    let checkFlag = false
    console.log(email);
    for (let i = 0; i < data.length; i++) {
        if (email == data[i].email) {
            checkFlag = true
            break
        }
    }
    if (checkFlag) {
        ctx.response.body = 'Ok'
    } else {
        ctx.response.body = 'No'
    }


});
//仅测试使用，记得删除
router.post('/test/lightlog', async (ctx, next) => {
    let arr = []
    arr.push(ctx.request.body.phone)
    let data = await mysql.log(arr)

    ctx.response.body = data[0]
})
router.post('/checkUser', async (ctx, next) => {
    let arr = ctx.request.body.phone
    let data = await mysql.select()
    let flag = true
    for (let i = 0; i < data.length; i++) {
        if (arr == data[i].phone) {
            flag = false
            break
        }
    }
    if (flag) {
        ctx.response.body = 'Ok'
    } else {
        ctx.response.body = 'No'
    }

})
router.post('/getuser', async (ctx, next) => {
    let arr = []
    arr.push(ctx.request.body.phone)
    let data = await mysql.log(arr)

    ctx.response.body = data[0]
})
router.get('/getalluser', async (ctx, next) => {
    let data = await mysql.select()
    ctx.response.body = data
});
router.get('/getalltable', async (ctx, next) => {
    let data = await mysql.getAllTable()
    ctx.response.body = data
});
router.get('/getallrealorder', async (ctx, next) => {
    let data = await mysql.getAllRealOrder()
    ctx.response.body = data
});
router.get('/getOrderId', async (ctx, next) => {
    let data = await mysql.selectOrderId()
    let orderId = data[data.length - 1]
    ctx.response.body = orderId
});
router.get('/admin/select', async (ctx, next) => {
    let data = await mysql.selectFood()
    ctx.response.body = data
});
router.post('/admin/adduser', async (ctx, next) => {
    console.log(ctx.request.body.name)
    let arr = []
    arr.push(ctx.request.body.name)
    arr.push(ctx.request.body.password)
    arr.push(ctx.request.body.phonenumber)
    arr.push(ctx.request.body.email)
    arr.push(ctx.request.body.level)
    arr.push(ctx.request.body.img)

    await mysql.addStaff(arr)

    ctx.response.body = 'OK'
})
//修改餐桌状态
router.post('/ordertable', async (ctx, next) => {

    let arr = []
    arr.push(ctx.request.body.ischeck)
    arr.push(ctx.request.body.id)
    await mysql.orderTable(arr)
    ctx.response.body = 'OK'
})
router.post('/changeUser', async (ctx, next) => {
    let arr = []
    arr.push(ctx.request.body.userInfo)
    arr.push(ctx.request.body.userPhone)
    await mysql.changeUserName(arr)
    let data = await mysql.getUser(ctx.request.body.userPhone)
    ctx.response.body = data[0]
})
router.post('/changeUserPass', async (ctx, next) => {
    let arr = []
    arr.push(ctx.request.body.userInfo)
    arr.push(ctx.request.body.userPhone)
    await mysql.changeUserPass(arr)
    let data = await mysql.getUser(ctx.request.body.userPhone)
    ctx.response.body = data[0]
})
router.post('/changeUserEmail', async (ctx, next) => {
    let arr = []
    arr.push(ctx.request.body.userInfo)
    arr.push(ctx.request.body.userPhone)
    await mysql.changeUserEmail(arr)
    let data = await mysql.getUser(ctx.request.body.userPhone)
    ctx.response.body = data[0]
})
router.post('/changeUserAvatar', async (ctx, next) => {
    let arr = []
    arr.push(ctx.request.body.userInfo)
    arr.push(ctx.request.body.userPhone)
    await mysql.changeUserAvatar(arr)
    let data = await mysql.getUser(ctx.request.body.userPhone)
    ctx.response.body = data[0]
})
router.post('/getOrder', async (ctx, next) => {

    let arr = []
    arr.push(ctx.request.body.userPhone)
    let data = await mysql.getOrder(arr)

    ctx.response.body = data
})
//在订单页面获取食物相关信息
router.post('/getMoreInfo', async (ctx, next) => {
    let food = ctx.request.body.foodInfo

    let foodInfo = []
    for (let i = 0; i < food.length; i++) {
        let data = await mysql.getFood(food[i].foodName)
        foodInfo.push(data[0])
    }
    ctx.response.body = foodInfo
})
router.post('/getfoodcategory', async (ctx, next) => {
    console.log(ctx.request.body)
    let arr = []
    arr.push(ctx.request.body.category)
    let data = await mysql.getFoodByCategory(arr)
    ctx.response.body = data
})
router.post('/deluser', async (ctx, next) => {
    console.log(ctx.request.body);
    let arr = []
    arr.push(ctx.request.body.phonenumber)
    await mysql.delUser(arr)
    await mysql.delCart(arr)
    ctx.response.body = 'ok'
})
router.post('/delfood', async (ctx, next) => {
    console.log(ctx.request.body);
    let arr = []
    arr.push(ctx.request.body.name)
    await mysql.delFood(arr)
    ctx.response.body = 'ok'
})
router.post('/deluser', async (ctx, next) => {
    console.log(ctx.request.body);
    let arr = []
    arr.push(ctx.request.body.phonenumber)
    await mysql.delUser(arr)
    ctx.response.body = 'ok'
})
router.post('/updateuser', async (ctx, next) => {
    //console.log(ctx.request.body);
    let arr = []
    arr.push(ctx.request.body.name)
    arr.push(ctx.request.body.password)
    arr.push(ctx.request.body.email)
    arr.push(ctx.request.body.img)
    arr.push(ctx.request.body.phone)
    await mysql.updateUser(arr)
    ctx.response.body = 'ok'
})
router.post('/admin/updatefood', async (ctx, next) => {
    //console.log(ctx.request.body);
    let arr = []

    arr.push(ctx.request.body.price)
    arr.push(ctx.request.body.description)
    arr.push(ctx.request.body.reserve)
    arr.push(ctx.request.body.category)
    arr.push(ctx.request.body.img)
    arr.push(ctx.request.body.sales)

    arr.push(ctx.request.body.name)
    await mysql.updateFood(arr)
    ctx.response.body = 'ok'
})
router.post('/admin/add', async (ctx, next) => {
    console.log(ctx.request.body.name)
    let arr = []
    arr.push(ctx.request.body.name)
    arr.push(ctx.request.body.price)
    arr.push(ctx.request.body.description)
    arr.push(ctx.request.body.reserve)
    arr.push(ctx.request.body.category)
    arr.push(ctx.request.body.img)
    arr.push(0)

    await mysql.addFood(arr)

    ctx.response.body = 'OK'
})
router.get('/getimg', async (ctx, next) => {
    let data = await mysql.selectImg()
    ctx.response.body = data
});
router.post('/addimg', async (ctx, next) => {
    let arr = []
    arr.push(ctx.request.body.base64)
    await mysql.addImg(arr)
    ctx.response.body = 'OK'
})
router.post('/add', async (ctx, next) => {
    console.log(ctx.request.body.name)
    let arr = []
    arr.push(ctx.request.body.name)
    arr.push(ctx.request.body.password)
    arr.push(ctx.request.body.phonenumber)
    arr.push(ctx.request.body.email)

    arr.push(ctx.request.body.img)

    let arr2 = []
    arr2.push(ctx.request.body.phonenumber)
    arr2.push('')

    await mysql.addUser(arr)
    await mysql.createCart(arr2)

    ctx.response.body = 'OK'
})

router.post('/updateRealCart', async (ctx, next) => {
    let arr = []
    arr.push(ctx.request.body.foodQuantity)
    arr.push(ctx.request.body.userPhone)
    arr.push(ctx.request.body.foodName)

    await mysql.updateRealCart(arr)

    ctx.response.body = 'Ok'
})
router.post('/addRealCart', async (ctx, next) => {
    let arr2 = []
    arr2.push(ctx.request.body.userPhone)
    let data = await mysql.getRealCart(arr2)
    let flag = true
    for (let i = 0; i < data.length; i++) {
        if (data[i].foodName == ctx.request.body.foodName) {
            flag = false
            let nowQuantity = parseInt(data[i].foodQuantity) + 1
            let arr3 = []
            arr3.push(nowQuantity)
            arr3.push(ctx.request.body.userPhone)
            arr3.push(ctx.request.body.foodName)
            await mysql.updateRealCart(arr3)
            ctx.response.body = 'Nice'
            break
        }
    }
    if (flag) {
        let arr = []
        arr.push(ctx.request.body.userPhone)
        arr.push(ctx.request.body.foodName)
        arr.push(ctx.request.body.foodQuantity)
        arr.push(ctx.request.body.foodPrice)
        arr.push(ctx.request.body.foodCategory)
        arr.push(ctx.request.body.foodImg)
        await mysql.addRealCart(arr)
        ctx.response.body = 'Ok'
    }


})
router.post('/getRealCart', async (ctx, next) => {
    let arr = []
    arr.push(ctx.request.body.userPhone)
    let data = await mysql.getRealCart(arr)
    ctx.response.body = data
})
router.post('/delRealCart', async (ctx, next) => {
    let arr = []
    arr.push(ctx.request.body.userPhone)
    arr.push(ctx.request.body.foodName)
    await mysql.delRealCart(arr)
    ctx.response.body = 'Nice'
})
router.post('/getRealCartLength', async (ctx, next) => {
    let arr = []
    arr.push(ctx.request.body.userPhone)
    let data = await mysql.getRealCart(arr)
    ctx.response.body = data.length
})
router.post('/getRealOrder', async (ctx, next) => {
    let arr = []
    arr.push(ctx.request.body.orderId)
    let data = await mysql.selectRealOrder(arr)
    ctx.response.body = data
})
router.post('/getAllRealOrder', async (ctx, next) => {
    let arr = []
    arr.push(ctx.request.body.userPhone)
    let data = await mysql.selectRealOrderByUser(arr)
    ctx.response.body = data
})

router.post('/addRealOrder', async (ctx, next) => {
    let data = await mysql.selectRealOrderId()
    let orderId = data[data.length - 1].orderId + 1

    for (let i = 0; i < ctx.request.body.orderInfo.length; i++) {
        console.log(ctx.request.body);
        let arr = []
        arr.push(orderId)
        arr.push(ctx.request.body.userPhone)
        arr.push(ctx.request.body.orderInfo[i].foodName)
        arr.push(ctx.request.body.orderInfo[i].foodQuantity)
        arr.push(ctx.request.body.orderInfo[i].foodCategory)
        arr.push(ctx.request.body.orderInfo[i].foodValue)
        arr.push(ctx.request.body.orderDate)
        arr.push(ctx.request.body.orderTable)
        arr.push(ctx.request.body.isPay)

        await mysql.addRealOrder(arr)
    }
    ctx.response.body = orderId
})
router.post('/getFood', async (ctx, next) => {
    let arr = ctx.request.body.foodName
    let data = await mysql.getFood(arr)
    ctx.response.body = data[0]
})
router.post('/getOrderInfo', async (ctx, next) => {

    let arr = []
    arr.push(ctx.request.body.orderTable)
    arr.push("No")
    let data = await mysql.selectRealOrderByServer(arr)
    ctx.response.body = data
})
router.post('/delOrderFood', async (ctx, next) => {

    let arr = []
    arr.push(ctx.request.body.orderId)
    arr.push(ctx.request.body.orderFoodName)
    await mysql.delRealOrderFood(arr)

    ctx.response.body = 'Ok'
})
router.post('/updateOrderFood', async (ctx, next) => {


    for (let i = 0; i < ctx.request.body.orderInfo.length; i++) {
        let arr = []
        arr.push(ctx.request.body.orderInfo[i].orderFoodQuantity)
        arr.push(ctx.request.body.orderInfo[i].orderValue)
        arr.push(ctx.request.body.orderInfo[i].orderId)
        arr.push(ctx.request.body.orderInfo[i].orderFoodName)
        arr.push(ctx.request.body.orderInfo[i].orderTable)


        await mysql.updateOrderFoodQuantity(arr)
    }

    ctx.response.body = 'Ok'
})
router.post('/addOrderFood', async (ctx, next) => {

    for (let i = 0; i < ctx.request.body.orderFoodInfo.length; i++) {
        let arr = []
        arr.push(ctx.request.body.orderId)
        arr.push(ctx.request.body.userPhone)

        arr.push(ctx.request.body.orderFoodInfo[i].foodName)
        arr.push(ctx.request.body.orderFoodInfo[i].foodQuantity)
        arr.push(ctx.request.body.orderFoodInfo[i].foodCategory)
        arr.push(ctx.request.body.orderFoodInfo[i].foodValue)
        arr.push(ctx.request.body.orderDate)
        arr.push(ctx.request.body.orderTable)
        arr.push(ctx.request.body.isPay)

        await mysql.addRealOrder(arr)
    }

    ctx.response.body = 'Ok'
})


router.post('/log', async (ctx, next) => {

    let arr = []
    arr.push(ctx.request.body.phonenumber)
    let user = await mysql.log(arr)
    let logPass = ctx.request.body.password
    if (user != '') {
        if (logPass == user[0].password) {
            ctx.response.body = user[0]
        } else {
            ctx.response.body = 'No'
        }
    } else {
        ctx.response.body = 'No'
    }
})
router.post('/admin/log', async (ctx, next) => {

    let arr = []
    arr.push(ctx.request.body.phonenumber)
    let user = await mysql.logAdmin(arr)
    let logPass = ctx.request.body.password
    if (user != '') {
        if (logPass == user[0].password) {
            console.log('密码正确')
            ctx.response.body = user[0]
        } else {
            console.log('密码错误')
            ctx.response.body = 'No'
        }
    } else {
        ctx.response.body = 'No'
    }
})
router.post('/addOrder', async (ctx, next) => {
    console.log(ctx.request.body)
    let arr = []
    arr.push(ctx.request.body.id)
    arr.push(ctx.request.body.userPhone)
    arr.push(ctx.request.body.info)
    arr.push(ctx.request.body.sum)
    arr.push(ctx.request.body.date)
    arr.push(ctx.request.body.isPay)
    arr.push(ctx.request.body.tableId)

    await mysql.addOrder(arr)

    ctx.response.body = 'Yes'
})
router.post('/addOrderOk', async (ctx, next) => {
    
    let arr = []
    arr.push('yes')
    arr.push(ctx.request.body.id)
    await mysql.addOrderOk(arr)

    ctx.response.body = 'Yes'
})
router.post('/addRealOrderOk', async (ctx, next) => {
    
    let arr = []
    arr.push('yes')
    arr.push(ctx.request.body.orderId)
    await mysql.addRealOrderOk(arr)

    ctx.response.body = 'Yes'
})


router.post('/api/pcpay', async (ctx, next) => {
    let orderId = ctx.request.body.orderId
    let orderPrice = ctx.request.body.orderPrice
    const formData = new AlipayFormData();
    formData.setMethod('get');
    
    formData.addField('bizContent', {
        outTradeNo: orderId, 
        productCode: 'FAST_INSTANT_TRADE_PAY', 
        totalAmount: parseFloat(orderPrice), 
        subject: '商品', 
        body: '商品详情', 
    });
    formData.addField('returnUrl', `http://localhost:8080/payok`);

    const result = alipaySdk.exec(  
        'alipay.trade.page.pay', 
        {}, 
        { formData: formData },
    );
    result.then((resp) => {
        ctx.response.body =
        {
            "success": true,
            "message": "success",
            "code": 200,
            "timestamp": (new Date()).getTime(),
            "result": resp
        }

    })

});


app.use(router.routes())
app.use(router.allowedMethods());

app.listen(3000, () => {
    console.log('Serve is running on 3000')
})