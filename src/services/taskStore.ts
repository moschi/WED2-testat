import Nedb from 'nedb';

export class Task {
  constructor(
    public title: string,
    public description: string,
    public importance: number,
    public finishedBy: Date | null,
    public finished: boolean,
  ) {}

  public creationDate = Date.now();
}

const collection = new Nedb<Task>({ filename: './data/task.db', autoload: true });
export function getTasks(
  sortDirection: number,
  showFinished: boolean,
  callback: (err: Error | null, tasks: Task[]) => void,
): void {
  console.log({ $or: [{ finished: false }, { finished: showFinished }] });
  collection
    .find({ $or: [{ finished: false }, { finished: showFinished }] })
    .sort({ creationDate: sortDirection })
    .exec(callback);
}

export function getByCreationDate(
  sortDirection: number,
  showFinished: boolean,
  callback: (err: Error | null, tasks: Task[]) => void,
): void {
  console.log({ $or: [{ finished: false }, { finished: showFinished }] });
  collection
    .find({ $or: [{ finished: false }, { finished: showFinished }] })
    .sort({ creationDate: sortDirection })
    .exec(callback);
}

export function getByFinishedBy(
  sortDirection: number,
  showFinished: boolean,
  callback: (err: Error | null, tasks: Task[]) => void,
): void {
  collection
    .find({ $or: [{ finished: false }, { finished: showFinished }] })
    .sort({ finishedBy: sortDirection })
    .exec(callback);
}

export function getByImportance(
  sortDirection: number,
  showFinished: boolean,
  callback: (err: Error | null, tasks: Task[]) => void,
): void {
  collection
    .find({ $or: [{ finished: false }, { finished: showFinished }] })
    .sort({ importance: sortDirection })
    .exec(callback);
}

export function getByID(id: string, callback: (err: Error | null, tasks: Task[]) => void): void {
  collection.find({ _id: id }).limit(1).exec(callback);
}

export function insert(title: string, desc: string, importance: number, finishedBy: Date | null): void {
  collection.insert(new Task(title, desc, importance, finishedBy, false), function (err, doc) {
    console.log(doc.title);
  });
}

export function update(
  id: string,
  title: string,
  desc: string,
  importance: number,
  finishedBy: Date | null,
  finished: boolean,
): void {
  const task = new Task(title, desc, importance, finishedBy, finished);
  collection.update({ _id: id }, task);
}

export function deleteTask(id: string): void {
  collection.remove({ _id: id });
}

export function clearDB(): void {
  collection.remove({ title: 'yolo' });
}