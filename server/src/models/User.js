const mongoose = require('mongoose');
const { hash, compare } = require('bcrypt');
const { sign, verify } = require('../lib/jwt');

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, trim: true, unique: true },
    name: { type: String, required: true, trim: true },
    stories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Story' }],
    password: { type: String, required: true },
    sentRequests: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    incommingRequests: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
});

const UserModel = mongoose.model('User', userSchema);
class User extends UserModel {
    static async signUp(email, password, name) {
        const encrypted = await hash(password, 8);
        const user = new User({ email, password: encrypted, name });
        await user.save();
        const u = user.toObject();
        delete u.password;
        return u;
    }

    static async signIn(email, password) {
        const user = await User.findOne({ email });
        if (!user) throw new Error('Cannot find user');
        const same = await compare(password, user.password);
        if (!same) throw new Error('Password is incorrect');
        const u = user.toObject();
        delete u.password;
        const token = await sign({ _id: u._id });
        u.token = token;
        return u;
    }

    static async check(oldToken) {
        const { _id } = await verify(oldToken);
        const user = await User.findById(_id);
        if (!user) throw new Error('Cannot find user');
        const u = user.toObject();
        delete u.password;
        const token = await sign({ _id: u._id });
        u.token = token;
        return u;
    }

    static async addFriend(idUser, idFriend) {
        const userTest = await User.findOne({
            _id: idUser,
            $or: [
                { incommingRequests: { $all: [idFriend] } },
                { sentRequests: { $all: [idFriend] } },
                { friends: { $all: [idFriend] } },
            ]
        });
        if (userTest) throw new Error('Invalid friend request.');
        const user = await User.findByIdAndUpdate(idUser, { $addToSet: { sentRequests: idFriend } })
        if (!user) throw new Error('Cannot find user.');
        const friend = await User.findByIdAndUpdate(idFriend, { $addToSet: { incommingRequests: idUser } }).select(['email', 'name', 'stories']);
        if (!friend) {
            await User.findByIdAndUpdate(idUser, { $pull: { sentRequests: idFriend } });
            throw new Error('Cannot find user.');
        }
        return friend;
    }

    static async acceptFriend(idUser, idFriend) {
        const queryObject1 = { _id: idUser, incommingRequests: { $all: [idFriend] } };
        const updateObject1 = { 
            $pull: { incommingRequests: idFriend },
            $addToSet: { friends: idFriend }
        };
        const user = await User.findOneAndUpdate(queryObject1, updateObject1);
        if (!user) throw new Error('Cannot find user.');
        const queryObject2 = { _id: idFriend, sentRequests: { $all: [idUser] } };
        const updateObject2 = { 
            $pull: { sentRequests: idUser },
            $addToSet: { friends: idUser }
        };
        const friend = await User.findOneAndUpdate(queryObject2, updateObject2).select(['email', 'name', 'stories']);
        if (!friend) {
            await User.findByIdAndUpdate(idUser, { $pull: { friends: idFriend } });
            throw new Error('Cannot find friend.');
        }
        return friend;
    }
    static async removeFriend(idUser, idFriend) {
        const queryObject1 = { _id: idUser, friends: { $all: [idFriend] } };
        const user = await User.findOneAndUpdate(queryObject1, { $pull: { friends: idFriend } });
        if (!user) throw new Error('Cannot find user.');
        const friend = await User.findByIdAndUpdate(idFriend, { $pull: { friends: idUser } }).select(['email', 'name', 'stories']);
        if (!friend) throw new Error('Cannot find friend.');
        return friend;
    }
}
module.exports = User;
