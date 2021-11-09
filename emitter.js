class EventEmitter {
  subscriptions = [];
  name = "";

  constructor({ name }) {
    this.name = name;
  }

  subscribe = (fn) => {
    this.subscriptions.push(fn);
  };

  emit = () => {
    this.subscriptions.forEach((fn) => fn());
  };
}

const emitter = new EventEmitter({ name: "HELLO" });

emitter.subscribe(() => console.log("HELLO"));

ELEMENTS.inputButton.addEventListener("click", () => emitter.emit());

const createEventEmmiter = () => {
  const subscriptions = {};

  return {
    subscribe(type, cb) {
      if (type in subscriptions) {
        subscriptions[type].push(cb);
      } else {
        subscriptions[type] = [cb];
      }
    },

    emit(type, data) {
      subscriptions[type].forEach((cb) => cb(data));
    },
  };
};

const eventEmitter = createEventEmmiter();

eventEmitter.subscribe("наш-с-Вовой-тип", (name) => console.log(`hello, ${name}`));

eventEmitter.emit("наш-с-Вовой-тип", "Вова");
