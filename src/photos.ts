import querystring from "query-string";

(() => {
  console.log("loaded");
  const parsedUrl = querystring.parseUrl(location.href);
  const qs = {
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
    redirect_uri: "http://localhost:9000/photos.html",
    grant_type: "authorization_code",
    code: parsedUrl.query.code,
  };
  fetch(
    `https://www.googleapis.com/oauth2/v4/token?${querystring.stringify(qs)}`,
    { method: "POST" }
  )
    .then((res) => res.json())
    .then((data) => {
      const { access_token, token_type } = data;
      return fetch("https://photoslibrary.googleapis.com/v1/albums", {
        headers: {
          Authorization: `${token_type} ${access_token}`,
        },
      });
    })
    .then((res) => res.json())
    .then((data) => {
      const albums = data.albums || [];
      for (const album of albums) {
        addPicture(album);
      }
    });
  function addPicture(album: Record<string, string>) {
    console.log(album);
    const photos = document.querySelector("#photos");
    const img = document.createElement("img");
    img.src = album.coverPhotoBaseUrl;
    img.textContent = album.title;
    photos?.appendChild(img);
  }
})();
