const Task=require("../models/task")
const asyncWrapper = require("../middleware/async");


const getAllTasks= asyncWrapper( async (req, res) => {
        const tasks=await Task.find({})
        res.status(200).json({tasks})
})


const createTask= asyncWrapper(async (req, res) => {
     const task = await Task.create(req.body)
     res.status(201).json({task});
   
    }
)


const getTask = asyncWrapper (async (req, res) => {
        const {id}=req.params
       const task= await Task.findOne({_id: id}) 
        res.status(200).json({task})
        if(!task) {
            return res.status(404).json({msg: `No rask with id: ${id}`})
        } 
}
)


const deleteTask = asyncWrapper(async (req, res) => {
       const {id}=req.params
       let task = await Task.findOneAndDelete({_id: id})
       res.status(200).json({task})
       if(!task) {
        return res.status(404).json({msg: `The task with id: ${id} dies not exist`})
       }
    })

    const updateTask = asyncWrapper(async (req, res) => {
           const {id}=req.params;
            const task = await Task.findOneAndUpdate({_id: id}, req.body, {
                new: true, runValidators: true
        })
           res.status(200).json({_id: id, data: req.body})
           if(!task) {
            return res.status(404).json({msg: `The task with id: ${id} dies not exist`})
           }
        } 
        
    )


module.exports = {
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask
}