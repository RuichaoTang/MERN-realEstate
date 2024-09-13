import { errorHandler } from "../utils/error.js"
import bcryptjs from 'bcryptjs'
import User from "../models/user.model.js"
import Listing from "../models/listing.model.js"
import mongoose from "mongoose"

export const test = (req,res)=> {
    res.json(
        {
            message:"Api route is working!"
        })}

export const updateUser = async (req, res, next) => {

    if(req.user.id !== req.params.id) return next(errorHandler(401, 'You can only update your own account!'))
    try {
        if(req.body.password){
            req.body.password = bcryptjs.hashSync(req.body.password, 10)
        }
        const updateUser = await User.findByIdAndUpdate(req.params.id, {$set:{
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            avatar: req.body.avatar,
        }},{new: true})
        
        const {password, ...rest} = updateUser._doc

        res.status(200).json(rest)
    } catch (error) {
        next(error)
    }
}

export const deleteUser = async (req, res, next)=>{
    if(req.user.id !== req.params.id) return next(errorHandler(401, 'You can only delete your own account!'))
    try {
        await User.findByIdAndDelete(req.params.id)
        res.clearCookie('access_token').status(200).json('User has been deleted.')
    } catch (error) {
        next(error)
    }
    
}

export const getUserListings = async (req, res, next) =>{
    if(req.user.id !== req.params.id) return next(errorHandler(401, 'You can only delete your own account!'))
    try {  
        console.log('here')

        const listings = await Listing.find({userRef: req.params.id})
        res.status(200).json(listings)
    } catch (error) {
        next(error)
    }
}

export const getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id)
        if(!user) return next(errorHandler(404, 'User not found.'))
        const { password: pass, ...rest } = user._doc
        res.status(200).json(rest)
    } catch (error) {
        next(error)
    }
}

// 收藏或取消收藏 Listing
// 收藏或取消收藏 Listing
export const toggleFavorite = async (req, res, next) => {
    try {
        const userId = req.body.userRef; // 获取当前用户ID
        const listingId = req.body.listingId; // 获取前端传来的 listing ID

        // 查找用户
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // 可选：检查 Listing 是否存在
        const listingExists = await Listing.findById(listingId);
        if (!listingExists) {
            return res.status(404).json({ message: 'Listing not found' });
        }

        // 检查 Listing 是否已经在收藏列表中
        const isFavorited = user.favorites.includes(listingId);

        if (isFavorited) {
            // 如果已经收藏，则移除
            user.favorites = user.favorites.filter(id => id.toString() !== listingId);
            await user.save();
            return res.status(200).json({ message: 'Listing removed from favorites' });
        } else {
            // 如果未收藏，则添加
            user.favorites.push(listingId);
            await user.save();
            return res.status(200).json({ message: 'Listing added to favorites' });
        }
    } catch (error) {
        next(error);
    }
}

export const getFavorites = async (req, res, next) => {
  try {
    const userId = req.params.id; // 从请求参数中获取用户ID

    if (!mongoose.isValidObjectId(userId)) {
      return res.status(400).json({ message: 'Invalid user ID' });
    }

    const user = await User.findById(userId).populate('favorites');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user.favorites);
  } catch (error) {
    next(error);
  }
};