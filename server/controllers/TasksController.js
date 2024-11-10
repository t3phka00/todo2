import { empty0rRows } from "../helpers/utils.js"
import { insertTask, selectAllTasks, removeTask } from "../models/Task.js";

const getTasks = async (req, res, next) => {
    try {
        const result = await selectAllTasks()
        return res.status(200).json(empty0rRows(result)); 
    } catch(error) {
        return next(error)
    }
}

const postTask = async (req, res, next) => {
    try {
        if (!req.body.description || req.body.description.length === 0){
            const error = new Error('invalid description for task')
            error.statusCode = 400
            return next(error)
        }
        const result = await insertTask(req.body.description)
        return res.status(200).json({id: result.rows[0].id})
    } catch (error) {
        return next(error)
    }
}

const deleteTask = async (req, res, next) => {
    try {
        if (!req.params.id || req.params.id.length === 0){
            const error = new Error('Invalid credentials')
            error.statusCode = 400
            return next(error)
        }
        const result = await removeTask(req.params.id)
        return res.status(200).json({id: req.params.id})
    } catch (error) {
        return next(error)
    }
}

export { getTasks, postTask, deleteTask };