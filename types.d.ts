export interface Debut {
    saga?: string | null;
    manga?: string | null;
    volume?: string | null;
    anime?: string | null;
    arc?: string | null;
}

export interface Names {
    japanese?: string | null;
    latin?: string | null;
    other_names?: string | null;
}

export interface Character {
    id: number;
    name: string;
    category: string;
    url: string;
    image: string;
    names: Names;
    gender: string;
    death_date?: string | null;
    species?: string | null;
    origin: string;
    residence?: string | null;
    family?: string | null;
    occupation?: string | null;
    debut: Debut;
}
