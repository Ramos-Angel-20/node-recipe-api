import bcrypt from 'bcrypt';
import User from '../models/user';
import generateToken from '../utility/generateToken';

// Logearse.
export const signIn = async (req, res) => {
    const { email, password } = req.body;

    const findedUser = await User.findOne({
        where: {
            email: email
        }
    });

    if (!findedUser) {
        return res.status(400).json({
            message: "This email is not registered"
        });
    }

    const correctPassword = await bcrypt.compare(password, findedUser.password);

    if (!correctPassword) {
        return res.status(400).json({
            message: "Invalid password"
        });
    }

    const token = await generateToken(findedUser.userID);

    res.status(200).json({
        username: findedUser.username,
        email: findedUser.email,
        token
    });

}

// Registrarse.
export const signUp = async (req, res, next) => {
    
    const { username, email, password } = req.body;
    
    try {
        
        const findedEmail = await User.findOne({
            where: {
                email: email
            }
        });

        const findedUsername = await User.findOne({
            where: {
                username: username
            }
        });

        if (findedUsername) {
            return res.status(409).json({
                message: "There's already a user with this username"
            });

        } else if (findedEmail) {
            return res.status(409).json({
                message: "There's already a user with this email"
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({
            username: username,
            email: email,
            password: hashedPassword
        });

        user.save()
            .then(result => {
                return res.status(201).json({
                    message: "User created",
                    user: user
                });
            })
            .catch(err => {
                return res.status(500).json({
                    message: "Something went wrong"
                });
            });

    } catch (error) {

        console.log(error);
        return res.status(500).json({
            message: "Something went wrong"
        });
    }
}