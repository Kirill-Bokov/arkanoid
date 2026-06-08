import type { LevelSchema } from "../types/GameTypes";

export const level1: LevelSchema = {
  rows: 8,
  cols: 12,
  offsetY: 60,
  grid: [
    [
      "strong", "strong", "normal", "empty", "normal", "strong", "strong", "normal", "empty", "normal", "strong", "strong"
    ],
    [
      "strong", "normal", "very_strong", "normal", "empty", "strong", "strong", "empty", "normal", "very_strong", "normal", "strong"
    ],
    [
      "strong", "empty", "normal", "normal", "empty", "strong", "strong", "empty", "normal", "normal", "empty", "strong"
    ],
    [
      "strong", "normal", "empty", "very_strong", "empty", "normal", "normal", "empty", "very_strong", "empty", "normal", "strong"
    ],
    [
      "strong", "strong", "normal", "empty", "normal", "normal", "normal", "normal", "empty", "normal", "strong", "strong"
    ],
    [
      "strong", "empty", "empty", "strong", "empty", "strong", "strong", "empty", "strong", "empty", "empty", "strong"
    ],
    [
      "strong", "normal", "strong", "empty", "normal", "strong", "strong", "normal", "empty", "strong", "normal", "strong"
    ],
    [
      "strong", "strong", "strong", "strong", "strong", "strong", "strong", "strong", "strong", "strong", "strong", "strong"
    ]
  ]

};