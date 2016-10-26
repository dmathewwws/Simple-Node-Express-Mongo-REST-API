import mongoose from 'mongoose';

class User extends mongoose.Schema {
  constructor() {
    super({
      id: String,
      name: String,
      avatar: String
    })
  }

}

export default mongoose.model('User', new User)
