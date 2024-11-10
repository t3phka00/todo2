import { pool } from '../helpers/db.js'
import { Router } from "express"
// import { empty0rRows } from '../helpers/utils.js'
import { auth } from '../helpers/auth.js'
import { deleteTask, getTasks, postTask } from '../controllers/TasksController.js';

const router = Router()

router.get('/', getTasks)

router.post('/create', postTask)

router.delete('/delete/:id', deleteTask)

export default router;