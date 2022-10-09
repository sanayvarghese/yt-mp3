const axios = require("axios");
const FormData = require("form-data");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const yt_mp3 = async (url, res) => {
  var indexFormData = new FormData();
  indexFormData.append("q", url);
  indexFormData.append("vt", "mp3");
  const index = await axios({
    method: "post",
    url: "https://yt1s.com/api/ajaxSearch/index",
    data: indexFormData,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  if (index.data.mess === "") {
    var convertFormData = new FormData();
    convertFormData.append("vid", index.data.vid);
    convertFormData.append("k", index.data.links.mp3.mp3128.k);

    const convert = await axios({
      method: "post",
      url: "https://yt1s.com/api/ajaxConvert/convert",
      data: convertFormData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    console.log(convert.data.dlink);
    console.log(convert.data.title);
    res.status(200).send({
      code: "success",
      mp3: convert.data.dlink,
      title: convert.data.title,
      expiring: convert.data.dlink.includes("googlevideo.com") ? "1" : "0",
    });
  } else {
    res.status(400).send({
      code: "in-yt-url",
    });
  }
};

app.post("/api/yt-mp3", async (req, res) => {
  console.log(req.body.url);
  yt_mp3(req.body.url, res);
});

app.listen(process.env.PORT || PORT, () =>
  console.log(`Server listening on port ${process.env.PORT || PORT}!`)
);
