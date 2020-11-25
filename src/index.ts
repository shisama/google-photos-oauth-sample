import querystring from "query-string";

const main = async() => {
  const qs = querystring.stringify({
    response_type: "code",
    client_id: process.env.CLIENT_ID,
    state: "xyz",
    scope: "https://www.googleapis.com/auth/photoslibrary.readonly",
    redirect_uri: "http://localhost:9000/photos.html"
  });
  
  window.open(`https://accounts.google.com/o/oauth2/v2/auth?${qs}`);
}

document.querySelector("#btn")?.addEventListener("click", () => {
  main();
});
