export interface DAO<T> {
  findAll(): Array<T>;
  findById(id: number): T | null;
  save(model: T): Promise<T> | T | null;
  deleteById(id: number): Promise<T> | T | null;
}
