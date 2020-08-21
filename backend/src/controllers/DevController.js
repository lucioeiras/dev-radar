const axios = require('axios')
const Dev = require('../models/Dev')
const parseStringAsArray = require('../utils/parseStringAsArray')

module.exports = {
  async index(request, response){
    const devs = await Dev.find()

    return response.json(devs)
  },

  async store(request, response) {
    const { github_username, techs, latitude, longitude } = request.body

    let dev = await Dev.findOne({ github_username })

    if (!dev) {
      const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`)

      const { name = login, avatar_url, bio } = apiResponse.data

      const techsArray = parseStringAsArray(techs)

      const location = {
        type: 'Point',
        coordinates: [longitude, latitude],
      }
      
      dev = await Dev.create({
        github_username,
        name, 
        avatar_url,
        bio,
        techs: techsArray,
        location,
      })
    }
 
    return response.json(dev)
  },

  async update(request, response){
    const { github_username, name, avatar_url, bio, techs, latitude, longitude } = request.query

    let devUptade = await Dev.findOneAndUpdate({ github_username })

    const techsArray = parseStringAsArray(techs)

    const location = {
      type: 'Point',
      coordinates: [Number(longitude), Number(latitude)],
    }

    devUptade = await Dev.updateOne({
      name,
      avatar_url,
      bio,
      techs: techsArray,
      location,
    })
    
    return response.json(`O dev ${github_username} foi alterado`)
  },

  async destroy(request, response){
    const { github_username } = request.query
    
    const devDelete = await Dev.findOneAndDelete({ github_username })

    return response.json(`O dev ${github_username} foi deletado`)
  },
}