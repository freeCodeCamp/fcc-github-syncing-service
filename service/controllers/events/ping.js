module.exports = (req, res) => {
  console.log(`
  Received ping from GitHub.
  Repo: ${req.body.repository.full_name}`);

  res.sendStatus(200);
};
