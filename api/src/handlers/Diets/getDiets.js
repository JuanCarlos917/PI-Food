const getDataDb = require('../../controllers/Diets/getDataDb')

const getDiets = async (req, res) => {
    try {
        const diets = await getDataDb()
        res.status(200).json(diets)
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = getDiets;