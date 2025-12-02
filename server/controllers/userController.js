import * as userQueries from '../queries/userQueries.js'

// This will be get used to get the name of currently loggend in user
export const currentUser = async(req, res) =>{
    const id = req.userId;

    try {
        const name = await userQueries.getCurrentUser(id);

        if(!name) return res.status(404).json({message:'user not found'});

        res.json(name);

    } catch (error) {
        console.log(error.message);
        res.status(500).json({message:'Internal Server Error'})
    }
}