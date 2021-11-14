export interface CRUDService<T> {
  findAll(): Array<T>;
  findById(id: number): T | null;
  save(type: T): Promise<T> | T | null;
  deleteById(id: number): Promise<T> | T | null;
}
