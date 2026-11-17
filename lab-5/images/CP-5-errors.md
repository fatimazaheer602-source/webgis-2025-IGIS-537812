# Checkpoint 5: sending points to the API

POST `/api/facilities/` through the browsable API (Raw data tab, `application/json`).

| Test | Payload | Answer |
|---|---|---|
| Valid point | `[72.9906, 33.6423]`, `"IGIS, NUST"`, `school` | `HTTP 201 Created`, with `"district": "Islamabad"` |
| 1. Arabian Sea | `[64.0, 23.0]` | `HTTP 400 Bad Request`: `{"geom": ["This point is not inside any district of Pakistan."]}` |
| 2. Invalid kind | `"kind": "castle"` | `HTTP 400 Bad Request`: `{"kind": ["\"castle\" is not a valid choice."]}` |
| 3. Swapped coordinates | `[33.6423, 72.9906]` | `HTTP 400 Bad Request`: `{"geom": ["This point is not inside any district of Pakistan."]}` |

The same validation (`validate_geom`) that keeps points out of the sea also catches swapped coordinates, because latitude 72.99 and longitude 33.64 fall in no district.

Screenshots: `CP-5.png` (201), `CP-5-err1-sea.png`, `CP-5-err2-castle.png`, `CP-5-err3-swapped.png`.

Note: the valid POST created a second "IGIS, NUST" facility (id 4), next to the one added in the admin (id 1). The handout's test payload duplicates it.
