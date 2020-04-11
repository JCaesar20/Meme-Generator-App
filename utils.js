const request = require('request-promise');
const url = 'https://api.imgflip.com/get_memes'

const getMemes= async () => {
    const response = await request({ url, json: true });
    return await response.data.memes;
  }

module.exports= {
    getMemes
} 

