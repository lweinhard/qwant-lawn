# qwant-lawn

A lawn mower simulator for Qwant

## Quick Start

```bash
# Install
npm install

# Build
npm run build

# Run
npm start input.txt
```

## Input Format

```
5 5           # Lawn dimensions (width height)
1 2 N         # Mower start position (x y orientation)
LFLFLFLFF     # Instructions (L=left, R=right, F=forward)
3 3 E         # Second mower
FFRFFRFRRF    # Second mower instructions
```

**Orientations:** `N` (North), `E` (East), `S` (South), `W` (West)

## Commands

```bash
npm run dev input.txt    # Development mode
npm run build            # Build project
npm start input.txt      # Run simulation
npm test                 # Run tests
```

## Project Structure

```
src/
├── domain/              # Business logic
│   ├── position.ts      # Coordinate system
│   ├── orientation.ts   # Direction handling
│   ├── lawn.ts         # Playing field
│   ├── mower.ts        # Mower entity
│   ├── instruction.ts  # Command types
│   └── simulation.ts   # Main aggregate
├── application/         # Use cases
│   ├── input-parser.ts      # Parse input
│   ├── mower-simulator.ts   # Run simulation
|   └── mower-worker.ts      # Worker logic
└── infrastructure/      # External interfaces
    ├── file-input-reader.ts     # Read files
    └── console-output-writer.ts # Write output
```

## Example

**Input (`input.txt`):**
```
5 5
1 2 N
LFLFLFLFF
3 3 E
FFRFFRFRRF
```

**Output:**
```
1 3 N
5 1 E
```