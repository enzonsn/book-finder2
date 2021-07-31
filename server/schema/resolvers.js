const {AuthenticationError} = require('apollo-server-express');
const {User, Book} = require('../models');
const {signToken} = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if(context.user){
                const userData = await User.findOne({_id: context.user._id})
                    .select('-__v -password')
                    .populate('books')
                return userData;
            }
            throw new AuthenticationError('You are not logged in');
        }
    },
    Mutation: {
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);
            return {token, user};
        },
        login: async (parent, {email, password}) => {
            const user = await User.findOne({email});
            if(!user){ throw new AuthenticationError('Invalid user'); }
            const correct = await User.isCorrectPassWord(password);
            if(!correct){ throw new AuthenticationError('Invalid password'); }
            const token = signToken(user);
            return {token, user};
        },
        saveBook: async (parent, {bookData}, context) => {
            if(context.user){
                const updateUser = await User.findByIdAndUpdate({_id: context.user_id}, {$push: { savedBooks: bookData} }, {new: true});
                return updateUser;
            }
            throw new AuthenticationError('You are not logged in...');
        },
        removeBook: async (parent, args, context) => {
            if(context.user){
                const updateUser = await Book.findByIdAndUpdate( {_id: context.user._id}, {$pull: { savedBooks: { bookID: args.bookId } }}, {new: true});
                return updateUser;
            }
            throw new AuthenticationError('You are not logged in...');
        }
    }
};

module.exports = resolvers;