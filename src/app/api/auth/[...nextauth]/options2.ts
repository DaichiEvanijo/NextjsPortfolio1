import type { Account, NextAuthOptions, User as AuthUser } from "next-auth";
import GitHubProvider from "next-auth/providers/github"
import GoogleProvider, { GoogleProfile } from "next-auth/providers/google";
import CredentialsProvider  from "next-auth/providers/credentials";
import { GithubProfile } from "next-auth/providers/github";
import { connectToDatabase } from "@/utils/mogoDButil/db";
import User from "@/models/User";
import bcrypt from "bcrypt"


export const options: NextAuthOptions = {
  providers: [
    GitHubProvider({
      clientId:process.env.GITHUB_ID as string,
      clientSecret:process.env.GITHUB_SECRET as string,

      profile:(profile:GithubProfile) => {
        // profile: OAuthプロバイダー（この場合はGitHub）から受け取ったユーザープロファイル情報をNextAuthの Session にマッピングする。
        return {
          // image, name, emailはdefaultでのsession, userオブジェクトのキー
          ...profile,
          image:profile.avatar_url,
          name: profile.name ?? profile.login,
          role:profile.role ?? 2001,
          id:profile.id.toString(),
          // profileは認証後にGitHubからもらうobject。roleは認証後のGitHubからもらうオブジェクトに対してroleというキーを加え、またidはGitHubから型がnumberとしてもらうのでそれをNextAuthのSessionのidの型であるstringに変えるためにこれを書く、またprofile callbackなしでもクライアントサイドのuseSessionやサーバーサイドのgetSessionのdataでdata.imageで画像を取得できていたが(GitHubが自動でSessionオブジェクトにimageキーの値を生成してくれていたが、profile callback関数を書く場合はその自動機能がなくなるのでimage:profile.avatar_urlを書いてimageキーを作る必要あり
          // *profile を設定していると、image や name が自動マッピングされず明示的に設定が必要になる（profile で返すオブジェクトがそのまま Session に反映されるためです）。
        }
      }
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      profile:(profile:GoogleProfile) => {
        return {
          ...profile,
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
          role:profile.role ?? 2001,
        }
      }
    }),
    CredentialsProvider({
      id:"Credentials",
      name:"Credentials",
      credentials:{
        name:{
          label:"Username:",
          type:"text",
          placeholder:"your username"
        },
        password:{
          label:"Password:",
          type:"password",
          placeholder:"your password"
        },
      },
      async authorize(credentials) {
        await connectToDatabase();
        try {
          const foundUser = await User.findOne({ name: credentials?.name, provider:"credentials"}).exec();
          if (!foundUser) {
            console.error("Authorization error: User not found for username:", credentials?.name);
            return null 
          }
          const isMatch = await bcrypt.compare(credentials?.password ?? "", foundUser.password);
          if (!isMatch) {
            console.error("Authorization error: Invalid password for username:", credentials?.name);
            return null
          }
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { password, ...userWithoutPassword } = foundUser.toObject();
          return userWithoutPassword; 
        } catch (error) {
          console.error("Unexpected authorization error:", error);
          return null
        }
      }
    })
  ],
  callbacks:{
    // Requests to /api/auth/signin, /api/auth/session and calls to getSession(), getServerSession(), useSession() will invoke this function,
    async jwt({token, user, account}){
      // * user, account, profile and isNewUser are only passed the first time this callback is called on a new session
      if (account)token.provider = account.provider;
      if(user)token.role = user.role
      return token
      // The returned value will be encrypted, and it is stored in a cookie
    },
    async session({session, token}){
      if(session.user) {
        session.user.role= token.role as number ;
        session.user.provider = token.provider as string;
      }
      return session
    },
    async signIn({user, account}:{user:AuthUser, account: Account |  null}){
      if(account?.provider === "Credentials"){
        return true
      }
      if(account?.provider === "github" || account?.provider === "google"){
        await connectToDatabase()
        try{
          const existingUser = await User.findOne({ name:user.name, provider:account.provider}).exec();
          if(!existingUser){
            await User.create({
              provider:account.provider,
              name: user.name,
            });
          }
          
          return true
        }catch(err){
          console.log(err)
          return false
        }
      }
      return true
    },
  },
  session: {
    strategy: "jwt",
    maxAge:  60 * 60 * 24, 
    updateAge: 60*60   
  },
  // pages: {},
  // nextauth automatically creates pages for login and logout and so on,
  // so you do not need to set the pages:{}. if you want to customize, go ahead. session is also 
  // automatically created
};


// nextauth key →opensslをパソコンにインストールしているなら、terminalで "openssl rand -base64 32"と打つ

// async jwt({token, user}){
// // tokenの初期値は{}、下のコードが実行されると{role:"XX"}となる
// // GitHubProvider: userの初期値はGitHUbから提供された提供された user :{id, name, email, image} 
// // Credential Provider: userの初期値はauthorize関数でreturnされたuser :{id, name,role} 
// jwt callbackの引数userはnext-authからのUser型を持ち、通常は認証プロバイダーから取得したユーザー情報（id, name, email, imageなど）を含むオブジェクト。CredentialsProviderを使用する場合は、authorizeメソッドで返したオブジェクトがUser型として扱われ、jwtコールバックでuser引数として受け取る。

// sessionの初期値: GitHubProviderの場合
// {
//   "user": {
//     "name": "GitHubのユーザー名",   // GitHubから取得したユーザー名
//     "email": "user@example.com",     // GitHubから取得したメールアドレス
//     "image": "https://example.com/avatar.png", // GitHubから取得したアバター画像のURL
//     "role": "user"                   // プロフィールコールバックで設定したrole
//   },
//   "expires": "2024-01-01T00:00:00.000Z" // セッションの有効期限
// }

// sessionの初期値: CredentialsProviderの場合
// {
//   "user": {
//     "name": "Dave",                    // authorizeメソッドで設定されたユーザー名
//     "email": null,                     // 通常はnull（Credentialsプロバイダーではメールアドレスがないため）
//     "image": null,                     // 通常はnull（Credentialsプロバイダーでは画像情報がないため）
//     "role": "admin"                   // authorizeメソッドで設定したrole
//   },
//   "expires": "2024-01-01T00:00:00.000Z" // セッションの有効期限
// }

// defaultのsessionオブジェクト
// interface Session {
//     user: {
//       name?: string;           // ユーザー名
//       email?: string;          // ユーザーのメールアドレス
//       image?: string;          // プロフィール画像のURL
//     };
//     expires: string;           // セッションの有効期限（ISO 8601形式の文字列）
//   }

// https://chatgpt.com/share/67229864-c834-8007-9d6d-76d9f74bcf2b

// profile関数で自分たちで追加した
// image:profile.avatar_url,
// name: profile.name ?? profile.login,
// // image, name, emailはdefaultでsession, userオブジェクトのキー
// role:profile.role ?? 2001,
// id:profile.id.toString(),
// や
// id: profile.sub,
// name: profile.name,
// email: profile.email,
// image: profile.picture,
// role:profile.role ?? 2001,
// がjwt, session, signIn callbackの引数のuserに渡される