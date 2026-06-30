import { z } from "zod";

enum TaskStatus {
  TODO,
  IN_PROGRESS,
  DONE,
}

enum Priority {
  LOW,
  MEDIUM,
  HIGH,
}

const KanbanItemSchema = z.object({
  title: z
    .string()
    .min(3, "Please enter a title less more than 3 characters!")
    .max(30, "Please enter a title more less than 30 charachers"),
  descripton:z.string(),
  status:z.enum(TaskStatus),
  prioroty:z.enum(Priority),
  position:z.float32("Please enter a floating number for the position"),
  dueDate:z.date("Please enter a valid date for the due date!")
});

type KanbanItemType = z.infer<typeof KanbanItemSchema>

export {KanbanItemSchema}
export type {KanbanItemType}

