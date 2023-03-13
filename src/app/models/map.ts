export interface NPC {
    name: string;
    description_who_is_it: string;
    strength: number;
    defence: number;
}

export interface Map {
    _id: string;
    _rev: string;
    Coordinates: string[];
    Name_of_location: string;
    type: string;
    Description_of_location: string;
    image: string;
    NPC: NPC[];
}
