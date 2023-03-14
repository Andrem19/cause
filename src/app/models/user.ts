
export interface Stats {
    Strength: number;
    Defense: number;
    Dexterity: number;
    Life: number;
    Mana: number;
}

export interface User {
    _id: string;
    _rev: string;
    username: string;
    email: string;
    image: string;
    token: string;
    Stats: Stats;
    Coordinates: string[];
    Level: number;
    Race: string;
    hashed_password: string;
}
