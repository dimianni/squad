export interface IPosition {
    id: string;
    name: string;
    shortName: string;
    group: string;
}

export interface INationality {
    id: number;
    name: string;
    image: string;
}

export interface IMarketValue {
    value: number;
    currency: string;
    progression: any; // You can replace 'any' with a more specific type if needed
}

export interface IPlayer {
    height: string;
    foot: string;
    injury: null;
    suspension: null;
    joined: number;
    contractUntil: number;
    captain: boolean;
    lastClub: null;
    isLoan: null;
    wasLoan: null;
    id: string;
    name: string;
    image: string;
    imageLarge: null;
    imageSource: string;
    shirtNumber: null;
    age: number;
    dateOfBirth: number;
    heroImage: string;
    isGoalkeeper: boolean;
    positions: {
        first: IPosition;
        second: IPosition;
        third: IPosition;
    };
    nationalities: INationality[];
    marketValue: IMarketValue;
}
