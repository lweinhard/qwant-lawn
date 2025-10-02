export enum InstructionType {
  TurnLeft = 'L',
  TurnRight = 'R',
  MoveForward = 'F',
}

export interface Instruction {
  readonly type: InstructionType;
}

export class TurnLeftInstruction implements Instruction {
  readonly type = InstructionType.TurnLeft;
}

export class TurnRightInstruction implements Instruction {
  readonly type = InstructionType.TurnRight;
}

export class MoveForwardInstruction implements Instruction {
  readonly type = InstructionType.MoveForward;
}
