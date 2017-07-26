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

type GameSession {
    id: ID!
    status: GameSessionStatus!
    start: Int!
    end: Int
    players: [ID]!
    startingPlayer: ID!
    currentMove: ID!
    winner: ID
    moves: [GameMove]
    boardSize: Int!
}
`;