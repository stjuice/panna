module.exports = [
"[project]/.next-internal/server/app/api/orders/route/actions.js [app-rsc] (server actions loader, ecmascript)", ((__turbopack_context__, module, exports) => {

}),
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/action-async-storage.external.js [external] (next/dist/server/app-render/action-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/action-async-storage.external.js", () => require("next/dist/server/app-render/action-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/fs [external] (fs, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("fs", () => require("fs"));

module.exports = mod;
}),
"[externals]/path [external] (path, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("path", () => require("path"));

module.exports = mod;
}),
"[project]/src/lib/orders/repository.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "OrderNotFoundError",
    ()=>OrderNotFoundError
]);
class OrderNotFoundError extends Error {
    constructor(id){
        super(`Order ${id} not found`);
        this.name = "OrderNotFoundError";
    }
}
}),
"[project]/src/lib/orders/fileRepository.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FileOrdersRepository",
    ()=>FileOrdersRepository
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/fs [external] (fs, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/path [external] (path, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$orders$2f$repository$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/orders/repository.ts [app-route] (ecmascript)");
;
;
;
const dataFilePath = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(process.cwd(), "src", "data", "orders.json");
class FileOrdersRepository {
    async readOrders() {
        const file = await __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["promises"].readFile(dataFilePath, "utf-8");
        return JSON.parse(file);
    }
    async writeOrders(orders) {
        await __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["promises"].writeFile(dataFilePath, JSON.stringify(orders, null, "\t"), "utf-8");
    }
    async getOrders() {
        return this.readOrders();
    }
    async getOrder(id) {
        const orders = await this.readOrders();
        return orders.find((order)=>order.ID === id) ?? null;
    }
    async createOrder(payload) {
        const orders = await this.readOrders();
        const nextId = orders.length > 0 ? Math.max(...orders.map((o)=>o.ID)) + 1 : 1;
        const newOrder = {
            ID: nextId,
            ...payload
        };
        orders.push(newOrder);
        await this.writeOrders(orders);
        return newOrder;
    }
    async updateOrder(id, updates) {
        const orders = await this.readOrders();
        const idx = orders.findIndex((order)=>order.ID === id);
        if (idx === -1) {
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$orders$2f$repository$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["OrderNotFoundError"](id);
        }
        const updated = {
            ...orders[idx],
            ...updates,
            ID: id
        };
        orders[idx] = updated;
        await this.writeOrders(orders);
        return updated;
    }
    async deleteOrder(id) {
        const orders = await this.readOrders();
        const exists = orders.some((order)=>order.ID === id);
        if (!exists) {
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$orders$2f$repository$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["OrderNotFoundError"](id);
        }
        const remaining = orders.filter((order)=>order.ID !== id);
        await this.writeOrders(remaining);
    }
}
}),
"[project]/src/lib/orders/supabaseRepository.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SupabaseOrdersRepository",
    ()=>SupabaseOrdersRepository
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$module$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@supabase/supabase-js/dist/module/index.js [app-route] (ecmascript) <locals>");
;
const ROW_NOT_FOUND_CODE = "PGRST116";
const DEFAULT_TABLE = "orders";
const ORDER_SELECT = "orderid,datecreated,description,customers:customers!orders_customerid_fkey(firstname,lastname,phonenumber)";
function requireEnv(name) {
    const value = process.env[name];
    if (!value) {
        throw new Error(`Missing required environment variable: ${name}`);
    }
    return value;
}
class SupabaseOrdersRepository {
    client;
    table;
    constructor(){
        const url = requireEnv("SUPABASE_URL");
        const key = process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.SUPABASE_ANON_KEY;
        if (!key) {
            throw new Error("Missing Supabase key. Provide SUPABASE_SERVICE_ROLE_KEY or SUPABASE_ANON_KEY.");
        }
        this.client = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$module$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createClient"])(url, key, {
            auth: {
                persistSession: false,
                autoRefreshToken: false
            }
        });
        this.table = process.env.SUPABASE_ORDERS_TABLE ?? DEFAULT_TABLE;
    }
    isRowNotFound(error, data) {
        return !!error && error.code === ROW_NOT_FOUND_CODE || !error && (data === null || data === undefined);
    }
    mapOrder(row) {
        const customer = row.customers;
        const first = customer?.firstname?.trim() ?? "";
        const last = customer?.lastname?.trim() ?? "";
        const customerName = [
            first,
            last
        ].filter(Boolean).join(" ").trim() || "N/A";
        const phone = customer?.phonenumber?.trim() ?? "";
        const createdDate = row.datecreated?.split("T")[0] ?? "";
        return {
            ID: row.orderid,
            CreatedDate: createdDate,
            CustomerName: customerName,
            CustomerPhoneNumber: phone,
            Details: row.description ?? ""
        };
    }
    async getOrders() {
        const { data, error } = await this.client.from(this.table).select(ORDER_SELECT).order("orderid", {
            ascending: true
        });
        if (error) {
            throw new Error(`Supabase getOrders failed: ${error.message}`);
        }
        return data.map((row)=>this.mapOrder(row));
    }
    async getOrder(id) {
        const { data, error } = await this.client.from(this.table).select(ORDER_SELECT).eq("orderid", id).maybeSingle();
        if (error) {
            throw new Error(`Supabase getOrder failed: ${error.message}`);
        }
        if (!data) {
            return null;
        }
        return this.mapOrder(data);
    }
    async createOrder(_payload) {
        throw new Error("Creating orders via Supabase is not supported with the current relational schema.");
    }
    async updateOrder(_id, _updates) {
        throw new Error("Updating orders via Supabase is not supported with the current relational schema.");
    }
    async deleteOrder(_id) {
        throw new Error("Deleting orders via Supabase is not supported with the current relational schema.");
    }
}
}),
"[project]/src/lib/orders/factory.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getOrdersRepository",
    ()=>getOrdersRepository
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$orders$2f$fileRepository$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/orders/fileRepository.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$orders$2f$supabaseRepository$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/orders/supabaseRepository.ts [app-route] (ecmascript)");
;
;
const providerEnv = (process.env.ORDERS_DATA_PROVIDER ?? "file").toLowerCase();
let cachedRepository = null;
function resolveProvider() {
    if (providerEnv === "file" || providerEnv === "supabase") {
        return providerEnv;
    }
    console.warn(`Unknown ORDERS_DATA_PROVIDER="${providerEnv}", defaulting to "file". ` + `Valid options are "file" or "supabase".`);
    return "file";
}
function createRepository() {
    const provider = resolveProvider();
    if (provider === "supabase") {
        return new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$orders$2f$supabaseRepository$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SupabaseOrdersRepository"]();
    }
    return new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$orders$2f$fileRepository$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["FileOrdersRepository"]();
}
function getOrdersRepository() {
    if (!cachedRepository) {
        cachedRepository = createRepository();
    }
    return cachedRepository;
}
}),
"[project]/src/app/api/orders/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET,
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$orders$2f$factory$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/orders/factory.ts [app-route] (ecmascript)");
;
;
const repository = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$orders$2f$factory$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getOrdersRepository"])();
async function GET() {
    try {
        const orders = await repository.getOrders();
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(orders, {
            status: 200
        });
    } catch (error) {
        console.error(error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "Failed to read orders"
        }, {
            status: 500
        });
    }
}
async function POST(request) {
    try {
        const payload = await request.json();
        const newOrder = await repository.createOrder(payload);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(newOrder, {
            status: 201
        });
    } catch (error) {
        console.error(error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "Failed to create order"
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__74128843._.js.map