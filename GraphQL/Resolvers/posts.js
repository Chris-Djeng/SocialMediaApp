const Post = require('../../Models/Post');
const checkAuth = require('../../Utilities/check-auth');
const{AuthenticationError,UserInputError} = require('apollo-server')
module.exports = {
    Query:{
        async getPosts(){
            try{
                const posts = await Post.find();
                return posts;
            } catch(err){
                throw new Error(err);
            }
        },
        async getPost(_,{postId}){
            try{const post =  await Post.findById(postId);
            if(post){
                return post
            } else{
                throw new Error('Post not found')
            }}
            catch(err){
                throw new Error(err);
            }
        },

        
    },
    Mutation:{
        async createPost(_,{body},context){
            const user = checkAuth(context)
            if (argsbody.body.trim()===''){
                throw new Error('Post body must not be empty');
            }
            const newPost = new Post({
                body,
                user: user.indexOf,
                username: user.username,
                createdAt: new Date().toISOString()
                
            });
            const post = newPost.save();
            return post;
        },
        async likePost(_,{postId},context){
            const {username} = checkAuth(context);
            const post = await Post.findById(postId);
            if(post){
                if(post.likes.find((like)=>like.username ===username)){
                    post.likes = post.likes.filter(like=>like.username!==username);
                    await post.save();
                } else{
                    post.likes.push({
                        username,
                        createdAT: new Date().toISOString()
                    })
                }
                await post.save();
                return post;
            }else{
                throw new UserInputError('Post not found')
            }
        }
        

    }
}