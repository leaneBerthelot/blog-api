function getUrl(req, extra) {
  let url = `${req.protocol}://${req.get("host")}${req.originalUrl}/${extra}`;

  if (req.originalUrl.includes(extra)) {
    url = url.replace(`/${extra}`, "");
  }

  return url;
}

module.exports = {
  getUrl,
};
