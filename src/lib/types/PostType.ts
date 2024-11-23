export type PostType = {
  _id: string,
  name: string,
  title: string,
  body: string,
  imageUrls:string[],
  reactions:number,
  reactedUsers:string[],
  provider:string, 
  createdAt:Date,
  updatedAt:Date,
}