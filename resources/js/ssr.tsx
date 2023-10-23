import { createInertiaApp } from "@inertiajs/react";
import createServer from "@inertiajs/react/server";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import ReactDOMServer from "react-dom/server";

import route from "../../vendor/tightenco/ziggy/dist/index.m";

const appName = import.meta.env.VITE_APP_NAME || "UNEG";

createServer((page) =>
	createInertiaApp({
		page,
		render: ReactDOMServer.renderToString,
		title: (title) => `${title} - ${appName}`,
		resolve: (name) =>
			resolvePageComponent(
				`./Pages/${name}.tsx`,
				import.meta.glob("./Pages/**/*.tsx"),
			),
		setup: ({ App, props }) => {
			// @ts-expect-error
			global.route = (name, params, absolute) =>
				route(name, params, absolute, {
					// @ts-expect-error
					...page.props.ziggy,
					// @ts-expect-error
					location: new URL(page.props.ziggy.location),
				});

			return <App {...props} />;
		},
	}),
);
