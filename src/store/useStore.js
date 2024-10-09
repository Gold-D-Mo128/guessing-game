import { create } from "zustand";

/**
 * Zustand Store for Game State Management
 *
 * This module utilizes Zustand to create a centralized store for managing
 * the state of a game, including player information, game status, and
 * scoring mechanics. The store provides a variety of actions to modify
 * the game state, including adding and updating players, initializing
 * scores, and managing game progress.
 *
 * State Variables:
 * - player: String representing the current player's name.
 * - auth: Boolean indicating whether the player is authenticated.
 * - playersData: Array of objects containing data for each player,
 *   including id, name, points, multiplier, and score.
 * - points: Number representing the player's current points.
 * - multiplier: Number representing the player's current multiplier.
 * - PlayersMultipliers: Array holding multipliers for each player.
 * - StoppedAt: Value indicating the stopping point for score calculations.
 * - speed: Number representing the speed of the game.
 * - started: Boolean indicating whether the game has started.
 * - end: Boolean indicating whether the game has ended.
 * - onGoing: Boolean indicating whether the game is currently in progress.
 * - startingPoints: Number representing the initial points for players.
 *
 * Actions:
 * - addPlayer(player): Adds a new player to the playersData array.
 * - updatePlayer(id, newData): Updates an existing player's data based on their ID.
 * - resetPlayers(): Resets playersData to default values.
 * - initializePlayers(points, multiplier): Initializes players with the given points
 *   and multiplier, randomizing values for CPU players.
 * - updatePlayerScores(stoppedAt): Updates each player's score based on the
 *   stopping point, taking into account their multiplier and points.
 * - setPoints(points): Updates the player's current points.
 * - setSpeed(speed): Updates the game's speed.
 * - setMultiplier(multiplier): Updates the player's multiplier.
 * - setPlayersMultiplier(PlayersMultipliers): Sets multipliers for players.
 * - setStoppedAt(StoppedAt): Updates the stopping point value.
 * - setStartingPoints(startingPoints): Sets the initial points for players.
 * - setPlayer(player): Updates the current player's name.
 * - setAuth(auth): Updates the authentication status of the player.
 * - startGame(): Sets the game as started.
 * - endGame(): Sets the game as ended.
 * - setGameState(started, end): Updates the game state based on whether
 *   it has started or ended.
 * - resetGame(): Resets the game state to its initial values, including
 *   resetting players' scores and game status.
 *
 * Usage:
 * ```javascript
 * import useStore from "@/store/useStore";
 *
 * const { player, addPlayer, resetGame } = useStore();
 * ```
 */

const getRandomValues = () => {
  const randomPoints = Math.floor(Math.random() * 100) + 1;
  const randomMultiplier = (Math.random() * 10).toFixed(2);
  return { randomPoints, randomMultiplier };
};

const useStore = create((set) => ({
  player: "",
  auth: false,
  // Players data
  playersData: [
    { id: 1, name: "me", points: null, multiplier: null, score: null },
    { id: 2, name: "CPU 1", points: null, multiplier: null, score: null },
    { id: 3, name: "CPU 2", points: null, multiplier: null, score: null },
    { id: 4, name: "CPU 3", points: null, multiplier: null, score: null },
    { id: 5, name: "CPU 4", points: null, multiplier: null, score: null },
  ],
  // Additional states
  points: 50,
  multiplier: 0,
  PlayersMultipliers: [],
  StoppedAt: null,
  speed: 1,
  started: false,
  end: null,
  onGoing: false,
  startingPoints: 1000,

  // Function to add a new player
  addPlayer: (player) =>
    set((state) => ({ playersData: [...state.playersData, player] })),

  // Function to update a player
  updatePlayer: (id, newData) =>
    set((state) => ({
      playersData: state.playersData.map((player) =>
        player.id === id ? { ...player, ...newData } : player
      ),
    })),

  // Function to reset players
  resetPlayers: () =>
    set({
      playersData: [
        {
          id: 1,
          no: 1,
          name: "me",
          points: null,
          multiplier: null,
          score: null,
        },
        {
          id: 2,
          no: 2,
          name: "you",
          points: null,
          multiplier: null,
          score: null,
        },
        {
          id: 3,
          no: 3,
          name: "you",
          points: null,
          multiplier: null,
          score: null,
        },
        {
          id: 4,
          no: 4,
          name: "you",
          points: null,
          multiplier: null,
          score: null,
        },
        {
          id: 5,
          no: 5,
          name: "you",
          points: null,
          multiplier: null,
          score: null,
        },
      ],
      points: 0,
      multiplier: 0,
      PlayersMultipliers: [],
      StoppedAt: null,
      speed: 0,
      started: false,
      end: null,
    }),

  // Function to initialize players with points and multipliers
  initializePlayers: (points, multiplier) =>
    set((state) => ({
      playersData: state.playersData.map((player) => {
        if (player.id === 1) {
          // Update your own points and multiplier
          return { ...player, points, multiplier };
        } else {
          // Randomize the rest
          const { randomPoints, randomMultiplier } = getRandomValues();
          return {
            ...player,
            points: randomPoints,
            multiplier: parseFloat(randomMultiplier),
          };
        }
      }),
      points, // Update points in the store
      multiplier, // Update multiplier in the store
    })),

  // Function to update player scores based on stopping point
  updatePlayerScores: (stoppedAt) =>
    set((state) => ({
      playersData: state.playersData.map((player) => ({
        ...player,
        score:
          stoppedAt > player.multiplier && player.multiplier && player.points
            ? (player.multiplier * player.points).toFixed(0)
            : 0,
      })),
      StoppedAt: stoppedAt, // Update the stoppedAt value
    })),

  setPoints: (points) => set({ points }),
  setSpeed: (speed) => set({ speed }),

  setMultiplier: (multiplier) => set({ multiplier }),
  setPlayersMultiplier: (PlayersMultipliers) => set({ PlayersMultipliers }),
  setStoppedAt: (StoppedAt) => set({ StoppedAt }),
  setStartingPoints: (startingPoints) => set({ startingPoints }),

  setPlayer: (player) => set({ player }),
  setAuth: (auth) => set({ auth }),
  // Function to start the game
  startGame: () => set({ started: true, end: false }),

  // Function to end the game
  endGame: () => set({ end: true }),

  setGameState: (started, end) =>
    set((state) => ({
      started,
      end,
      onGoing: started && !end,
    })),

  resetGame: () =>
    set((state) => ({
      ...state,
      started: false,
      end: false,
      StoppedAt: null,
      playersData: state.playersData.map((player) => ({
        ...player,
        points: null,
        multiplier: null,
        score: null,
      })),
    })),
}));

export default useStore;
