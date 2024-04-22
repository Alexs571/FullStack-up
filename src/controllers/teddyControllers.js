const Teddy = require('../models/teddy.model');

// Controlador para crear un nuevo teddy
const createTeddy = async (req, res) => {
  try {
    const newTeddy = await Teddy.create(req.body);
    res.status(201).json({ success: true, data: newTeddy });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Controlador para obtener todos los teddies
const getAllTeddies = async (req, res) => {
  try {
    const teddies = await Teddy.find();
    res.status(200).json({ success: true, data: teddies });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Controlador para obtener un teddy por su ID
const getTeddyById = async (req, res) => {
  try {
    const teddy = await Teddy.findById(req.params.id);
    if (!teddy) {
      return res.status(404).json({ success: false, message: 'Teddy not found' });
    }
    res.status(200).json({ success: true, data: teddy });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Controlador para actualizar un teddy por su ID
const updateTeddyById = async (req, res) => {
  try {
    const updatedTeddy = await Teddy.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedTeddy) {
      return res.status(404).json({ success: false, message: 'Teddy not found' });
    }
    res.status(200).json({ success: true, data: updatedTeddy });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Controlador para eliminar un teddy por su ID
const deleteTeddyById = async (req, res) => {
  try {
    const deletedTeddy = await Teddy.findByIdAndDelete(req.params.id);
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
