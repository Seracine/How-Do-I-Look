import uploadService from "../services/uploadService.js";

const uploadCotroller = {
  postImage: async(req, res, next) =>{
    try{
      if(!req.file) {
        throw new Error("E400");
      };
      const filename = req.file.filename
      const imageUrl = uploadService.createImageUrl(filename);
      res.status(200).json({imageUrl});
    } catch (error){
      next(error);
    };
  },
};

export default uploadCotroller;