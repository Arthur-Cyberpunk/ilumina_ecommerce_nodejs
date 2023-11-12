function base64_encode(file) {
  // read binary data
  //var bitmap = fs.readFileSync(file);
  // convert binary data to base64 encoded string

  console.log({ parsed: JSON.stringify(file.toString("base64")) });
  return Buffer.from(file).toString("base64");

  //new Buffer(bitmap).toString("base64");
}

module.exports = base64_encode;
