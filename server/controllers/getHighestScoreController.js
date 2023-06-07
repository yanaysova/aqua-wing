const Score = require("../database/scoreModel");

const getHighestScoreController = (req, res) => {
  const userId = req.params.id;

  Score.find({ $or: [{ email: userId }, { nickname: userId }] })
    .sort({ score: -1 })
    .limit(1)
    .then((highestScore) => {
      if (highestScore.length === 0) {
        return res.status(404).json({ error: "No scores found for the user." });
      }
      return res.status(200).json(highestScore[0]);
    })
    .catch((error) => {
      return res
        .status(500)
        .json({ error: "Failed to retrieve highest score." });
    });
};

module.exports = getHighestScoreController;
