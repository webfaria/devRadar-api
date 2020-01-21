const axios = require('axios');
const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');

// Exibir uma lista de Devs
exports.index = async (request, response) => {
  const devs = await Dev.find({});
  return response.json(devs);
}

//Criar novos Devs
exports.store = async (request, response) => {
    const { github_username, techs, latitude, longitude} = request.body;

    let dev = await Dev.findOne({github_username});

    if(!dev) {
      const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`)
    
      const { name = login, avatar_url, bio } = apiResponse.data;
      
      const techArray = parseStringAsArray(techs);
      
      const location = {
        type: 'Point',
        coordinates: [longitude, latitude],
      };
      
      dev = await Dev.create({
        github_username,
        name,
        avatar_url,
        bio,
        techs: techArray,
        location
      });
    }

    return response.json(dev);
  }

  //Atualizar Devs
exports.update = async (request, response) => {
  const id = request.params.id
  const { name, avatar_url, bio, techs, latitude, longitude } = request.body

  const techsArray = parteStringAsArray(techs)
  let dev = await Dev.findOne({_id: id});
  
  try{
      if(dev.isValid(id)){
          dev = await Dev.update(             
              {
                  $push: {techs: techsArray},
                  $set: {
                      name,
                      avatar_url,
                      bio,
                      latitude,
                      longitude
                  }
              },
          );
          return response.status(200).send({ message: 'User Updated' })         
       }else{
          return response.status(404).json({ message: 'Invalid Object id' })
       }
  }catch(err){
      return response.status(404).json({ message: `Error to get user: ${err}` })
  }
  
}

//Deletar Devs
exports.destroy = async (request, response) => {
  const id = request.params.id
  const key = request.params.secretkey

  try{
      if(key && key === process.env.SECRET_KEY_DELETE){
          if(ObjectId.isValid(id)){
              var dev = await Dev.findByIdAndRemove({_id: id});
              return response.status(200).send({ message: 'User Deleted' })
           }else{
              return response.status(404).json({ message: 'Invalid Object id' })
           }
      }else{
          return response.status(401).json({ message: 'User not Allowed' })
      }
  }catch(err){
      return response.status(404).json({ message: `Error to get user: ${err}` })
  }
}
