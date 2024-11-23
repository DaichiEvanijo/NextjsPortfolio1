import mongoose from "mongoose";
const Schema = mongoose.Schema

const userSchema = new Schema(
  {
    name:{
      type:String, 
      required:true
    },
    password:String,
    provider:{
      type:String,
      required:true,
    },
    role:{
      type:Number, 
      default:2001,
      required:true,
      },
    resetToken:String, 
    tokenExpiration:Date,
  },
)

export default mongoose.models.User || mongoose.model("User", userSchema)



// mongoose.models.User は Mongoose のキャッシュに既に存在する「User」モデルを指しています。
// Mongoose は一度定義されたモデルをキャッシュし、再定義しないようにするため、再度定義する必要がないかチェックします。
// mongoose.models.User が存在すれば、そのモデルを再利用します。
// もし mongoose.models.User が未定義（アプリケーションの最初の読み込み時など）であれば、mongoose.model("User", userSchema) を使用して User モデルを新しく作成します。
// export default により、このファイルをインポートする他のファイルで、 User モデルに直接アクセスできるようにしています。