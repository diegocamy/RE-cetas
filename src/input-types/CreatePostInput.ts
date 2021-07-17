import { Field, InputType } from "type-graphql";
import { MaxLength, MinLength, IsNotEmpty } from "class-validator";
import { Post } from "../entities/Post";

@InputType()
export class CreatePostInput implements Partial<Post> {
  @Field()
  @MinLength(3, {
    message: "El titulo debe contener al menos 3 caracteres",
  })
  @MaxLength(255, {
    message: "El titulo debe contener como maximo 255 caracteres",
  })
  title!: string;

  @Field()
  @IsNotEmpty({
    message: "El contenido de la publicación no puede estar vacío",
  })
  content!: string;

  @Field()
  @IsNotEmpty({
    message: "Debe proporcionar una imagen para la publicación",
  })
  picture!: string;

  @Field()
  @IsNotEmpty({
    message: "Debe proporcionar el tiempo estimado que lleva la preparacion",
  })
  time!: string;
}
