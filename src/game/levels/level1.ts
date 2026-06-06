import type { LevelSchema } from "../types/GameTypes";

export const level1: LevelSchema = {
  rows: 8,
  cols: 12,

  brickWidth: 60,
  brickHeight: 20,

  padding: 6,

  offsetX: 30,
  offsetY: 60,

  grid: [
    [
      "empty","empty","empty","strong","strong","strong","strong","strong","empty","empty","empty","empty"
    ],
    [
      "empty","empty","strong","strong","normal","normal","normal","strong","strong","empty","empty","empty"
    ],
    [
      "empty","strong","strong","normal","normal","normal","normal","normal","strong","strong","empty","empty"
    ],
    [
      "strong","strong","normal","normal","normal","empty","normal","normal","normal","strong","strong","empty"
    ],
    [
      "strong","normal","normal","empty","normal","empty","normal","empty","normal","normal","strong","strong"
    ],
    [
      "strong","strong","normal","normal","normal","normal","normal","normal","normal","strong","strong","empty"
    ],
    [
      "empty","strong","strong","normal","normal","normal","normal","normal","strong","strong","empty","empty"
    ],
    [
      "empty","empty","strong","strong","strong","unbreakable","unbreakable","strong","strong","empty","empty","empty"
    ]
  ]
};