// module-augmentation
// このコードは NextAuth.js の モジュール拡張（module augmentation） を行い、型定義をカスタマイズして Session、User、JWT に新しいプロパティを追加しています。これにより、NextAuth の session や token を利用する際に TypeScript が型エラーを起こさず、カスタムプロパティ（この場合 id と role）を型安全に利用できるようになります。

import { DefaultSession, DefaultUser } from "next-auth";
import { DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      role: number;
      image:string;
      name:string;
      id: string;
      provider:string;
    } & DefaultSession;
  }

  interface User extends DefaultUser {
    role: number;
    id:string;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    role: number;
  }
}
// NextAuthが提供するSessionオブジェクトは以下のようになっている(認証プロバイダにかかわらず if it is GitHub or not)
// interface Session {
//     user: {
//       id?: string;             // ユーザーID。デフォルトでは含まれませんが、カスタムで追加可能
//       name?: string;           // ユーザー名
//       email?: string;          // ユーザーのメールアドレス
//       image?: string;          // プロフィール画像のURL
//     };
//     expires: string;           // セッションの有効期限（ISO 8601形式の文字列）
//   }
