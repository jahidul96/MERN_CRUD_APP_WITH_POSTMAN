const router = require("express").Router();

// import module

const Todo = require("../models/todoPostSchema");

router.get("/", async (req, res, next) => {
  try {
    const todos = await Todo.find();

    const data = {
      status: "succes",
      totalTodo: todos.length,
      todos,
    };

    res.json(data);
  } catch (error) {
    next(error);
  }
});

router.post("/post", async (req, res, next) => {
  try {
    const todo = new Todo(req.body);
    todo
      .save()
      .then((data) => {
        res.status(201).send(data);
      })
      .catch((err) => {
        next(err);
      });
  } catch (error) {
    next(error);
  }
});

router.put("/update/:id", async (req, res, next) => {
  try {
    const value = await Todo.findByIdAndUpdate(
      { _id: req.params.id },
      req.body
    );

    res.status(201).json({
      status: "succes",
      message: "Youe todo updated!!!",
    });
  } catch (error) {
    next(error);
  }
});

router.delete("/delete/:id", async (req, res, next) => {
  try {
    await Todo.findByIdAndDelete(req.params.id);

    res.status(200).json({
      status: "succes",
      message: `${req.params.id} todo deleted!!!`,
    });
  } catch (error) {
    next(error);
  }
});

router.get("/search", async (req, res, next) => {
  const searchQuery = req.query.value;

  try {
    const data = await Todo.find({ todo: searchQuery });
    res.status(200).json({
      status: "succes",
      data,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
