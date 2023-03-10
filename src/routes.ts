import { Router } from 'express';
import multer from 'multer';

import { CreateUserController } from './controllers/user/CreateUserController';
import { AuthUserController } from './controllers/user/AuthUserController';
import { DetailUserController } from './controllers/user/DetailUserController';
import { CreateCategoryController } from './controllers/category/CreateCategoryController'
import { ListCategoryController } from './controllers/category/ListCategoryController';
import { CreateProductController } from './controllers/product/CreateProductController';
import { ListbyCategoryController } from './controllers/product/ListbyCategoryController';
import { CreateOrderController } from './controllers/order/CreateOrderController';
import { RemoveOrderController } from './controllers/order/RemoveOrderController';
import { AddItemController } from './controllers/order/AddItemController';
import { RemoveItemController } from './controllers/order/RemoveItemController';
import { SendOrderController } from './controllers/order/SendOrderController';
import { ListOrdersController } from './controllers/order/ListOrdersController';
import { DetailOrderController } from './controllers/order/DetailOrderController';
import { FinishOrderController } from './controllers/order/FinishOrderController';

import { isAutheticated } from './middlewares/isAutheticated';

import uploadConfig from './config/multer'

const router = Router();

const upload = multer(uploadConfig.upload('./tmp'));

const createUserController = new CreateUserController();
const authUserController = new AuthUserController();
const detailUserController = new DetailUserController();
const createCategoryController = new CreateCategoryController();
const listCategoryController = new ListCategoryController();
const createProductController = new CreateProductController();
const listbyCategoryController = new ListbyCategoryController();
const createOrderController = new CreateOrderController();
const removeOrderController = new RemoveOrderController();
const addItemController = new AddItemController();
const removeItemController = new RemoveItemController();
const sendOrderController = new SendOrderController();
const listOrdersController = new ListOrdersController();
const detailOrderController = new DetailOrderController();
const finishOrderController = new FinishOrderController();

// -- ROTAS USER --
router.post('/users', createUserController.handle);

router.post('/session', authUserController.handle);

router.get('/me', isAutheticated, detailUserController.handle);

// -- ROTAS  CATEGORY
router.post('/category', isAutheticated, createCategoryController.handle);

router.get('/category', isAutheticated, listCategoryController.handle);

// -- ROTAS PRODUCT
router.post('/product', isAutheticated, upload.single('file'), createProductController.handle);

router.get('/category/product', isAutheticated, listbyCategoryController.handle);

//-- ROTAS ORDER
router.post('/order', isAutheticated, createOrderController.handle);

router.delete('/order', isAutheticated, removeOrderController.handle);

router.post('/order/add', isAutheticated, addItemController.handle);

router.delete('/order/remove', isAutheticated, removeItemController.handle);

router.put('/order/send', isAutheticated, sendOrderController.handle);

router.get('/orders', isAutheticated, listOrdersController.handle);

router.get('/order/detail', isAutheticated, detailOrderController.handle);

router.put('/order/finish', isAutheticated, finishOrderController.handle);

export { router };