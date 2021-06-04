import { model, Schema, Document } from "mongoose";
import bcrypt from "bcrypt";

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

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(user.password, salt);
  user.password = hash;

  next();
});






userSchema.methods.comparePassword = async function (
  password: string
): Promise<Boolean> {
  return await bcrypt.compare(password, this.password);
};

export default model<IUser>("User", userSchema);
