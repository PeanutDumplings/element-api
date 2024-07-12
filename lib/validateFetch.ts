const validateFetch = (fetch: any) => {
    const allowedFetch = [
        "atomicMass",
        "atomicNumber",
        "atomicRadius",
        "boilingPoint",
        "bondingType",
        "cpkHexColor",
        "density",
        "electronAffinity",
        "electronegativity",
        "electronicConfiguration",
        "groupBlock",
        "ionizationEnergy",
        "ionRadius",
        "meltingPoint",
        "name",
        "oxidationStates",
        "standardState",
        "symbol",
        "vanDerWaalsRadius",
        "yearDiscovered",
    ];

    for (const field of fetch) {
        if (!allowedFetch.includes(field.trim())) {
            return { allowedFetch, field: field.trim() };
        }
    }
    return true;
};

export default validateFetch;
