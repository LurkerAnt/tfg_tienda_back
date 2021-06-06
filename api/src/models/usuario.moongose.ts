import { model, Schema, Document } from "mongoose";
import bcryptjs from "bcryptjs";

export interface IUser extends Document {
  nombre:string;
  apellido:string;
  email: string;
  password: string;
  fecha:Date;
  admin:boolean;
  comparePassword: (password: string) => Promise<Boolean>;
};

const userSchema = new Schema<IUser>({
    nombre:{
        type:String,
        required:true
    },
    apellido:{
        type:String,
        required:true
    },
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
  },
  fecha:{
      type:Date,
      required:true    
  },
  admin:{
      type:Boolean,
      default:false
  }
});

userSchema.pre<IUser>("save", async function (next) {
  const user = this;

  if (!user.isModified("password")) return next();

  const salt = await bcryptjs.genSalt(10);
  const hash = await bcryptjs.hash(user.password, salt);
  user.password = hash;

  next();
});






userSchema.methods.comparePassword = async function (
  password: string
): Promise<Boolean> {
  return await bcryptjs.compare(password, this.password);
};

export default model<IUser>("User", userSchema);
