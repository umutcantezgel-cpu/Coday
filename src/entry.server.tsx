import { PassThrough } from "stream";
import { createReadableStreamFromReadable } from "@react-router/node";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import { ServerRouter } from "react-router";
import type { EntryContext } from "react-router";
import { createI18n } from "./i18n.server";
import { I18nextProvider } from "react-i18next";

export default async function handleRequest(
    request: Request,
    responseStatusCode: number,
    responseHeaders: Headers,
    routerContext: EntryContext,
    _loadContext: unknown
) {
    // Simple language detection from URL
    const url = new URL(request.url);
    const lng = url.pathname.startsWith('/en') ? 'en' : 'de';
    const i18n = await createI18n(lng);

    return new Promise((resolve, reject) => {
        let shellRendered = false;

        const { pipe, abort } = renderToPipeableStream(
            <I18nextProvider i18n={i18n}>
                <ServerRouter context={routerContext} url={request.url} />
            </I18nextProvider>,
            {
                onShellReady() {
                    shellRendered = true;
                    const body = new PassThrough();
                    const stream = createReadableStreamFromReadable(body);

                    responseHeaders.set("Content-Type", "text/html");

                    resolve(
                        new Response(stream, {
                            headers: responseHeaders,
                            status: responseStatusCode,
                        })
                    );

                    pipe(body);
                },
                onShellError(error: unknown) {
                    reject(error);
                },
                onError(error: unknown) {
                    responseStatusCode = 500;
                    if (shellRendered) {
                        console.error(error);
                    }
                },
            }
        );

        setTimeout(abort, 5000);
    });
}
