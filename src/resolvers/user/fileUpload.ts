import { FileUpload, GraphQLUpload } from "graphql-upload";
import { Arg, Mutation, Resolver } from "type-graphql";

//TODO - INTEGRATE CLOUDINARY

@Resolver()
export class FileUploadResolver {
  @Mutation(() => Boolean)
  async fileUpload(
    @Arg("file", () => GraphQLUpload)
    { createReadStream, filename, mimetype }: FileUpload
  ) {
    const asd = createReadStream();
    console.log(asd);
    console.log({ filename, mimetype });
  }
}
