export default `
enum AVAILABILITY_STATUS {
    OFFLINE
    PLAYING
    AVAILABLE
}

type Player {
    id: ID
    name: String
    availabilityStatus: AVAILABILITY_STATUS
}
`;
