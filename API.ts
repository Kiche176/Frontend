import { ChatMessage } from "./ChatMessage";

const FOOD_API_URL: string = "https://world.openfoodfacts.net/api/v2/product";
const API_URL: string = "https://world.openfoodfacts.net/api/v2/product";
const URL: string = API_URL;


//TEST
export async function getFoodName(barcode: string): Promise<string[]> {
    const response = await fetch(`${FOOD_API_URL}/${barcode}?fields=product_name`);

    if (!response.ok) {
        throw new Error(`Request failed: ${response.status}`);
    }

    const data = await response.json();
    return data.product?.product_name;
}


// GET
/**
 * Gets a list of information about a
 * 
 * @param token 
 * @returns 
 */
export async function getUser(token: string): Promise<string[]> {
    const response = await fetch(`${URL}/user`);

    if (!response.ok) {
        throw new Error(`Unable to retrieve User: ${response.status}`);
    }

    const data = await response.json();
    return data;
}

export async function getEvent() {
    const response = await fetch(`${URL}/event`);

    if (!response.ok) {
        throw new Error(`Unable to retrieve Event: ${response.status}`);
    }

    const data = await response.json();
    return data;
}

export async function getEventList() {
    const response = await fetch(`${URL}/event/list`);

    if (!response.ok) {
        throw new Error(`Request Unable to retrieve Event List: ${response.status}`);
    }

    const data = await response.json();
    return data;
}

export async function getEventChat(eventId: string): Promise<ChatMessage[]> {

    if (!eventIdCheck(eventId)) {
        throw new Error("Invalid Event ID.");
    }

    const response = await fetch(`${URL}/event/chat/${eventId}`);

    if (!response.ok) {
        throw new Error(`Unable to retrieve Event Chat: ${response.status}`);
    }

    const data = await response.json();

    const messages: ChatMessage[] = data.map((message: any) => ({
        sender: message.sender,
        content: message.content,
        timeSent: new Date(message.timeSent)
    }));

    return messages;
}

function eventIdCheck(eventId: string) { return false; } // false for now


// POST

export async function getSessionToken(email: string, password: string) {
    const response = await fetch(
        `${URL}/auth/login`,
        {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        }
    );

    if (!response.ok) {
        throw new Error(
            `Request failed: ${response.status}`
        );
    }

    const data =  await response.json();
    return data.token;
}

export async function registerUser(email: string, password: string) {
    const response = await fetch(
        `${URL}/auth/create`,
        {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        }
    );

    if (!response.ok) {
        throw new Error(
            `Request failed: ${response.status}`
        );
    }

    const data =  await response.json();
    return data.token;
}

export async function createEvent(token: string) {
    const response = await fetch(
        `${URL}/auth/create`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
        }
    );

    if (!response.ok) {
        throw new Error(
            `Request failed: ${response.status}`
        );
    }

    const data = await response.json();
    return data;
}
