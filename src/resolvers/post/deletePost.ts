import { Resolver,Mutation, UseMiddleware, Arg, Ctx } from "type-graphql";
import { Post } from "../../entities/Post";
import { MyContext } from "../../interfaces";
import { isAuth } from "../../middleware/isAuth";

@Resolver(of => Post)
export class DeletePost{
  @Mutation()
  @UseMiddleware(isAuth)
  async DeletePost(@Arg("slug") slug:string,@Ctx() {payload}:MyContext): Promise<boolean>{
    if(!payload) throw new Error('Unauthorized')

    const {userId} = payload

    //check if post exist
    const post = await Post.findOne({where:{slug}})

    if(!post) throw new Error('La publicación no existe')

    //check if user is post author
    if(userId != post.authorId) throw new Error('Solo el autor de la publicacion puede borrarla')

    //delete the post
    await post.remove()

    return true;
  }
}