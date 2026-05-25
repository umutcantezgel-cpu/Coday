import React from 'react';
import { renderToString } from 'react-dom/server';

const json = { test: "</script><script>alert(1)</script>" };
const element = <script type="application/ld+json">{JSON.stringify(json)}</script>;

console.log(renderToString(element));
