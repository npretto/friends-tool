import { EntityId } from '@reduxjs/toolkit';

export type Todo = {
  userId: EntityId;
  id: EntityId;
  title: string;
  completed: boolean;
};
