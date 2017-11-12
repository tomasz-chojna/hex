export default `

type GameMove {
    playerId: ID!
    x: Int!
    y: Int!
    timestamp: Int!
}

enum GameSessionStatus {
    ACTIVE
    INTERRUPTED
    FINISHED
}

type CurrentGameSession {
    id: ID
}

type GameSession {
    id: ID!
    status: GameSessionStatus!
    start: String!
    end: String
    players: [Player]!
    startingPlayer: ID!
    currentMove: ID!
    winner: ID
    moves: [GameMove]
    boardSize: Int!
}
`;