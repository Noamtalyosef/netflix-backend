import express from 'express'
import List from '../models/listSchema.js'
import Content from '../models/contentSchema.js'
import User from '../models/userSchema.js'
import expressAsyncHandler from 'express-async-handler'
import { isAuth } from '../utils.js'

const usersInfoRouter = express.Router();


usersInfoRouter.get('/test',(req,res)=>{
    res.send("in userinfo test")
})

usersInfoRouter.get("/", async (req,res)=>{
    try{
        console.log("in usersinfo get")
        const _userId = req.query._userId;
        console.log(_userId)
        const user = await User.findById(_userId);
        console.log(user)
        if(user)
        {
            const LikedItemsIds = await user.likedItems;
            console.log(LikedItemsIds)
            const LikedItems = await Content.find({_id:{$in: LikedItemsIds }})
            console.log(LikedItems)
            res.send(LikedItems)
        }
        else
        res.send("user dont exist");
    }
    catch(err)
    {
        console.log("in get error")
        res.send(err)
    }


})

usersInfoRouter.post('/', async (req,res)=>{
    try{

        
          console.log("in post")
            const _itemId = req.query._itemId;
          
            const _userId = req.body.userId;
          
           const user = await User.findById(_userId)
            if(user)
            {
                if(!user['likedItems'])
                user['likeditems'] = [_itemId]
                else
                user.likedItems.push(_itemId);

                await user.save();
                console.log("success");
                await res.send(`moovie :${_itemId} saved successfully`);
            }
          
            else
            console.log('user not found')
          
 
        

    }
    catch(err)
    {
        console.log("in usersinfo post err")
        console.log(err)
        res.send(err)
    }


})

export default usersInfoRouter;