# Convert Youtube Video to mp3 format

Using this api you can convert youtube video to mp3.

We use [yt1s](https://yt1s.com) api to convert the video to mp3

Example

Using Axios

```
axios({
  method: 'post',
  url: '<api delployed url>',
  data: {
    url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  }
});
```

Using Fetch Api

```
fetch("<api deployed url>",{
    method: "POST",
    body: JSON.stringify({
    url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  })
})
```
