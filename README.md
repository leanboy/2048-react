# 2048 Game

This is a web-based implementation of the classic 2048 game with additional features and customizations.

### Features

- **Customizable Game Grid**: You can change the number of rows and columns in the game grid to 4, 5, or 6, providing a different gameplay experience.
- **Customizable Initial Tile Values**: You can customize the initial values for the new tiles that appear in the game. Choose from 2, 4, 8, or 16 as the initial tile values.
- **Undo Functionality**: The game includes an "undo" feature that allows the player to revert their last move, providing a safety net for strategic planning.
- **Smooth Animations**: Enjoy smooth animations for tile movements, merges, and score accumulation, enhancing the overall gaming experience.

### Technologies Used

- **React**
- **Redux**
- **Material-UI (MUI)**
  
### Storing State in localStorage

The game ensures easy restoration of game state by storing the initial game state in localStorage. Additionally, a Redux middleware is employed to automatically update the localStorage whenever the Redux state undergoes a change. The middleware logic is as follows:

```javascript
export const localStorageMiddleware: Middleware = store => next => action => {
  const result = next(action);
  localStorage.setItem("2048_state", JSON.stringify(store.getState()));
  return result;
}
```

This middleware ensures that every time the Redux state is modified, the updated state is stored in the browser's localStorage, allowing for easy restoration of the game state.

### Deployment

The game is deployed and accessible online. You can play the game by visiting the following link: [2048 Game](https://qyunhuang.github.io/2048-react/)

