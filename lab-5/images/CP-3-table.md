# Checkpoint 3: loading by view

Measured on 2026-11-17 in Chrome (window about 982 px wide) with `performance.getEntriesByType('resource')` and the DevTools Network tab. Size is the transferred size of the districts request.

| View | Districts | Size |
|---|---|---|
| `/api/districts/?format=json`, everything | 160 | 935 kB (934,929 B body) |
| The map as it opens, Islamabad at zoom 9 | 20 | 99.3 kB (98,966 B body) |
| Zoomed out to zoom 6 | 124 | 722 kB (722,140 B body) |
| Zoomed in on Lahore at zoom 11 | 2 | 14.3 kB (14,021 B body) |

Counts come from the status line. They depend on window size, because the map asks for what fits in the window.

Screenshot: `CP-3.png` shows the map with the Network tab open and one `in_bbox` request (200, fetch, 99.3 kB).
