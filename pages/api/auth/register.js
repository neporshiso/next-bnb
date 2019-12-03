import { User } from "../../../model";

export default async (req, res) => {
    if (req.method !== "POST") {
        res.status(405).end(); // Nothing but a POST
        return;
    }

    const { email, password, passwordConfirmation } = req.body;

    if (password !== passwordConfirmation) {
        res.status(422).end(
            JSON.stringify({status: 'error', message: 'Passwords do not match'})
        )
    }

    try {
        const user = await User.create({ email, password });
        res.end(JSON.stringify({ status: "success", message: "User added" }));
    } catch (err) {
        let message = 'An error occurred'
        if (err.name === 'SequelizeUniqueConstraintError') {
            message = 'User already exists'
        }

        res.status(500).end(JSON.stringify({ status: "error", message }));
    }
};
