# Element API

**An API that returns information about the elements from the periodic table**

_Elements data gotten from https://github.com/neelpatel05/periodic-table-api and manipulated (changing values) in this application_

## Endpoints

**The api can be accessed at https://elements.dumplings.dev/**

**Each of the following routes returns the following data object**

```js
{
    success: boolean,
    message: string,
    data: {
        atomicMass: float,
        atomicNumber: integer,
        atomicRadius: integer | null,
        boilingPoint: integer | null,
        bondingType: string | null,
        cpkHexColor: string | null,
        density: float | null,
        electronAffinity: integer | null,
        electronegativity: float | null,
        electronicConfiguration: string,
        groupBlock: string,
        ionizationEnergy: integer| null,
        ionRadius: string | null,
        meltingPoint: integer | null,
        name: string,
        oxidationStates: string[],
        standardState: "gas" | "liquid" | "solid" | null,
        symbol: string,
        vanDerWaalsRadius: integer | null,
        yearDiscovered: integer | "Ancient"
    } | data[]
}
```

### 1. Fetch all elements

**Route:** `/api/elements?limit=number&fetch=string`

**Method:** `GET`

**Description:** This endpoint fetches all the elements from the periodic table. Omitting a limit query parameter will return all 118 elements. Omitting the fetch query parameter will return all data for each element.

**Example request**

```http
GET /api/elements?limit=1&fetch=atomicMass,name,density
Host: elements.dumplings.dev
```

**Example Successful Response:**

```json
{
    "success": true,
    "message": "Successfully fetched element",
    "data": [
        {
            "atomicMass": 1.0079,
            "atomicNumber": 1,
            "atomicRadius": 37,
            "boilingPoint": 20,
            "bondingType": "diatomic",
            "cpkHexColor": "FFFFFF",
            "density": 0.0000899,
            "electronAffinity": -73,
            "electronegativity": 2.2,
            "electronicConfiguration": "1s¹",
            "groupBlock": "nonmetal",
            "ionizationEnergy": 1312,
            "ionRadius": null,
            "meltingPoint": 14,
            "name": "Hydrogen",
            "oxidationStates": ["-1", "1"],
            "standardState": "gas",
            "symbol": "H",
            "vanDerWaalsRadius": 120,
            "yearDiscovered": "1766"
        }
    ]
}
```

### 2. Fetch element by atomic number

**Route:** `/api/atomicnumber/[atomicnumber]/?fetch=string`

**Method:** `GET`

**Description:** This endpoint fetches the element with the provided atomic number. Omitting the fetch query parameter will return all data for each element.

**Example request**

```http
GET /api/elements/atomicnumber/3&fetch=atomicMass,name,density
Host: elements.dumplings.dev
```

**Example Successful Response:**

```json
{
    "success": true,
    "message": "Successfully fetched element",
    "data": {
        "atomicMass": 6.941,
        "density": 0.535,
        "name": "Lithium"
    }
}
```

### 3. Fetch element by name

**Route:** `/api/name/[name]/?fetch=string`

**Method:** `GET`

**Description:** This endpoint fetches the element with the provided name. Omitting the fetch query parameter will return all data for each element.

**Example request**

```http
GET /api/elements/name/lithium&fetch=atomicMass,name,density
Host: elements.dumplings.dev
```

**Example Successful Response:**

```json
{
    "success": true,
    "message": "Successfully fetched element",
    "data": {
        "atomicMass": 6.941,
        "density": 0.535,
        "name": "Lithium"
    }
}
```

### 4. Fetch element by symbol

**Route:** `/api/symbol/[symbol]/?fetch=string`

**Method:** `GET`

**Description:** This endpoint fetches the element with the provided symbol. Omitting the fetch query parameter will return all data for each element.

**Example request**

```http
GET /api/elements/symbol/li&fetch=atomicMass,name,density
Host: elements.dumplings.dev
```

**Example Successful Response:**

```json
{
    "success": true,
    "message": "Successfully fetched element",
    "data": {
        "atomicMass": 6.941,
        "density": 0.535,
        "name": "Lithium"
    }
}
```

### 5. Fetch elements by bonding type

**Route:** `/api/bondingtype/[bondingtype]/?limit=number&fetch=string`

**Method:** `GET`

**Description:** This endpoint fetches elements with the provided bonding type. Omitting a limit query parameter will return all elements with the provided bonding type. Omitting the fetch query parameter will return all data for each element.

**Example request**

```http
GET /api/elements/bondingtype/diatomic?limit=1&fetch=atomicMass,name,density
Host: elements.dumplings.dev
```

**Example Successful Response:**

```json
{
    "success": true,
    "message": "Successfully fetched element",
    "data": [
        {
            "atomicMass": 1.0079,
            "density": 0.0000899,
            "name": "Hydrogen"
        }
    ]
}
```

### 6. Fetch elements in block

**Route:** `/api/block/[block]/?limit=number&fetch=string`

**Method:** `GET`

**Description:** This endpoint fetches elements in the provided block. Omitting a limit query parameter will return all elements in the provided block. Omitting the fetch query parameter will return all data for each element.

**Example request**

```http
GET /api/elements/block/alkali metal?limit=1&fetch=atomicMass,name,density
Host: elements.dumplings.dev
```

**Example Successful Response:**

```json
{
    "success": true,
    "message": "Successfully fetched element",
    "data": [
        {
            "atomicMass": 6.941,
            "density": 0.535,
            "name": "Lithium"
        }
    ]
}
```

### 7. Fetch elements by standard state

**Route:** `/api/state/[state]/?limit=number&fetch=string`

**Method:** `GET`

**Description:** This endpoint fetches elements that have the provided state at STP. Omitting a limit query parameter will return all elements with the provided state at STP. Omitting the fetch query parameter will return all data for each element.

**Example request**

```http
GET /api/elements/state/gas?limit=1&fetch=atomicMass,name,density
Host: elements.dumplings.dev
```

**Example Successful Response:**

```json
{
    "success": true,
    "message": "Successfully fetched element",
    "data": [
        {
            "atomicMass": 1.0079,
            "density": 0.0000899,
            "name": "Hydrogen"
        }
    ]
}
```
