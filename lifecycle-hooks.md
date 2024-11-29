# Life cycle hooks

Sólo pueden ser utilizados en componentes de clase.

```jsx
class App extends Component<AppProps, AppState> {
  // Se ejecuta al momento de crear el componente
  constructor(props: AppProps) {
    super(props);

    console.log("App - Constructor");
  }

  // Se ejecuta si el componente y sus hijos ya terminaron de ejecutar el método render
  componentDidMount(): void {
    console.log("App - Mounted");
  }

  // Técnica de optimización
  componentDidUpdate(prevProps, prevState) {
    console.log("prevProps", prevProps);
    console.log("prevState", prevState);

    if (prevProps.prop !== this.props.prop) {
      // Ajax call and get new data from the server
    }
  }

  // Se ejecuta cuando se quita el componente del Virtual DOM
  componentWillUnmount() {
    console.log("Counter - Unmount");
    // Limpiar timeouts y quitar event listeners
  }

  // Se ejecuta una vez que el componente ya se creó y se lo agrega al Virtual DOM
  render() {
    console.log("App - Rendered");

    return (
      <main>
        <h1>Hello World!</h1>
      </main>
    );
  }
}
```

Los componentes funcionales no permiten acceder a estos métodos, sólo al método de render.

```jsx
const App = () => {
  console.log("App - Rendered");

  return (
    <main>
      <h1>Hello World!</h1>
    </main>
  );
};
```
