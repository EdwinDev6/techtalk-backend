import mongoose from "mongoose";

(async () => {
  try {
    await mongoose.connect('mongodb://127.0.0.1/techtalkdb', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('DB is connected');
  } catch (error) {
    console.log(error);
  }
})();