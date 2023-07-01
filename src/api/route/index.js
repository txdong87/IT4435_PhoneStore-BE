
import { router as usersRouter } from './users.js';
import { router as utilRouter } from './util.js';
import {router as categoryRouter } from './category.js';
import {router as productRouter} from './product.js'
import {router as orderRouter} from './order.js'
function route(app) {

    app.use('/user', usersRouter);
    app.use('/category',categoryRouter);
    app.use('/product',productRouter)
    app.use('/order',orderRouter)
    app.use('/util', utilRouter);
}

export { route };
