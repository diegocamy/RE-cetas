import { FileUpload, GraphQLUpload } from "graphql-upload";
import { Arg, Mutation, Resolver } from "type-graphql";
import { UploadApiResponse, v2 as cloudinary } from "cloudinary";
import { GraphQLError } from "graphql";
import { ReadStream } from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

const uploadToCloudinary = (
  image: ReadStream
): Promise<UploadApiResponse | undefined> => {
  return new Promise((resolve, reject) => {
    image.pipe(
      cloudinary.uploader.upload_stream({ folder: "REcetas" }, (err, res) => {
        if (err) return reject(err);

        return resolve(res);
      })
    );
  });
};

@Resolver()
export class FileUploadResolver {
  @Mutation(() => String)
  async imageUpload(
    @Arg("image", () => GraphQLUpload)
    { createReadStream }: FileUpload
  ) {
    try {
      const response = await uploadToCloudinary(createReadStream());
      return response?.secure_url;
    } catch (error) {
      throw new GraphQLError("Ha ocurrido un error al subir la imagen");
    }
  }
}
