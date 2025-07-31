const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/swiggy', async (req, res) => {
  try {
    const { lat, lng } = req.query;
    const swiggyUrl = `https://www.swiggy.com/dapi/restaurants/list/v5?lat=${lat}&lng=${lng}&sortBy=RELEVANCE&pageType=DESKTOP_WEB_LISTING`;
    const response = await axios.get(swiggyUrl);
    res.json(response.data);
  } catch (error) {
    console.error('Swiggy fetch error:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to fetch from Swiggy', details: error.response?.data || error.message });
  }
});

module.exports = router;