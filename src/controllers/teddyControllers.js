const Teddy = require('../models/teddy.model');

// Controlador para crear un nuevo teddy
const createTeddy = async (req, res) => {
  try {
    const { userId } = req.body; // Se espera que el ID de usuario esté en el cuerpo de la solicitud
    const newTeddy = await Teddy.create({ user: userId, ...req.body });
    res.status(201).json({ success: true, data: newTeddy });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Controlador para obtener todos los teddies
const getAllTeddies = async (req, res) => {
  const userId = req.params.userId;
  try {
   
    const teddies = await Teddy.find({ user: userId });
    res.status(200).json({ success: true, data: teddies });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Controlador para obtener un teddy por su ID
const getTeddyById = async (req, res) => {
  try {
    const { userId, teddyId } = req.params;
    const teddy = await Teddy.findOne({ _id: teddyId, user: userId });
    if (!teddy) {
      return res.status(404).json({ success: false, message: 'Teddy not found' });
    }
    return res.status(200).json({ success: true, data: teddy });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Controlador para actualizar un teddy por su ID
const updateTeddyById = async (req, res) => {
  try {
    const { userId, teddyId } = req.params;
    const uptadateData = req.body;


        // Verifica que solo se permitan actualizar ciertos campos

    const allowedUpdates = ['type', 'color', 'accessories']; // Lista de campos permitidos
    const isValidOperation = Object.keys(uptadateData).every((field) => allowedUpdates.includes(field));
    if (!isValidOperation) {
      return res.status(400).json({ success: false, message: 'Invalid updates!' });
    }


    const updatedTeddy = await Teddy.findOneAndUpdate(
      { _id: teddyId, user: userId },
      uptadateData,
      { new: true }
    );
    if (!updatedTeddy) {
      return res.status(404).json({ success: false, message: 'Teddy not found for this user' });
    }


    res.status(200).json({ success: true, data: updatedTeddy });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};



// Controlador para eliminar un teddy por su ID
const deleteTeddyById = async (req, res) => {
  try {
    const { userId, teddyId } = req.params;
    const deletedTeddy = await Teddy.findOneAndDelete({ _id: teddyId, user: userId });
    if (!deletedTeddy) {
      return res.status(404).json({ success: false, message: 'Teddy not found' });
    }
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createTeddy,
  getAllTeddies,
  getTeddyById,
  updateTeddyById,
  deleteTeddyById
};