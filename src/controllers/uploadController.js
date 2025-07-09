import uploadService from "../services/uploadService.js";
import { ValidationError } from "../utils/appError.js"

class UploadCotroller {
  postImage = async (req, res, next) => {
    try {
      if (!req.file) {
        throw new ValidationError()
      };
      const filename = req.file.filename
      const imageUrl = uploadService.createImageUrl(filename);
      res.status(200).json({ imageUrl });
    } catch (error) {
      next(error);
    };
  };
};

export default new UploadCotroller();