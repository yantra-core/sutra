# Sutra

![sutra-smol](https://github.com/yantra-core/sutra/assets/70011/a859d450-a222-44ed-b515-413e197f3c8b)


## JavaScript Behavior Tree Library
Sutra is a versatile library for creating and managing behavior trees in JavaScript. It allows for easy definition of complex behavior patterns using a simple and intuitive syntax.

## Features

- Simple `if`, `then`, `else` syntax for defining behavior trees.
- Action objects with scoped parameters for dynamic behavior control.
- Import and Export of `sutra.json` format for behavior tree definitions.
- Supports plain English exports for easy understanding and debugging.
- Event-driven architecture with `.on()` and `.emit()` methods for actions.
- Dynamic condition evaluation with support for entity data.
- Advanced conditional logic with composite conditions (AND, OR, NOT).

## Conditional and Logic Operators

Sutra supports a range of conditional and logic operators, enabling complex decision-making structures within behavior trees.

| Operator     | Description                                      | Example Usage                                      |
|--------------|--------------------------------------------------|----------------------------------------------------|
| `lessThan`   | True if a property is less than a given value.   | `{ "operator": "lessThan", "property": "health", "value": 50 }` |
| `greaterThan`| True if a property is greater than a given value.| `{ "operator": "greaterThan", "property": "health", "value": 50 }` |
| `equals`     | True if a property equals a given value.         | `{ "operator": "equals", "property": "type", "value": "BOSS" }` |
| `notEquals`  | True if a property does not equal a given value. | `{ "operator": "notEquals", "property": "type", "value": "BOSS" }` |
| `and`        | True if all provided conditions are true.        | `{ "operator": "and", "conditions": ["isBoss", "isHealthLow"] }` |
| `or`         | True if any of the provided conditions are true. | `{ "operator": "or", "conditions": ["isBoss", "isPlayer"] }` |
| `not`        | True if the provided condition is false.         | `{ "operator": "not", "condition": "isBoss" }` |


## Simple Usage Example

Below is an example of how Sutra can be used to define behavior logic for a boss fight in a game:

```javascript
import Sutra from '@yantra-core/sutra';

// Create a new instance of Sutra
let sutra = new Sutra();

// Define conditions
sutra.addCondition('isBoss', (entity) => entity.type === 'BOSS');
sutra.addCondition('isHealthLow', {
  operator: 'lessThan',
  property: 'health',
  value: 50
});

// Define an action
sutra.addAction({
  if: 'isBoss',
  then: [{
    if: 'isHealthLow',
    then: [{ 
      action: 'entity::update', 
      data: { color: 0xff0000, speed: 5 }
    }]
  }]
});

// Event listener for the action
sutra.on('entity::update', (entity, data) => {
  // Here is where you would put your custom code
  console.log(`Updated entity ${entity.id} with`, data);
});

// Example game entities
let allEntities = [
  { id: 1, type: 'BOSS', health: 100 },
  { id: 2, type: 'PLAYER', health: 100 }
];

// Game loop
function gameTick() {
  allEntities.forEach(entity => {
    sutra.tick(entity);
  });
}

// Running the game tick
gameTick(); // No action triggered
allEntities[0].health = 30; // Boss health drops below 50
gameTick(); // Action 'entity::update' is triggered
```


## Sutra Behavior Tree JSON Protocol Specification (RFC)

### Overview
The Sutra JSON protocol provides a structured format for defining behavior trees in game development. This format enables the specification of complex game logic through a series of conditional checks and actions.

### Structure

- **Root Element**: An array of nodes, where each node represents a conditional check and its corresponding actions or nested nodes.

### Node Elements

- **`if`**: Specifies a condition to be evaluated. Can be a string for named conditions or a composite condition object.
- **`then`**: An array of action objects or nested nodes to execute if the condition is true.
- **`else`**: (Optional) An array of action objects or nested nodes to execute if the condition is false.

### Conditional Operators

- **`lessThan`, `greaterThan`, `equals`, `notEquals`, `lessThanOrEqual`, `greaterThanOrEqual`**: Compare a property of an entity against a value.
- **`and`, `or`, `not`**: Logical operators for combining conditions.

### Composite Condition Object

- A composite condition object uses logical operators (`and`, `or`, `not`) to combine multiple conditions.
- **Example**: `{ "operator": "and", "conditions": ["isBoss", "isHealthLow"] }`

### Action Object

- **`action`**: A string representing the action to be executed.
- **`data`**: (Optional) An object containing additional data or parameters for the action.

### Nested Nodes

- Nodes can contain nested `then` and `else` elements, allowing for complex branching logic within the behavior tree.

### Example

```json
[
  {
    "if": { "operator": "and", "conditions": ["isBoss", "isHealthLow"] },
    "then": [
      {
        "action": "initiateBossFight",
        "data": { "strategy": "aggressive" }
      },
      {
        "if": "isPlayerNear",
        "then": [{ "action": "attackPlayer" }],
        "else": [{ "action": "patrolArea" }]
      }
    ]
  }
]
```

### Copyright Yantra Works 2023
### AGPL
