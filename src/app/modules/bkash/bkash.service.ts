/**
 * bKash Payment Gateway — Tokenized Checkout Service
 * Production API: https://tokenized.pay.bka.sh/v1.2.0-beta
 */

// ── Token cache (in-memory for serverless) ──────────────────────────
let cachedToken: { id_token: string; refresh_token: string; expiresAt: number } | null = null;

const BKASH_BASE = process.env.BKASH_BASE_URL || "https://tokenized.pay.bka.sh/v1.2.0-beta";
const BKASH_APP_KEY = process.env.BKASH_APP_KEY || "";
const BKASH_APP_SECRET = process.env.BKASH_APP_SECRET || "";
const BKASH_USERNAME = process.env.BKASH_USERNAME || "";
const BKASH_PASSWORD = process.env.BKASH_PASSWORD || "";
const FRONTEND_URL = process.env.FRONTEND_URL || "https://bestieltsbd.vercel.app";

// ── Helpers ──────────────────────────────────────────────────────────
const bkashHeaders = (idToken: string) => ({
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: idToken,
    "X-APP-Key": BKASH_APP_KEY,
});

/**
 * Grant Token — get id_token from bKash
 * Valid for 1 hour. Cached in memory to avoid redundant calls.
 */
const grantToken = async (): Promise<string> => {
    // Return cached token if still valid (with 5 min buffer)
    if (cachedToken && cachedToken.expiresAt > Date.now() + 5 * 60 * 1000) {
        return cachedToken.id_token;
    }

    // Try refresh if we have a refresh_token
    if (cachedToken?.refresh_token) {
        try {
            const refreshRes = await fetch(`${BKASH_BASE}/tokenized/checkout/token/refresh`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    username: BKASH_USERNAME,
                    password: BKASH_PASSWORD,
                },
                body: JSON.stringify({
                    app_key: BKASH_APP_KEY,
                    app_secret: BKASH_APP_SECRET,
                    refresh_token: cachedToken.refresh_token,
                }),
            });
            const refreshData = await refreshRes.json();
            if (refreshData.id_token) {
                cachedToken = {
                    id_token: refreshData.id_token,
                    refresh_token: refreshData.refresh_token,
                    expiresAt: Date.now() + 55 * 60 * 1000, // ~55 min
                };
                return cachedToken.id_token;
            }
        } catch (e) {
            console.error("[bKash] Token refresh failed, will grant new:", e);
        }
    }

    // Grant new token
    const res = await fetch(`${BKASH_BASE}/tokenized/checkout/token/grant`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            username: BKASH_USERNAME,
            password: BKASH_PASSWORD,
        },
        body: JSON.stringify({
            app_key: BKASH_APP_KEY,
            app_secret: BKASH_APP_SECRET,
        }),
    });

    const data = await res.json();

    if (!data.id_token) {
        console.error("[bKash] Grant token failed:", data);
        throw new Error(data.statusMessage || "bKash authentication failed");
    }

    cachedToken = {
        id_token: data.id_token,
        refresh_token: data.refresh_token,
        expiresAt: Date.now() + 55 * 60 * 1000,
    };

    return cachedToken.id_token;
};

/**
 * Create Payment — initiate a bKash Tokenized Checkout payment
 * Returns a bkashURL where the user should be redirected to pay.
 */
const createPayment = async (
    amount: number,
    invoiceNumber: string,
    callbackURL: string
) => {
    const idToken = await grantToken();

    const res = await fetch(`${BKASH_BASE}/tokenized/checkout/create`, {
        method: "POST",
        headers: bkashHeaders(idToken),
        body: JSON.stringify({
            mode: "0011", // Checkout URL mode
            payerReference: invoiceNumber,
            callbackURL,
            amount: amount.toString(),
            currency: "BDT",
            intent: "sale",
            merchantInvoiceNumber: invoiceNumber,
        }),
    });

    const data = await res.json();

    if (data.statusCode !== "0000" && !data.bkashURL) {
        console.error("[bKash] Create payment failed:", data);
        throw new Error(data.statusMessage || "Failed to create bKash payment");
    }

    return {
        paymentID: data.paymentID,
        bkashURL: data.bkashURL,
        createTime: data.paymentCreateTime,
    };
};

/**
 * Execute Payment — finalize the payment after user authorization
 * Called from the callback URL handler.
 */
const executePayment = async (paymentID: string) => {
    const idToken = await grantToken();

    const res = await fetch(`${BKASH_BASE}/tokenized/checkout/execute`, {
        method: "POST",
        headers: bkashHeaders(idToken),
        body: JSON.stringify({ paymentID }),
    });

    const data = await res.json();

    if (data.statusCode !== "0000" || data.transactionStatus !== "Completed") {
        console.error("[bKash] Execute payment failed:", data);
        throw new Error(data.statusMessage || "bKash payment execution failed");
    }

    return {
        paymentID: data.paymentID,
        trxID: data.trxID,
        amount: parseFloat(data.amount),
        currency: data.currency,
        status: data.transactionStatus,
        payerReference: data.payerReference,
        merchantInvoiceNumber: data.merchantInvoiceNumber,
        customerMsisdn: data.customerMsisdn,
        paymentExecuteTime: data.paymentExecuteTime,
    };
};

/**
 * Query Payment — check the status of a payment
 */
const queryPayment = async (paymentID: string) => {
    const idToken = await grantToken();

    const res = await fetch(`${BKASH_BASE}/tokenized/checkout/payment/status`, {
        method: "POST",
        headers: bkashHeaders(idToken),
        body: JSON.stringify({ paymentID }),
    });

    return await res.json();
};

export const BkashService = {
    grantToken,
    createPayment,
    executePayment,
    queryPayment,
};
