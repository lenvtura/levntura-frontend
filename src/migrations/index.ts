import * as migration_20260625_094114_initial from './20260625_094114_initial';

export const migrations = [
  {
    up: migration_20260625_094114_initial.up,
    down: migration_20260625_094114_initial.down,
    name: '20260625_094114_initial'
  },
];
