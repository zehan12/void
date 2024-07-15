import { Model, Document, FilterQuery } from "mongoose";

export default class BaseRepository<T extends Document> {
    // https://github.com/DefinitelyTyped/DefinitelyTyped/issues/33824
    protected DocumentModel: Model<T>;

    constructor(model: Model<T>) {
        this.DocumentModel = model;
    }

    async create(item: T): Promise<T> {
        try {
            const newItem = await this.DocumentModel.create(item);
            return newItem;
        } catch (error) {
            throw new Error(`Error creating item: ${error}`);
        }
    }

    async findById(id: string): Promise<T | null> {
        try {
            const foundItem = await this.DocumentModel.findById(id).exec();
            return foundItem;
        } catch (error) {
            throw new Error(`Error finding item by id: ${error}`);
        }
    }

    async find(query: FilterQuery<T>): Promise<T[]> {
        try {
            const items = await this.DocumentModel.find(query).exec();
            return items;
        } catch (error) {
            throw new Error(`Error finding items: ${error}`);
        }
    }

    async update(id: string, item: Partial<T>): Promise<T | null> {
        try {
            const updatedItem = await this.DocumentModel.findByIdAndUpdate(id, item, { new: true }).exec();
            return updatedItem;
        } catch (error) {
            throw new Error(`Error updating item: ${error}`);
        }
    }

    async delete(id: string): Promise<T | null> {
        try {
            const deletedItem = await this.DocumentModel.findByIdAndDelete(id).exec();
            return deletedItem;
        } catch (error) {
            throw new Error(`Error deleting item: ${error}`);
        }
    }
}