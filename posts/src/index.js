const express = require("express");
const app = express();
const config = require("./configs/config");
const mongoose = require("mongoose");
const postsRoute = require("./routes/posts.route");
const PostModel = require("./models/Post");

// connect db
mongoose.connect(config.DB_CONN_STR);
const connection = mongoose.connection;
connection.once("open", async () => {
  if ((await PostModel.countDocuments()) > 0) return;

  Promise.all([
    PostModel.create({
      title: "1. What is a difference between Java nad JavaScript?",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Bibendum vitae etiam lectus amet enim.",
      user: "65601f418c702f4a28bc1e71",
    }),
    PostModel.create({
      title: `2. Can't get proper value of variable from suspend function`,
      content:
        "I am using the shrinkFab function to change the isFabExtended state in Compose. The isFabExtended affects the size of the ExtendableFloatingActionButton." +
        `I want to call shrinkFab anytime the button is clicked. This action should expand the button and shrink it back after 1.5 seconds. Unfortunately this doesn't work because shrinkFabJob is equal to null outside the function for some reason. However, by calling the function three times, on the third time the cancellation of the first or second Job will indeed happen.` +
        `At this point, you can press the button many times and it will shrink not 1.5 seconds after the last press, but at any time with visual glitching. What am I doing wrong?`,
      user: "65601f418c702f4a28bc1e71",
    }),
    PostModel.create({
      title: `3. unable to extract text from scanned pdf using Langchain`,
      content:
        `getting ValueError: cannot reshape array of size 29311 into shape (2339,1656,newaxis)` +
        `for some pdf files my code is working and for some others I am unable to extract.` +
        `the code which I am using:`,
      user: "65601f418c702f4a28bc1e71",
    }),
    PostModel.create({
      title: `4. Configuration store and management`,
      content: `0 I have an application that has something like below structure Service A - application and environment configuration, infrastructure dependencies (Queue, DB etc) etc. Service B - application and environment configuration In typical microservice applications what is the best practice around IaC and CaC . Git(SCM)`,
      user: "65601f418c702f4a28bc1e71",
    }),
    PostModel.create({
      title: `5. unable to extract text from scanned pdf using Langchain`,
      content:
        `getting ValueError: cannot reshape array of size 29311 into shape (2339,1656,newaxis)` +
        `for some pdf files my code is working and for some others I am unable to extract.` +
        `the code which I am using:`,
      user: "65601f418c702f4a28bc1e71",
    }),
    PostModel.create({
      title: "6. What is a difference between Java nad JavaScript?",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Bibendum vitae etiam lectus amet enim.",
      user: "65601f418c702f4a28bc1e71",
    }),
    PostModel.create({
      title: `7. Can't get proper value of variable from suspend function`,
      content:
        "I am using the shrinkFab function to change the isFabExtended state in Compose. The isFabExtended affects the size of the ExtendableFloatingActionButton." +
        `I want to call shrinkFab anytime the button is clicked. This action should expand the button and shrink it back after 1.5 seconds. Unfortunately this doesn't work because shrinkFabJob is equal to null outside the function for some reason. However, by calling the function three times, on the third time the cancellation of the first or second Job will indeed happen.` +
        `At this point, you can press the button many times and it will shrink not 1.5 seconds after the last press, but at any time with visual glitching. What am I doing wrong?`,
      user: "65601f418c702f4a28bc1e71",
    }),
    PostModel.create({
      title: `8. unable to extract text from scanned pdf using Langchain`,
      content:
        `getting ValueError: cannot reshape array of size 29311 into shape (2339,1656,newaxis)` +
        `for some pdf files my code is working and for some others I am unable to extract.` +
        `the code which I am using:`,
      user: "65601f418c702f4a28bc1e71",
    }),
    PostModel.create({
      title: `9. Configuration store and management`,
      content: `0 I have an application that has something like below structure Service A - application and environment configuration, infrastructure dependencies (Queue, DB etc) etc. Service B - application and environment configuration In typical microservice applications what is the best practice around IaC and CaC . Git(SCM)`,
      user: "65601f418c702f4a28bc1e71",
    }),
    PostModel.create({
      title: `10. unable to extract text from scanned pdf using Langchain`,
      content:
        `getting ValueError: cannot reshape array of size 29311 into shape (2339,1656,newaxis)` +
        `for some pdf files my code is working and for some others I am unable to extract.` +
        `the code which I am using:`,
      user: "65601f418c702f4a28bc1e71",
    }),
  ]).then(() => console.log(new Date(), "database established successfully"));
});

app.use("/", postsRoute);

app.listen(config.PORT, () => {
  console.log(new Date(), "listening on port:", config.PORT);
});