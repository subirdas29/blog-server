"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class QueryBuilder {
    constructor(modelQuery, query) {
        this.modelQuery = modelQuery;
        this.query = query;
    }
    search(searchableFields) {
        var _a;
        const search = (_a = this === null || this === void 0 ? void 0 : this.query) === null || _a === void 0 ? void 0 : _a.search;
        if (search) {
            this.modelQuery = this.modelQuery.find({
                $or: searchableFields.map((field) => ({
                    [field]: { $regex: search, $options: 'i' },
                })),
            });
        }
        return this;
    }
    sortBy() {
        const sortBy = this.query.sortBy || 'createdAt';
        const sortOrder = this.query.sortOrder === 'desc' ? '-' : '';
        this.modelQuery = this.modelQuery.sort(`${sortOrder}${sortBy}`);
        return this;
    }
    filter() {
        const queryObj = Object.assign({}, this.query);
        const excludeFields = ['search', 'sortBy', 'sortOrder'];
        excludeFields.forEach((el) => delete queryObj[el]);
        if (queryObj.filter) {
            this.modelQuery = this.modelQuery.find({ author: queryObj.filter });
        }
        return this;
    }
}
exports.default = QueryBuilder;
