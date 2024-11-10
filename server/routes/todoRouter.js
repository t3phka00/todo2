import { Router } from "express"
import { getTasks, postTask, deleteTask } from '../controllers/TasksController';

const router = Router()

router.get('/', getTasks)

router.post('/create', postTask)

router.delete('/delete/:id', deleteTask)


export default router