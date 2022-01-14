import express from "express";
import { Products, Users, } from "../../utils/db/models/relation.js";
const usersRouter = express.Router();

// 1 
usersRouter.get("/", async (req, res, next) => {
    try {
      const data = await Users.findAll();
      res.send(data);
    } catch (error) {
      console.log(error);
      next(error);
    }
  });

  // 2
  usersRouter.post("/", async (req, res, next) => {
      try {
        const users = await Users.create(req.body)
        res.status(201).send(users)
    } catch (e) {
      console.log(e);
      next(e);
    }
  });


  usersRouter.get("/:id", async (req, res, next) => {
    try {
        const user = await Users.findByPk(req.params.id);
        if (user) {
          res.send(user);
        } else {
          res.status(404).send("Not found");
        }
      } catch (e) {
        console.log(e);
        next(e);
      }
    })
   usersRouter.put("/:id", async (req, res, next) => {
    try {
        const updateUser = await Users.update(req.body, {
            where: {
                id: req.params.id,
            }
          });
    
          res.send(updateUser[1][0]);
        } catch (e) {
          console.log(e);
          next(e);
        }
      })
    usersRouter.delete("/:id", async (req, res, next) => {
    try {
    const result = await Users.destroy({
        where: {
          id: req.params.id,
        },
      });
        res.send(result);      
    } catch (e) {
      console.log(e);
      next(e);
    }
  });


export default usersRouter;