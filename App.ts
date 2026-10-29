import { getSessionToken } from "./API";
import { BearerToken } from "./Login";

const email = "name@warwick.ac.uk";
const password = "pass123"
const login = new 
const token: BearerToken = {
    token: await getSessionToken({
        email: email,
        password: password
    })
};